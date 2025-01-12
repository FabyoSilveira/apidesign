import { Module } from '@nestjs/common';

import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieClientAdapter } from './movie.adapter';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { TmdbClientModule } from 'src/client/tmdb/tmdb.module';
import { MovieDomainMapper } from './mappper';
import { CircuitBreakerModule } from '../circuitBreaker/circuitBreaker.module';

@Module({
  imports: [ConfigModule, AuthModule, TmdbClientModule, CircuitBreakerModule],
  exports: [MovieService],
  controllers: [MovieController],
  providers: [MovieService, MovieClientAdapter, MovieDomainMapper],
})
export class MovieModule {}
