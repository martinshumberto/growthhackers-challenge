import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ProductDto {
  @IsOptional()
  @IsUUID('all', {
    message: 'O formato do id está incorreto.',
  })
  id?: string;

  @IsString({
    message: 'O título do produto deve estar formato de texto.',
  })
  @MinLength(3, {
    message: 'O título do produto deve ter pelo menos 3 caracteres.',
  })
  @MaxLength(255, {
    message: 'O título do produto deve ter no máximo 255 caracteres.',
  })
  @IsNotEmpty({
    message: 'Informe o nome do produto.',
  })
  title: string;

  @IsOptional()
  @IsString({
    message: 'A descrição do produto deve estar formato de texto.',
  })
  description?: string | null;

  @IsNotEmpty({
    message: 'Informe o preço do produto.',
  })
  @IsDecimal(
    {},
    {
      message: 'O preço do produto deve estar em formato decimal.',
    },
  )
  price: number;

  @IsBoolean()
  @IsNotEmpty({
    message: 'Informe o status do produto',
  })
  status: boolean;

  @IsOptional()
  @IsUUID('all', {
    message: 'O formato do id da categoria está incorreto.',
  })
  categoryId?: string | null;
}
