import { NotFoundException } from '@nestjs/common';

class NotFoundCustomException extends NotFoundException {
  constructor(id: string) {
    super(`Não foi encontrado registro com o id: ${id}.`);
  }
}

export default NotFoundCustomException;
