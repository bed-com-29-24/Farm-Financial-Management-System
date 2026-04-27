import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { CreateCategoryDto } from './dto/create.category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,

    @InjectRepository(Transaction) // ← add this
    private transactionRepo: Repository<Transaction>,
  ) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create(data as Partial<Category>);
    return this.categoryRepo.save(category);
  }

  async findAll(type?: 'income' | 'expense'): Promise<Category[]> {
    const where = type ? { type } : {};
    return this.categoryRepo.find({
      where,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Category | null> {
    return this.categoryRepo.findOne({
      where: { categoryId: id },
    });
  }

  async update(id: number, data: Partial<Category>): Promise<Category | null> {
    await this.categoryRepo.update(id, data);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('Category not found');
    if (category.isSystem === 1) {
      throw new ForbiddenException('System categories cannot be deleted');
    }

    // ← add this check before deleting
    const inUse = await this.transactionRepo.count({
      where: { category: { categoryId: id } },
    });
    if (inUse > 0) {
      throw new ConflictException(
        'Category is referenced by existing transactions.',
      );
    }

    await this.categoryRepo.delete(id);
  }
}
