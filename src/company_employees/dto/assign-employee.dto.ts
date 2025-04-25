import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsUUID,
  IsNotEmpty,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Status } from '../enums/status'

export class AssignEmployeeDto {
  @ApiProperty({ description: 'Company ID' })
  @IsNotEmpty()
  @IsString()
  companyId: string

  @ApiProperty({ description: 'Employee ID' })
  @IsNotEmpty()
  @IsString()
  employeeId: string

  @ApiProperty({ description: 'Policy ID', format: 'uuid' })
  @IsUUID()
  policyId: string

  @ApiProperty({ description: 'Hourly rate', required: false })
  @IsNumber()
  @IsOptional()
  hourlyRate?: number

  @ApiProperty({ description: 'Employee status' })
  @IsEnum(Status)
  status: Status
}
