import { Module } from '@nestjs/common';
import { EmployeePoliciesService } from './employee_policies.service';
import { EmployeePoliciesController } from './employee_policies.controller';

@Module({
  controllers: [EmployeePoliciesController],
  providers: [EmployeePoliciesService],
})
export class EmployeePoliciesModule {}
