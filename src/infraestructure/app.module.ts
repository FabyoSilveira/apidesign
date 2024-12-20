import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { Modules } from '../modules';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Clients } from 'src/client';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: seconds(30),
        limit: 10,
      },
    ]),
    ...Modules,
    ...Clients,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
