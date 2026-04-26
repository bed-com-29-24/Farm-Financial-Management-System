/*
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity'; // Points to your renamed singular file
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    // Register the Category entity for this module
    TypeOrmModule.forFeature([Category]),

    // forwardRef is necessary because Categories checks Transactions during DELETE,
    // and Transactions needs Categories during CREATE.
    forwardRef(() => TransactionsModule),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  // Export both so the Transactions module can see the Category entity
  exports: [CategoriesService, TypeOrmModule],
})
export class CategoriesModule {}
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    // Register only the Category entity for now
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  // Exporting these allows other modules to use Category when they are ready
  exports: [CategoriesService, TypeOrmModule],
})
export class CategoriesModule {}
