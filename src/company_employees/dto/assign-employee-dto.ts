import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator'
import { ContractType } from '../enums/contract-type'
import { Status } from '../enums/status'
import { PolicyType } from '../enums/policy-type'
import { WeeklyHours } from '../enums/weeekly-hours'

export class AssignEmployeeDto {
  @IsNotEmpty()
  @IsString()
  companyId: string

  @IsNotEmpty()
  @IsString()
  employeeId: string

  @IsOptional()
  @IsNumber()
  hourlyRate: number

  @IsNotEmpty()
  @IsString()
  contractType: ContractType

  @IsNotEmpty()
  @IsString()
  status: Status

  @IsNotEmpty()
  @IsString()
  policyType: PolicyType

  @IsOptional()
  @IsNumber()
  weeklyHours: number | WeeklyHours
}
