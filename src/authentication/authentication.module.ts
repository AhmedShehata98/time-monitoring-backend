import { Module } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthenticationService, JwtStrategy],
  controllers: [],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
