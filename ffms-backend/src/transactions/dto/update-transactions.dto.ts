import { IsOptional, IsInt, IsPositive, IsNumber, IsDateString, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTransactionDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  category_id?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  amount?: number;

  @IsOptional()
  @IsDateString()
  transaction_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
