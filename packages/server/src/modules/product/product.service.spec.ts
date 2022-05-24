import { Test, TestingModule } from '@nestjs/testing';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

const productsList: ProductEntity[] = [
  new ProductEntity({
    id: '11b68d34-0ada-4181-84dc-6453300770aa',
    title: 'Title One',
    description: 'Description One',
  }),
  new ProductEntity({
    id: '99b98955-7123-4a39-9d2d-84cdd2b26ac8',
    title: 'Title Two',
    description: 'Description Two',
  }),
  new ProductEntity({
    id: 'b39dbe45-c60a-45af-9599-c1d79f3b9994',
    title: 'Title Three',
    description: 'Description Three',
  }),
];

const newEntity = new ProductEntity({
  title: 'New Title',
  description: 'New Description',
  price: 10,
  status: false,
  categoryId: null,
});

const updateEntity = new ProductEntity({
  title: 'Updated Title',
  description: 'Updated Description',
  price: 50,
  status: true,
  categoryId: null,
});

describe('ProductService', () => {
  let service: ProductService;

  const mockRepository = {
    create: jest.fn().mockResolvedValue(newEntity),
    update: jest.fn().mockResolvedValue(updateEntity),
    delete: jest.fn().mockResolvedValue(undefined),
    findById: jest.fn().mockResolvedValue(productsList[0]),
    findAll: jest.fn().mockResolvedValue(productsList[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const product = newEntity;
      mockRepository.create.mockReturnValue(product);
      const productCreated = await service.create(product);
      expect(productCreated).toMatchObject(product);
    });
  });

  describe('findAll', () => {
    it('should have two products', async () => {
      mockRepository.findAll.mockReturnValue(productsList);
      const products = await service.findAll({
        page: Number(1),
        limit: Number(10),
        route: `${process.env.API_URL}/products`,
      });
      expect(products).toHaveLength(3);
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should find a existent product', async () => {
      const product = productsList[0];
      mockRepository.findById.mockReturnValue(product);
      const productFound = await service.findById(product.id);

      expect(productFound).toMatchObject(product);
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a existent product', async () => {
      const product = productsList[0];
      mockRepository.findById.mockReturnValue(product.id);
      mockRepository.update.mockReturnValue(updateEntity);
      mockRepository.create.mockReturnValue(updateEntity);

      const updatedProduct = await service.update(product.id, updateEntity);

      expect(updatedProduct).toMatchObject(updateEntity);
    });
  });

  describe('delete', () => {
    it('should delete a existent product', async () => {
      const product = productsList[0];
      mockRepository.findById.mockReturnValue(product.id);
      const removedProduct = await service.delete(product.id);
      expect(removedProduct).toBeUndefined();
    });
  });
});
