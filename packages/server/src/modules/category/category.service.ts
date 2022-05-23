import { CategoryDto } from './dto/category.dto';
import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async create(category: CategoryDto) {
    return await this.repository.save(category);
  }

  async update(categoryId: string, category: any) {
    return await this.repository.update(
      {
        id: categoryId,
      },
      category,
    );
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }

  async findOne(params: FindOneOptions<CategoryEntity> = {}) {
    return await this.repository.findOne(params);
  }

  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<CategoryEntity>> {
    return await paginate<CategoryEntity>(this.repository, options);
  }
}
