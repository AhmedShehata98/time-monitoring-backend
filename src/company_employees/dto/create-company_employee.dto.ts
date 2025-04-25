import { IsNotEmpty, IsString } from '@nestjs/class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanyEmployeeDto {
  @ApiProperty({ description: 'Company ID' })
  @IsNotEmpty()
  @IsString()
  companyId: number

  @ApiProperty({ description: 'Employee ID' })
  @IsNotEmpty()
  @IsString()
  employeeId: number

  @ApiProperty({ description: 'Actor User ID' })
  @IsNotEmpty()
  @IsString()
  actorUserId: number
}
