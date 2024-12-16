import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  HttpStatus,
  CallHandler,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          throw error;
        }

        const response = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          data: {
            message: 'An unexpected error occurred.',
            error: error.message,
          },
        };

        throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
      }),
    );
  }
}
