import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator'
import { EmploymentMode } from '../enums/employment-mode.enum'
import { TimeTrackingMode } from '../enums/time-tracking-mode.enum'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanyPolicyDto {
  @ApiProperty({ description: 'Policy name' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'Policy description' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ description: 'Is policy active' })
  @IsBoolean()
  isActive: boolean

  @ApiProperty({ description: 'Employment mode' })
  @IsEnum(EmploymentMode)
  employmentMode: EmploymentMode

  @ApiProperty({ description: 'Time tracking mode' })
  @IsEnum(TimeTrackingMode)
  timeTrackingMode: TimeTrackingMode
}
