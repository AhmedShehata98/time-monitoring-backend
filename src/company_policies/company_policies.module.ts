import { Module } from '@nestjs/common';
import { CompanyPoliciesService } from './company_policies.service';
import { CompanyPoliciesController } from './company_policies.controller';

@Module({
  controllers: [CompanyPoliciesController],
  providers: [CompanyPoliciesService],
})
export class CompanyPoliciesModule {}
