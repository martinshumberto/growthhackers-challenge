import { Test, TestingModule } from '@nestjs/testing';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

const categoriesList: CategoryEntity[] = [
  new CategoryEntity({
    id: '11b68d34-0ada-4181-84dc-6453300770aa',
    title: 'Title One',
    description: 'Description One',
  }),
  new CategoryEntity({
    id: '99b98955-7123-4a39-9d2d-84cdd2b26ac8',
    title: 'Title Two',
    description: 'Description Two',
  }),
  new CategoryEntity({
    id: 'b39dbe45-c60a-45af-9599-c1d79f3b9994',
    title: 'Title Three',
    description: 'Description Three',
  }),
];

const newEntity = new CategoryEntity({
  title: 'New Title',
  description: 'New Description',
});

const updateEntity = new CategoryEntity({
  title: 'Updated Title',
  description: 'Updated Description',
});

describe('CategoryService', () => {
  let service: CategoryService;

  const mockRepository = {
    create: jest.fn().mockResolvedValue(newEntity),
    update: jest.fn().mockResolvedValue(updateEntity),
    delete: jest.fn().mockResolvedValue(undefined),
    findById: jest.fn().mockResolvedValue(categoriesList[0]),
    findAll: jest.fn().mockResolvedValue(categoriesList[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CategoryService,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const category = newEntity;
      mockRepository.create.mockReturnValue(category);
      const categoryCreated = await service.create(category);
      expect(categoryCreated).toMatchObject(category);
    });
  });

  describe('findAll', () => {
    it('should have two categories', async () => {
      mockRepository.findAll.mockReturnValue(categoriesList);
      const categories = await service.findAll(
        {
          page: Number(1),
          limit: Number(10),
          route: `${process.env.API_URL}/categories`,
        },
        {
          search: null,
        },
      );
      expect(categories).toHaveLength(3);
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should find a existent category', async () => {
      const category = categoriesList[0];
      mockRepository.findById.mockReturnValue(category);
      const categoryFound = await service.findById(category.id);

      expect(categoryFound).toMatchObject(category);
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a existent category', async () => {
      const category = categoriesList[0];
      mockRepository.findById.mockReturnValue(category.id);
      mockRepository.update.mockReturnValue(updateEntity);
      mockRepository.create.mockReturnValue(updateEntity);

      const updatedCategory = await service.update(category.id, updateEntity);

      expect(updatedCategory).toMatchObject(updateEntity);
    });
  });

  describe('delete', () => {
    it('should delete a existent category', async () => {
      const category = categoriesList[0];
      mockRepository.findById.mockReturnValue(category.id);
      const removedCategory = await service.delete(category.id);
      expect(removedCategory).toBeUndefined();
    });
  });
});
