import { IsIn, IsInt, IsPositive, IsNumber, IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTransactionDto {
  @IsIn(['income', 'expense'])
  type!: 'income' | 'expense';

  @IsInt()
  @IsPositive()
  category_id!: number;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  amount!: number;

  @IsDateString()
  transaction_date!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
