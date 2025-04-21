import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyPolicyDto } from './create-company_policy.dto';

export class UpdateCompanyPolicyDto extends PartialType(CreateCompanyPolicyDto) {}
