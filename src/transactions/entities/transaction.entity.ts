import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Farmer } from '../../farmers/entities/farmer.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity({ name: 'FFMS_TRANSACTIONS' })
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'TRANSACTION_ID' })
  transactionId: number;

  @ManyToOne(() => Farmer, { eager: false })
  @JoinColumn({ name: 'FARMER_ID' })
  farmer: Farmer;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'CATEGORY_ID' })
  category: Category;

  @Column({ name: 'TYPE', length: 10 })
  type: 'income' | 'expense';

  @Column({ name: 'AMOUNT', type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @Column({ name: 'TRANSACTION_DATE', type: 'date' })
  transactionDate: Date;

  @Column({ name: 'NOTES', length: 1000, nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;
}
