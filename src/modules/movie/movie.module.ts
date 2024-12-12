import { Module } from '@nestjs/common';

import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieClient } from './movie.client';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  exports: [MovieService],
  controllers: [MovieController],
  providers: [MovieService, MovieClient],
})
export class MovieModule {}
