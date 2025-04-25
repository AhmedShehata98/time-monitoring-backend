import { Module, forwardRef } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/users/entities/user.entity'
import { UsersModule } from 'src/users/users.module' // Import UsersModule
import { CompanyEmployee } from 'src/company_employees/entities/company_employee.entity'
import { AuthenticationController } from './authentication.controller'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET')

        return {
          secret: secret,
          signOptions: { expiresIn: '1d' },
        }
      },
      inject: [ConfigService],
    }),
    forwardRef(() => UsersModule), 
    TypeOrmModule.forFeature([User, CompanyEmployee]), 
    
  ],
  providers: [AuthenticationService, JwtStrategy],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
