import { ProductDto } from './dto/product.dto';
import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async create(product: ProductDto) {
    return await this.repository.save(product);
  }

  async update(productId: string, product: any) {
    return await this.repository.update(
      {
        id: productId,
      },
      product,
    );
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }

  async findOne(params: FindOneOptions<ProductEntity> = {}) {
    return await this.repository.findOne(params);
  }

  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<ProductEntity>> {
    return await paginate<ProductEntity>(this.repository, options);
  }
}
