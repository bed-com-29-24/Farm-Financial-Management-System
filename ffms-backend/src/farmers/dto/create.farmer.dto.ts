import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  MaxLength,
  MinLength,
  IsEnum,
} from 'class-validator';

export enum FarmerRole {
  FARMER = 'farmer',
  ADMIN = 'admin',
}

export class CreateFarmerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fullName: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @MaxLength(20)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  farmName?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  password: string;

  @IsOptional()
  @IsEnum(FarmerRole)
  role?: FarmerRole;
}
