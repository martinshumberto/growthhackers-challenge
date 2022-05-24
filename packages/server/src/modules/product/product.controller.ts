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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const DIR_TEMP_FILES = `${__dirname}/../../../temp/`;

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

  @Post('/import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: DIR_TEMP_FILES,
      }),
    }),
  )
  async import(@Res() res, @UploadedFile() file, @Body() body) {
    const pathFileTemp = `${DIR_TEMP_FILES}/${file.filename}`;
    const products = await this.productService.extractJSONFromFile(
      pathFileTemp,
    );

    const productsWithCategory = products.map((product) => {
      return {
        ...product,
        categoryId: body?.categoryId ?? null,
      };
    });
    await this.productService.createMany(productsWithCategory);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message:
        'A importação foi um sucesso, navegue até a página de produtos para visualizar.',
    });
  }

  @Post('/export')
  async export(@Res() res, @Body() body) {
    const products = await this.productService.findAllByCategoryId(
      body.categoryId,
    );

    // const filename = `exportacao-produtos-${new Date().getTime()}.json`;
    // const mimetype = 'application/json';
    // res.setHeader('Content-Type', mimetype);
    // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    // res.send(products);

    return res.status(HttpStatus.OK).json(products);
  }
}
