import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsOptional, IsString } from 'class-validator';

export class RegisterDto {

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  firstName!: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  farmName?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password!: string;
}