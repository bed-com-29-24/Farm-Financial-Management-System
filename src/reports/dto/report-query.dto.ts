import { IsDateString, IsOptional, IsIn } from 'class-validator';

export class ReportQueryDto {
  @IsDateString()
  from: string;

  @IsDateString()
  to: string;

  @IsOptional()
  @IsIn(['pdf', 'csv'])
  format?: 'pdf' | 'csv';
}

export class TrendQueryDto {
  @IsDateString()
  year: string;
}
