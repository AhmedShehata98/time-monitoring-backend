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
import { AuthenticationService } from 'src/authentication/authentication.service' // Import AuthenticationService
import * as bcrypt from 'bcrypt'
import { AuthGuard } from '@nestjs/passport'
import { User as UserDecorator } from '../common/decorators/user.decorator'
import { JwtPayload } from 'src/authentication/types/jwt-payload'
import { ConfigService } from '@nestjs/config'
// Import LoginUserDto if you have one, otherwise use inline types or CreateUserDto subset
// import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authenticationService: AuthenticationService, 
    private readonly configService: ConfigService 
  ) {
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ user: Omit<User, 'passwordHash'>; accessToken: string }> {
    const { email, password, fullName } = createUserDto

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } })
    if (existingUser) {
      throw new ConflictException('Email already registered')
    }

     // Or use a configuration value
    let hashedPassword: string
    try {
      const saltRounds = this.configService.get<number>('SALT_ROUNDS');
      hashedPassword = await bcrypt.hash(password, Number(saltRounds) )
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

      // Generate JWT token
      const payload :JwtPayload= { userId: savedUser.id}
      const { accessToken } = await this.authenticationService.jwtSignAsync(payload)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...userResult } = savedUser 

      return { user: userResult, accessToken }
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
    const user = await this.findByEmail(email) 
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

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    const { password, ...profileUpdates } = updateUserDto;

    // Fetch the user first to ensure they exist
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    // Update password if provided
    if (password) {
      await this._updatePassword(user, password);
    }

    // Update other profile details if provided
    if (Object.keys(profileUpdates).length > 0) {
      await this._updateProfileDetails(user, profileUpdates);
    }

    // Refetch the updated user to return the latest state without password hash
    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'fullName', 'createdAt'], // Ensure passwordHash is not selected
    });

    if (!updatedUser) {
      // Should not happen if updates were successful, but good practice to check
      throw new InternalServerErrorException('Failed to retrieve updated user details.');
    }

    return updatedUser;
  }

  // Private helper method to update password
  private async _updatePassword(user: User, newPassword: string): Promise<void> {
    let hashedPassword: string;
    try {
      const saltRounds = this.configService.get<number>('SALT_ROUNDS');
      hashedPassword = await bcrypt.hash(newPassword, saltRounds as number);
    } catch (error) {
      console.error('Password hashing failed during update:', error);
      throw new InternalServerErrorException('Failed to process password update.');
    }

    user.passwordHash = hashedPassword;
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.error('Database save failed during password update:', error);
      throw new InternalServerErrorException('Failed to update password.');
    }
  }

  // Private helper method to update profile details (excluding password)
  private async _updateProfileDetails(user: User, updates: Partial<Omit<UpdateUserDto, 'password'>>): Promise<void> {
    // Apply updates to the user object
    Object.assign(user, updates);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      // Handle potential database errors (e.g., unique constraint violation for email)
      if (error.code === '23505') { // Check for unique constraint violation (PostgreSQL specific)
        throw new ConflictException('Email already exists.');
      }
      console.error('Database save failed during profile update:', error);
      throw new InternalServerErrorException('Failed to update profile details.');
    }
  }

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