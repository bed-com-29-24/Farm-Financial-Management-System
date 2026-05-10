
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsIn(['budget_alert', 'reminder', 'system'])
  type: 'budget_alert' | 'reminder' | 'system';
}