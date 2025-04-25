import { IsNotEmpty, IsString } from '@nestjs/class-validator'
import { IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: 'Company logo', required: false })
  @IsString()
  @IsOptional()
  logo: string

  @ApiProperty({ description: 'Company bio', required: false })
  @IsString()
  @IsOptional()
  bio: string

  @ApiProperty({ description: 'Company specialty' })
  @IsString()
  @IsNotEmpty()
  specialty: string
}
