import { IsNotEmpty, IsString } from '@nestjs/class-validator'

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string
}
