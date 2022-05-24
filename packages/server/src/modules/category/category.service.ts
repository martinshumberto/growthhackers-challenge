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
import NotFoundCustomException from 'src/common/exceptions/notFound.exception';
import { validate } from 'class-validator';

enum PostgresErrorCode {
  UniqueViolation = '23505',
  ForeignKeyViolation = '23503',
}

interface ICategorySearch {
  search?: string;
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async create(category: CategoryDto) {
    await validate(category);
    return await this.repository.save(category);
  }

  async update(id: string, category: CategoryDto) {
    await validate(category);
    const updateResponse = await this.repository.update({ id }, category);
    if (!updateResponse.affected) {
      throw new NotFoundCustomException(id);
    }
    return updateResponse;
  }

  async delete(id: string) {
    return await this.repository
      .delete(id)
      .then((response) => {
        if (!response.affected) {
          throw new NotFoundCustomException(id);
        }
        return response;
      })
      .catch((e) => {
        if (PostgresErrorCode.ForeignKeyViolation) {
          throw {
            status: 422,
            message:
              'Não é possível deletar esta categoria, pois existe produtos vinculados a ela.',
          };
        }
        throw e;
      });
  }

  async findOne(params: FindOneOptions<CategoryEntity> = {}) {
    return await this.repository.findOne(params);
  }

  async getById(id: string): Promise<CategoryEntity> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(
    options: IPaginationOptions,
    { search }: ICategorySearch,
  ): Promise<Pagination<CategoryEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('categories');
    if (search) {
      queryBuilder.where('categories.title ilike :title', {
        title: `%${search}%`,
      });
    }
    return await paginate<CategoryEntity>(queryBuilder, options);
  }
}
