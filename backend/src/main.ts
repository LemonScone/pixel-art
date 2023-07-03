import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './utils/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/httpExceptionFilter';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(helmet());

  app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter());

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
