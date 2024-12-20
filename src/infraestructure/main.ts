import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  //Activate pipe that validate data on entry with class validator
  app.useGlobalPipes(new ValidationPipe());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  //Config SWAGGER Auto documentation
  const config = new DocumentBuilder()
    .setTitle('API Design')
    .setDescription('API Example to learn how to design an API.')
    .setVersion('1.0')
    .addTag('apidesign')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(configService.get<string>('PORT') ?? 3000);
  console.log(
    'Listening requests on port: ',
    configService.get<string>('PORT'),
  );
}
bootstrap();
