import { Farmer } from 'src/farmers/entities/farmer.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'NOTIFICATIONS'})
export class Notification {
  @PrimaryGeneratedColumn({name: 'NOTIFICATION_ID'})
  notificationId: number;

  @ManyToOne(() => Farmer, { eager: false })
  @JoinColumn({ name: 'FARMER_ID' })
  farmer: Farmer;

  @Column()
  title: string;

  @Column({name: 'MESSAGE', length: 1000})
  message: string;

  @Column({name: 'TYPE', length: 30})
  type: 'budget alert' | 'reminder' | 'system';

  @Column({name: 'IS_READ', type: 'number', default: 0})
    isRead: number;
}