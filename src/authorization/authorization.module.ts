import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorizationService } from './authorization.service'
import { CompanyEmployee } from '../company_employees/entities/company_employee.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEmployee])],
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
