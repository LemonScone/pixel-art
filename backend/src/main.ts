import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './utils/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/httpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
