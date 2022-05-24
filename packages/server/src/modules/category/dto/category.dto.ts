import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CategoryDto {
  @IsOptional()
  @IsUUID('all', {
    message: 'O formato do id está incorreto.',
  })
  id?: string;

  @IsString({
    message: 'O título da categoria deve estar em formato de texto.',
  })
  @MinLength(3, {
    message: 'O título da categoria deve ter pelo menos 3 caracteres.',
  })
  @MaxLength(255, {
    message: 'O título da categoria deve ter no máximo 255 caracteres.',
  })
  @IsNotEmpty({
    message: 'Informe o nome da categoria',
  })
  title: string;

  @IsString({
    message: 'A descrição da categoria deve estar formato de texto.',
  })
  description?: string | null;
}
