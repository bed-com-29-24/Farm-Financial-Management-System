import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service : any;

  const mockCategoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const dto: CreateCategoryDto = { name: 'Fertilizer', type: 'expense' };
      const result = { categoryId: 1, ...dto };
      mockCategoriesService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockCategoriesService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = [{ categoryId: 1, name: 'Seeds', type: 'expense' }];
      mockCategoriesService.findAll.mockResolvedValue(result);

      expect(await controller.findAll('expense' as any)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return an array of categories', async () => {
      const result = [{ categoryId: 1, name: 'Seeds', type: 'expense' }];
      mockCategoriesService.findOne.mockResolvedValue(result);

      expect(await controller.findOne(1)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const dto: UpdateCategoryDto = { name: 'Updated Name' };
      const result = { categoryId: 1, name: 'Updated Name', type: 'expense' };
      mockCategoriesService.update.mockResolvedValue(result);

      expect(await controller.update(1, dto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      mockCategoriesService.remove.mockResolvedValue({ deleted: true });

      expect(await controller.remove(1)).toEqual({ deleted: true });
    });
  });
});
