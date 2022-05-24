import { CategoryEntity } from './category.entity';
import {
  Controller,
  Get,
  Post,
  Put,
  Res,
  Body,
  HttpStatus,
  Param,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async index(
    @Query('search') search = null,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<CategoryDto>> {
    return this.categoryService.findAll(
      {
        page: Number(page),
        limit: Number(limit),
        route: `${process.env.API_URL}/categories`,
      },
      {
        search,
      },
    );
  }

  @Get('/show/:id')
  async show(@Param('id') id: string): Promise<CategoryEntity> {
    return this.categoryService.getById(id);
  }

  @Post('/create')
  async create(@Body() product: CategoryDto, @Res() res) {
    await this.categoryService.create(product);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'A categoria foi criada com sucesso.',
    });
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() product: CategoryDto,
    @Res() res,
  ) {
    await this.categoryService.update(id, product);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'A categoria foi atualizada com sucesso.',
    });
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string, @Res() res) {
    await this.categoryService.delete(id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'A categoria foi deletada com sucesso.',
    });
  }
}
