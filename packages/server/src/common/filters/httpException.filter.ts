import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : (exception as any).status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    let message =
      (exception as any)?.message ??
      (exception as any)?.response?.message ??
      'Erro interno do servidor.';

    switch (exception.constructor) {
      case UnprocessableEntityException:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = exception;
        break;
      case QueryFailedError:
        status = HttpStatus.BAD_REQUEST;
        message = (exception as QueryFailedError).message;
        break;
      case EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        message = (exception as EntityNotFoundError).message;
        break;
      case CannotCreateEntityIdMapError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        break;
    }

    response.status(status).json({
      status: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

export interface IResponseHttp {
  status: number;
  message: string;
  timestamp?: string;
  path?: string;
}
