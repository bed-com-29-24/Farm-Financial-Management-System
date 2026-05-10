import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transactions.dto';
import { TransactionQueryDto } from './dto/transaction-query.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepo: Repository<Transaction>,
  ) {}

  async create(farmerId: number, dto: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionsRepo.create({
      farmer: { farmerId },
      category: { categoryId: dto.category_id },
      type: dto.type,
      amount: dto.amount,
      transactionDate: dto.transaction_date,
      notes: dto.notes,
    });

    return this.transactionsRepo.save(transaction);
  }

  async findAll(farmerId: number, query: TransactionQueryDto) {
    return this.transactionsRepo.find({
      where: {
        farmer: { farmerId },
      },
      relations: ['category'],
    });
  }
}