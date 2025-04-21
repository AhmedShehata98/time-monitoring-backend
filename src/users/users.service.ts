import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { AuthGuard } from '@nestjs/passport'
import { User as UserDecorator } from '../common/decorators/user.decorator'
// Import LoginUserDto if you have one, otherwise use inline types or CreateUserDto subset
// import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    const { email, password, fullName } = createUserDto

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } })
    if (existingUser) {
      throw new ConflictException('Email already registered')
    }

    // Hash the password
    const saltRounds = 10 // Or use a configuration value
    let hashedPassword: string
    try {
      hashedPassword = await bcrypt.hash(password, saltRounds)
    } catch (error) {
      console.error('Password hashing failed:', error)
      throw new InternalServerErrorException('Failed to process registration.')
    }

    const newUser = this.userRepository.create({
      email,
      passwordHash: hashedPassword,
      fullName,
    })

    try {
      const savedUser = await this.userRepository.save(newUser)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = savedUser // Exclude passwordHash from the returned object
      return result
    } catch (error) {
      // Handle potential database errors (e.g., unique constraint violation if check failed due to race condition)
      if (error.code === '23505') {
        // Unique violation code for PostgreSQL, adjust if using different DB
        throw new ConflictException('Email already registered')
      }
      console.error('Database save failed:', error)
      throw new InternalServerErrorException('Failed to save user.')
    }
  }

  /**
   * Validates user credentials. Called by AuthService usually.
   * @param email The user's email.
   * @param pass The user's plain text password.
   * @returns The user object without the password hash if valid, otherwise null or throws error.
   */
  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'passwordHash'> | null> {
    const user = await this.findByEmail(email) // Use existing findByEmail which returns the full User object including passwordHash
    if (!user) {
      // User not found - return null for the auth strategy to handle
      return null
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.passwordHash)
    if (!isPasswordMatching) {
      // Password doesn't match - return null for the auth strategy to handle
      return null
      // Note: Throwing UnauthorizedException here might be too early if used in a Passport strategy's validate method.
      // Passport strategies typically expect null or the user object. The strategy itself throws UnauthorizedException.
      // Let's revert to returning null for incorrect password as well.
    }

    // If user exists and password matches, return user data (excluding password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user
    return result
  }

  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Omit<User, 'passwordHash'>[]> {
    // Ensure passwordHash is not selected or filter it out before returning
    // Using queryBuilder allows explicit selection
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.fullName', 'user.createdAt'])
      .getMany()
    // Or find and map:
    // const users = await this.userRepository.find();
    // return users.map(({ passwordHash, ...rest }) => rest);
  }

  @UseGuards(AuthGuard('jwt'))
  async findOne(id: string): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.fullName', 'user.createdAt'])
      .where('user.id = :id', { id })
      .getOne()

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`)
    }
    return user
  }

  // Add this method to find user by email, needed for authentication
  // Ensure this returns the full User object including passwordHash for validation
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } })
  }

  @UseGuards(AuthGuard('jwt'))
  async update(
    @UserDecorator('userId') userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    // Hash password if it's being updated
    let passwordHashToUpdate: string | undefined = undefined
    if (updateUserDto.password) {
      try {
        const saltRounds = 10
        passwordHashToUpdate = await bcrypt.hash(
          updateUserDto.password,
          saltRounds,
        )
      } catch (error) {
        console.error('Password hashing failed during update:', error)
        throw new InternalServerErrorException('Failed to process update.')
      }
    }

    // Use preload to safely update existing entity
    // Create a payload excluding the plain password but including the hash if it was generated
    const { password, ...restOfDto } = updateUserDto
    const updatePayload: Partial<User> = {
      ...restOfDto,
      ...(passwordHashToUpdate && { passwordHash: passwordHashToUpdate }), // Conditionally add passwordHash
    }

    const userToUpdate = await this.userRepository.preload({
      id: userId,
      ...updatePayload, // Spread the prepared payload
    })

    if (!userToUpdate) {
      throw new NotFoundException(`User with ID "${userId}" not found`)
    }

    try {
      const updatedUser = await this.userRepository.save(userToUpdate)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = updatedUser // Exclude passwordHash
      return result
    } catch (error) {
      // Handle potential database errors (e.g., unique constraint violation for email)
      if (error.code === '23505') {
        // Check for unique constraint violation
        throw new ConflictException('Email already exists.')
      }
      console.error('Database update failed:', error)
      throw new InternalServerErrorException('Failed to update user.')
    }
  }

  @UseGuards(AuthGuard('jwt'))
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`)
    }
  }

  /**
   * Retrieves profile information for a given user ID.
   * Typically used for fetching the authenticated user's profile ('me' endpoint).
   * Excludes sensitive information like the password hash.
   * @param userId The ID of the user whose profile is requested.
   * @returns The user profile data.
   * @throws {NotFoundException} If the user with the given ID is not found.
   */
  @UseGuards(AuthGuard('jwt'))
  async getProfile(
    @UserDecorator('userId') userId: string,
  ): Promise<Omit<User, 'passwordHash'>> {
    // We can reuse the logic from findOne or implement it directly
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.fullName', 'user.createdAt']) // Select only necessary fields
      .where('user.id = :id', { id: userId })
      .getOne()

    if (!user) {
      // This might indicate an issue if the userId comes from a valid JWT,
      // but it's good practice to handle the case where the user might have been deleted.
      throw new NotFoundException(`User with ID "${userId}" not found`)
    }

    // The query already selected only non-sensitive fields, so we can return it directly.
    return user
  }
} // End of class UsersService
