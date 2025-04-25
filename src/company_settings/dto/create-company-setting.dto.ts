import { IsNumber, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanySettingDto {
  @ApiProperty({ description: 'Company ID' })
  @IsUUID()
  companyId: string

  @ApiProperty({ description: 'Work hours per day' })
  @IsNumber()
  workHoursPerDay: number

  @ApiProperty({ description: 'Work days per week' })
  @IsNumber()
  workDaysPerWeek: number

  @ApiProperty({ description: 'Annual leave days' })
  @IsNumber()
  annualLeaveDays: number

  @ApiProperty({ description: 'Sick leave days' })
  @IsNumber()
  sickLeaveDays: number
}
