import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({
    message: 'Informe o nome da categoria',
  })
  title: string;

  description: string | null;
}
