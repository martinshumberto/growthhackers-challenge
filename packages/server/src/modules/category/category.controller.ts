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
  Headers,
  Req,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async index(
    @Body() body,
    @Res() res,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<CategoryEntity[]> {
    try {
      return this.categoryService.findAll({
        page: Number(page),
        limit: Number(limit),
        route: `${process.env.API_URL}/products`,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: err,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
