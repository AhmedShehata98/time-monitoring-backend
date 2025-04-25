import { IsNumber, IsOptional } from 'class-validator'

export class UpdateCompanySettingDto {
  @IsNumber()
  @IsOptional()
  workHoursPerDay?: number

  @IsNumber()
  @IsOptional()
  workDaysPerWeek?: number

  @IsNumber()
  @IsOptional()
  annualLeaveDays?: number

  @IsNumber()
  @IsOptional()
  sickLeaveDays?: number
}
