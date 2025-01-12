import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { CircuitBreakerInterceptor } from '../../modules/circuitBreaker/circuitBreaker.interceptor';

export function UseCircuitBreaker() {
  return applyDecorators(UseInterceptors(CircuitBreakerInterceptor));
}
