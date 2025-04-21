import { PartialType, OmitType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsOptional, IsString, MinLength } from 'class-validator'

// Inherit from CreateUserDto, but omit 'email' as it shouldn't be updated this way.
// Make all inherited fields optional using PartialType.
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {
  // You might want to handle password updates separately for security.
  // If allowing password updates here, ensure proper validation.
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string // Make password optional for updates

  // fullName is already optional via PartialType
}
