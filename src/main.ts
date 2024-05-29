import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalRoute } from './shared/constants';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({transform: true}))
  app.setGlobalPrefix(GlobalRoute.PREFIX);
  await app.listen(process.env.PORT);
}
bootstrap();
