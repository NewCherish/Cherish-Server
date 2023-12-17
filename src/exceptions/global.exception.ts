import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { getStatusByPrismaExceptionCode } from 'src/utils/error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = (exception as any).message;

    if (exception instanceof HttpException) {
      status = (exception as HttpException).getStatus();
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = getStatusByPrismaExceptionCode(exception.code);
      message = exception.meta.cause;
    }
    this.logger.error({ error: exception });

    response.status(status).json({
      statusCode: status,
      success: false,
      message,
    });
  }
}
