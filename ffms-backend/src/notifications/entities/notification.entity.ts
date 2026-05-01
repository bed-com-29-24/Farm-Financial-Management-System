import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn,} from 'typeorm';
import { Farmer } from '../../farmers/entities/farmers.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn({ name: 'NOTIFICATION_ID' })
  notificationId: number;

  @Column({ name: 'TITLE', length: 255, nullable: false })
  title: string;

  @Column({ name: 'MESSAGE', length: 500, nullable: false })
  message: string;

  @Column({ name: 'TYPE', length: 50 })
  type: 'budget_alert' | 'reminder' | 'system';

  @Column({ name: 'IS_READ', default: 0 })
  isRead: number;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  // IMPORTANT RELATION (matches Farmer entity: farmerId)
  @ManyToOne(() => Farmer)
  @JoinColumn({ name: 'FARMER_ID' })
  farmer: Farmer;
}