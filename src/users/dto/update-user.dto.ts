import { ApiProperty } from '@nestjs/swagger'
import { PartialType, OmitType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsOptional, IsString, MinLength } from 'class-validator'

// Inherit from CreateUserDto, but omit 'email' as it shouldn't be updated this way.
// Make all inherited fields optional using PartialType.
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {
  @ApiProperty({ description: 'User password', minLength: 6, required: false })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string

  @ApiProperty({ description: 'User full name', required: false })
  @IsString()
  @IsOptional()
  fullName?: string
}
