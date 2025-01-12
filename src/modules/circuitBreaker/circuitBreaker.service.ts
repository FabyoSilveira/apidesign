import { Injectable } from '@nestjs/common';
import * as CircuitBreaker from 'opossum';

@Injectable()
export class CircuitBreakerService {
  private breakers = new Map<string, CircuitBreaker>();

  getBreaker(key: string, action: Function, options?: CircuitBreaker.Options) {
    if (!this.breakers.has(key)) {
      const breaker = new CircuitBreaker(action, {
        timeout: 5000,
        errorThresholdPercentage: 60, // error percentage
        resetTimeout: 10000, // Turn to half-open and test accepting some new requests
        rollingCountBuckets: 10,
        rollingCountTimeout: 10000,
        volumeThreshold: 5,
        ...options,
      });

      // Monitoring
      breaker.on('open', () =>
        console.log(`[CircuitBreaker] Circuito "${key}" abriu.`),
      );
      breaker.on('close', () =>
        console.log(`[CircuitBreaker] Circuito "${key}" fechou.`),
      );
      breaker.on('halfOpen', () =>
        console.log(`[CircuitBreaker] Circuito "${key}" meio-aberto.`),
      );

      this.breakers.set(key, breaker);
    }

    return this.breakers.get(key);
  }
}
