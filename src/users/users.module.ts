import { Module, forwardRef } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthenticationModule } from 'src/authentication/authentication.module' // Import AuthenticationModule
import { AuthorizationModule } from 'src/authorization/authorization.module' // Import AuthorizationModule
import { User } from './entities/user.entity'
import { RolesGuard } from 'src/common/guards/roles.guard' // Updated import path

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthenticationModule),
    AuthorizationModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, RolesGuard],
  exports: [UsersService],
})
export class UsersModule {}
