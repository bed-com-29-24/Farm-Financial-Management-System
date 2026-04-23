import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepo: Repository<Transaction>,
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
    const { type, category_id, from, to, page = 1, limit = 20 } = query;
    
    const qb = this.transactionsRepo.createQueryBuilder('t')
      .leftJoinAndSelect('t.category', 'category')
      .where('t.farmer.farmerId = :farmerId', { farmerId })
      .orderBy('t.transactionDate', 'DESC')
      .addOrderBy('t.createdAt', 'DESC');

    if (type) qb.andWhere('t.type = :type', { type });
    if (category_id) qb.andWhere('category.categoryId = :category_id', { category_id });
    if (from) qb.andWhere('t.transactionDate >= :from', { from });
    if (to) qb.andWhere('t.transactionDate <= :to', { to });

    const [data, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const totals = await this.transactionsRepo
      .createQueryBuilder('t')
      .select('t.type', 'type')
      .addSelect('SUM(t.amount)', 'total')
      .where('t.farmer.farmerId = :farmerId', { farmerId })
      .groupBy('t.type')
      .getRawMany();

    const totalIncome = Number(totals.find(r => r.type === 'income')?.total ?? 0);
    const totalExpenses = Number(totals.find(r => r.type === 'expense')?.total ?? 0);

    return {
      data,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        totalIncome,
        totalExpenses,
      },
    };
  }

  async findOne(farmerId: number, id: number): Promise<Transaction> {
    const transaction = await this.transactionsRepo.findOne({
      where: { transactionId: id, farmer: { farmerId } },
      relations: ['category'],
    });
    if (!transaction) throw new NotFoundException(`Transaction ${id} not found`);
    return transaction;
  }

  async update(farmerId: number, id: number, dto: UpdateTransactionDto): Promise<Transaction> {
    const transaction = await this.findOne(farmerId, id);
    if (dto.category_id) transaction.category = { categoryId: dto.category_id } as any;
    if (dto.amount) transaction.amount = dto.amount;
    if (dto.transaction_date) transaction.transactionDate = new Date(dto.transaction_date);
    if (dto.notes !== undefined) transaction.notes = dto.notes;
    return this.transactionsRepo.save(transaction);
  }

  async remove(farmerId: number, id: number): Promise<void> {
    const transaction = await this.findOne(farmerId, id);
    await this.transactionsRepo.delete(transaction.transactionId);
  }
}
