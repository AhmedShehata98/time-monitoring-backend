import { PartialType } from '@nestjs/mapped-types'
import { CreateCompanyDto } from './create-company.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiProperty({ description: 'Company name' })
  name: string

  @ApiProperty({ description: 'Company logo', required: false })
  logo: string

  @ApiProperty({ description: 'Company bio', required: false })
  bio: string

  @ApiProperty({ description: 'Company specialty' })
  specialty: string
}
