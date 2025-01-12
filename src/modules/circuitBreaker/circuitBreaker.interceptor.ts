import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, firstValueFrom, from, map } from 'rxjs';
import { CircuitBreakerService } from './circuitBreaker.service';

@Injectable()
export class CircuitBreakerInterceptor implements NestInterceptor {
  constructor(private readonly circuitBreakerService: CircuitBreakerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controllerName = context.getClass().name;
    const routeName = context.getHandler().name;

    const circuitKey = `${controllerName}.${routeName}`;

    const breaker = this.circuitBreakerService.getBreaker(circuitKey, () =>
      firstValueFrom(from(next.handle())),
    );

    return from(
      breaker
        .fire()
        .then((result) => result)
        .catch((err) => {
          if (breaker.opened) {
            throw new BadGatewayException(
              'Serviço temporariamente indisponível.',
            );
          }
          throw err;
        }),
    ).pipe(map((response) => response));
  }
}
