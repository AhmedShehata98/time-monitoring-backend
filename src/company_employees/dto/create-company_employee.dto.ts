import { IsNotEmpty, IsString } from '@nestjs/class-validator'

export class CreateCompanyEmployeeDto {
  @IsNotEmpty()
  @IsString()
  companyId: number

  @IsNotEmpty()
  @IsString()
  employeeId: number

  @IsNotEmpty()
  @IsString()
  actorUserId: number
}
