import { HttpException } from '@nestjs/common';

export default class CustomException extends HttpException {
  public statusCode: number = 0;
  public message: string = '';
  public success: boolean = false;

  constructor(status: number, message: string, success?: boolean) {
    super(message, status);
    this.statusCode = status;
    this.message = message;
    this.success = success;
  }
}
