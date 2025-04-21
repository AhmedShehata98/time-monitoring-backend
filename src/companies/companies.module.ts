import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from './entities/company.entity'
import { User } from '../users/entities/user.entity'
import { CompanyEmployee } from '../company_employees/entities/company_employee.entity'
import { CompanyEmployeesModule } from '../company_employees/company_employees.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, User, CompanyEmployee]),
    CompanyEmployeesModule, // Import the module that provides CompanyEmployeesService
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService], // Export if other modules need to use this service
})
export class CompaniesModule {}
