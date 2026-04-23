import {IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateCategoriesDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsString()
  @IsNotEmpty()
  type: 'income' | 'expense';

}