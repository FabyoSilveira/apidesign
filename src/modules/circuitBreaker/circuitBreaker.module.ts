import { Module } from '@nestjs/common';
import { CircuitBreakerService } from './circuitBreaker.service';
import { CircuitBreakerInterceptor } from './circuitBreaker.interceptor';

@Module({
  providers: [CircuitBreakerService, CircuitBreakerInterceptor],
  exports: [CircuitBreakerService],
})
export class CircuitBreakerModule {}
