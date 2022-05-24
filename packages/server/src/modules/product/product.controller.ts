import { ProductDto } from './dto/product.dto';
import { ProductEntity } from './product.entity';
import {
  Controller,
  Get,
  Res,
  Body,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  Param,
  Put,
  Delete,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<ProductEntity>> {
    return this.productService.findAll({
      page: Number(page),
      limit: Number(limit),
      route: `${process.env.API_URL}/products`,
    });
  }

  @Get('/show/:id')
  async show(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.getById(id);
  }

  @Post('/create')
  async create(@Body() product: ProductDto, @Res() res) {
    await this.productService.create(product);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'O produto foi criado com sucesso.',
    });
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() product: ProductDto,
    @Res() res,
  ) {
    await this.productService.update(id, product);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'O produto foi atualizado com sucesso.',
    });
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string, @Res() res) {
    await this.productService.delete(id);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'O produto foi deletado com sucesso.',
    });
  }
}
