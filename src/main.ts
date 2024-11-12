import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Activate pipe that validate data on entry with class validator
  app.useGlobalPipes(new ValidationPipe());

  //Config SWAGGER Auto documentation
  const config = new DocumentBuilder()
    .setTitle('API Design')
    .setDescription('API Example to learn how to design an API.')
    .setVersion('1.0')
    .addTag('apidesign')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log('Listening requests on port: ', process.env.PORT);
}
bootstrap();
