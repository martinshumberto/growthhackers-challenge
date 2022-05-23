import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty({
    message: 'Informe o nome do produto',
  })
  title: string;

  description: string | null;

  @IsNotEmpty({
    message: 'Informe o preço do produto',
  })
  price: number;

  categoryId: string | null;

  @IsNotEmpty({
    message: 'Informe o status do produto',
  })
  status: boolean | null;
}
