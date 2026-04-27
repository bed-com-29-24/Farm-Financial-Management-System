import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { Transaction } from '../transactions/entities/transaction.entity'; // ← add this

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Transaction]), // ← add Transaction here
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService, TypeOrmModule],
})
export class CategoriesModule {}
