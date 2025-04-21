import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyEmployeeDto } from './create-company_employee.dto';

export class UpdateCompanyEmployeeDto extends PartialType(CreateCompanyEmployeeDto) {}
