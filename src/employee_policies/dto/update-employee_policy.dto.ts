import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeePolicyDto } from './create-employee_policy.dto';

export class UpdateEmployeePolicyDto extends PartialType(CreateEmployeePolicyDto) {}
