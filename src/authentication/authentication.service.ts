import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './types/jwt-payload'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/users/entities/user.entity'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(user: LoginDto): Promise<{ accessToken: string }> {
    if (!user?.email || !user?.password) {
      throw new BadRequestException('Email and password are required');
    }

    const userResult = await this.userRepository.findOne({
      where: {
        email: user.email.toLowerCase().trim(), // Normalize email
      }
    });

    if (!userResult) {
      throw new BadRequestException('Invalid credentials');
    }
    
    try {
      const isMatch = await bcrypt.compare(user.password, userResult.passwordHash);
      if (!isMatch) {
        throw new BadRequestException('Invalid credentials');
      }

      const token = await this.jwtSignAsync({
        userId: userResult.id,
      });

      return token;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Authentication failed');
    }
  }

  async jwtSignAsync(payload: JwtPayload): Promise<{ accessToken: string }> {
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  jwtSign(payload: JwtPayload): { accessToken: string } {
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }

  decodePayload(token: string): JwtPayload {
    return this.jwtService.decode(token)
  }
}
