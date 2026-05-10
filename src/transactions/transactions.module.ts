import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { CategoriesModule } from '../categories/categories.module';
import { Farmer } from '../farmers/entities/farmer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Farmer]), CategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
