import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './types/jwt-payload'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
