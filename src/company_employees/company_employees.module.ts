import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompanyEmployeesService } from './company_employees.service'
import { CompanyEmployeesController } from './company_employees.controller'
import { CompanyEmployee } from './entities/company_employee.entity'
import { User } from '../users/entities/user.entity'
import { Company } from '../companies/entities/company.entity'
import { RolesGuard } from 'src/common/guards/roles.guard'
import { AuthorizationModule } from 'src/authorization/authorization.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEmployee, User, Company]),
    AuthorizationModule,
  ],
  controllers: [CompanyEmployeesController],
  providers: [CompanyEmployeesService, RolesGuard],
  exports: [CompanyEmployeesService], // Export the service for use in other modules
})
export class CompanyEmployeesModule {}
