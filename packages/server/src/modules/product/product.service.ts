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
import NotFoundCustomException from 'src/common/exceptions/notFound.exception';
import { validate } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async create(product: ProductDto) {
    await validate(product);
    return await this.repository.save(product);
  }

  async update(id: string, product: ProductDto) {
    await validate(product);
    const updateResponse = await this.repository.update({ id }, product);
    if (!updateResponse.affected) {
      throw new NotFoundCustomException(id);
    }
    return updateResponse;
  }

  async delete(id: string) {
    const deleteResponse = await this.repository.delete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundCustomException(id);
    }
    return deleteResponse;
  }

  async findOne(params: FindOneOptions<ProductEntity> = {}) {
    return await this.repository.findOne(params);
  }

  async getById(id: string): Promise<ProductEntity> {
    return await this.repository.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });
  }

  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<ProductEntity>> {
    return await paginate<ProductEntity>(this.repository, options);
  }
}
