import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';   
@Entity()
export class Categories {
  @PrimaryGeneratedColumn({name: 'CATEGORY_ID'})
  categoryId!: number;

  @Column({name: 'CATEGORY_NAME', length: 100, unique: true})
  categoryName!: string;

  @Column({name: 'TYPE', length: 50})
  type!: 'income' | 'expense';

  @Column({name: 'IS_SYSTEM', type: 'number', default: 0})
  isSystem!: number;

  @CreateDateColumn({name: 'CREATED_AT'})
  createdAt!: Date;

}