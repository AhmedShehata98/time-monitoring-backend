import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompanyPoliciesService } from './company_policies.service'
import { CompanyPoliciesController } from './company_policies.controller'
import { CompanyPolicy } from './entities/company_policy.entity'
import { AuthorizationModule } from '../authorization/authorization.module'
import { Company } from 'src/companies/entities/company.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyPolicy]),
    TypeOrmModule.forFeature([Company]),
    AuthorizationModule,
  ],
  controllers: [CompanyPoliciesController],
  providers: [CompanyPoliciesService],
  exports: [CompanyPoliciesService],
})
export class CompanyPoliciesModule {}
