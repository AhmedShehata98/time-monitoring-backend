import { Expose } from '@nestjs/class-transformer'
import { EmploymentMode } from '../enums/employment-mode.enum'
import { TimeTrackingMode } from '../enums/time-tracking-mode.enum'
import { ApiProperty } from '@nestjs/swagger'

export class ReadCompanyPolicyDto {
  @ApiProperty({ description: 'Policy ID' })
  @Expose()
  id: string

  @ApiProperty({ description: 'Policy name' })
  @Expose()
  name: string

  @ApiProperty({ description: 'Policy description' })
  @Expose()
  description: string

  @ApiProperty({ description: 'Is policy active' })
  @Expose()
  isActive: boolean

  @ApiProperty({ description: 'Employment mode' })
  @Expose()
  employment_mode: EmploymentMode

  @ApiProperty({ description: 'Time tracking mode' })
  @Expose()
  time_tracking_mode: TimeTrackingMode

  @Expose()
  companyId: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date
}
