import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ForbiddenException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repo: Repository<Category>;

  const mockCategory: Category = {
    categoryId: 1,
    name: 'Food',
    type: 'expense',
    isSystem: 0,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repo = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should delete a category', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockCategory);
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1 } as any);

    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
  });

  it('should throw ForbiddenException if category is system', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockResolvedValue({ ...mockCategory, isSystem: 1 });
    await expect(service.remove(1)).rejects.toThrow(ForbiddenException);
  });
});
