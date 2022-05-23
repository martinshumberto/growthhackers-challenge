import {
  Controller,
  Get,
  Res,
  Body,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async index(
    @Body() body,
    @Res() res,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<any> {
    try {
      return this.productService.findAll({
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
