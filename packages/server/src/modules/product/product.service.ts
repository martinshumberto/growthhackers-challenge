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
import NotFoundCustomException from '../../common/exceptions/notFound.exception';
import { validate } from 'class-validator';
import { promisify } from 'util';
import * as fs from 'fs';

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

  async createMany(products: ProductDto[]) {
    return await this.repository.save(products);
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

  async findById(id: string): Promise<ProductEntity> {
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
    const queryBuilder = this.repository.createQueryBuilder('products');
    queryBuilder.leftJoinAndSelect('products.category', 'categories');
    queryBuilder.orderBy('products.updatedAt', 'DESC');
    return await paginate<ProductEntity>(queryBuilder, options);
  }

  async findAllByCategoryId(categoryId) {
    const queryBuilder = this.repository.createQueryBuilder('products');
    if (categoryId) {
      queryBuilder.where('products.categoryId = :categoryId', { categoryId });
      queryBuilder.leftJoinAndSelect('products.category', 'categories');
    }
    queryBuilder.orderBy('products.updatedAt', 'DESC');
    return queryBuilder.getMany();
  }

  async extractJSONFromFile(pathFileTemp): Promise<ProductDto[]> {
    const readFileAsync = promisify(fs.readFile);
    const dataStringJSON = await readFileAsync(pathFileTemp, 'utf8');
    let dataJSON = [new ProductDto()];
    try {
      dataJSON = JSON.parse(dataStringJSON);
      dataJSON.forEach(async (item) => {
        await validate(item);
      });
    } catch (e) {
      throw {
        status: 422,
        message: `O conteúdo JSON contido no arquivo é inválido. Confira o nosso modelo, e tente novamente após corrigir seu arquivo.`,
      };
    }
    const unlinkAsync = promisify(fs.unlink);
    await unlinkAsync(pathFileTemp);

    return dataJSON;
  }
}
