import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TmdbClient } from './tmdb.client';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
  providers: [TmdbClient],
  exports: [TmdbClient],
})
export class TmdbClientModule {}
