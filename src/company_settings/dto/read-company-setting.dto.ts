import { Expose } from '@nestjs/class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class ReadCompanySettingDto {
  @ApiProperty({ description: 'Setting ID' })
  @Expose()
  id: string

  @ApiProperty({ description: 'Company ID' })
  @Expose()
  companyId: string

  @ApiProperty({ description: 'Work hours per day' })
  @Expose()
  workHoursPerDay: number

  @ApiProperty({ description: 'Work days per week' })
  @Expose()
  workDaysPerWeek: number

  @ApiProperty({ description: 'Annual leave days' })
  @Expose()
  annualLeaveDays: number

  @ApiProperty({ description: 'Sick leave days' })
  @Expose()
  sickLeaveDays: number
}
