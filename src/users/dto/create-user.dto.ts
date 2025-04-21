import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // Example: Enforce a minimum password length
  password: string; // We'll receive the plain password and hash it in the service

  @IsString()
  @IsOptional() // Full name might be optional during creation
  fullName?: string;
}