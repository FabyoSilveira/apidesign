import { Module } from '@nestjs/common';

import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieClient } from './movie.client';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.get<string>('TMDB_API_BASE_URI'),
        timeout: 10000,
        headers: {
          Authorization: `Bearer ${configService.get<string>('TMDB_ACCESS_TOKEN')}`,
        },
      }),
    }),
  ],
  exports: [MovieService],
  controllers: [MovieController],
  providers: [MovieService, MovieClient],
})
export class MovieModule {}
