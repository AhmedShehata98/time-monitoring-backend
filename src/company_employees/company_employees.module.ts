import { Module } from '@nestjs/common';
import { CompanyEmployeesService } from './company_employees.service';
import { CompanyEmployeesController } from './company_employees.controller';

@Module({
  controllers: [CompanyEmployeesController],
  providers: [CompanyEmployeesService],
})
export class CompanyEmployeesModule {}
