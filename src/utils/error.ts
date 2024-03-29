import { HttpStatus } from '@nestjs/common';
import { CustomException } from '../exceptions';
import { RESPONSE_MESSAGE } from '../common/objects';

export const getStatusByPrismaExceptionCode = (code: string): number => {
  let status: number = HttpStatus.INTERNAL_SERVER_ERROR;

  switch (code) {
    case 'P2025':
      status = HttpStatus.NOT_FOUND;
      break;
  }

  return status;
};

export const customError = (statusCode: number, message: string) => {
  return new CustomException(statusCode, message);
};

export const internalServerError = () => {
  return new CustomException(
    HttpStatus.INTERNAL_SERVER_ERROR,
    RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
  );
};

export const badRequest = () => {
  return new CustomException(
    HttpStatus.BAD_REQUEST,
    RESPONSE_MESSAGE.BAD_REQUEST,
  );
};

export const forbidden = () => {
  return new CustomException(HttpStatus.FORBIDDEN, RESPONSE_MESSAGE.FORBIDDEN);
};

export const notFound = () => {
  return new CustomException(HttpStatus.NOT_FOUND, RESPONSE_MESSAGE.NOT_FOUND);
};
