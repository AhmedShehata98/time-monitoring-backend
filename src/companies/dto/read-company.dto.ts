import { Expose } from '@nestjs/class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class ReadCompanyDto {
  @ApiProperty({ description: 'Company ID' })
  @Expose()
  id: string

  @ApiProperty({ description: 'Company name' })
  @Expose()
  name: string

  @ApiProperty({ description: 'Creation date' })
  @Expose()
  createdAt: Date
}
