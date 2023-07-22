import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './utils/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/httpExceptionFilter';
import { ExpressAdapter } from '@nestjs/platform-express';
import helmet from 'helmet';

import * as fs from 'fs';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.setGlobalPrefix('api');

  app.use(helmet());

  app.useGlobalFilters(new HttpExceptionFilter());

  if (process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  await app.init();

  http.createServer(server).listen(3000);

  if (process.env.NODE_ENV === 'production') {
    const privateKey = fs.readFileSync(
      process.env.SSL_PRIVATE_KEY_PATH,
      'utf8',
    );
    const certificate = fs.readFileSync(process.env.SSL_CERT_KEY_PATH, 'utf8');
    const httpsOptions = { key: privateKey, cert: certificate };
    https.createServer(httpsOptions, server).listen(8090);
  }
}
bootstrap();
