import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Esta funcion permite activar las validaciones definidas con
   * class-validator y class-transformer en todos los endpoints de
   * nuestra API
   */
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
