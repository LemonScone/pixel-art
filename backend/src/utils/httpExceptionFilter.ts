import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    Logger.error(exception.message);

    const status = exception?.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const res: any = exception.getResponse();

    response.status(status).json({
      success: false,
      message: res.message,
    });
  }
}
