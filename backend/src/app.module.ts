import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ArtworksModule } from './artworks/artworks.module';
import { getEnvPath } from './envs/helper/env.helper';
import { resolve } from 'path';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';

const envFilePath = getEnvPath(`${resolve(__dirname, '../src')}/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    ArtworksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieParserMiddleware).forRoutes('*');
  }
}
