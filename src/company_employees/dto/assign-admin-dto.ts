import { IsString } from '@nestjs/class-validator'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import { WeeklyHours } from '../enums/weeekly-hours'
import { PolicyType } from '../enums/policy-type'
import { Status } from '../enums/status'
import { ContractType } from '../enums/contract-type'

export class AssignAdminDto {
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
