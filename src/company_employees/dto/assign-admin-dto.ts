import { IsString } from '@nestjs/class-validator'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import { WeeklyHours } from '../enums/weeekly-hours'
import { PolicyType } from '../enums/policy-type'
import { Status } from '../enums/status'
import { ContractType } from '../enums/contract-type'
import { ApiProperty } from '@nestjs/swagger'

export class AssignAdminDto {
  @ApiProperty({ description: 'Hourly rate', required: false })
  @IsOptional()
  @IsNumber()
  hourlyRate: number

  @ApiProperty({ description: 'Contract type' })
  @IsNotEmpty()
  @IsString()
  contractType: ContractType

  @ApiProperty({ description: 'Status' })
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
