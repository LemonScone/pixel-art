import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbProvider } from './db/db.provider';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ArtworksModule } from './artworks/artworks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ProjectsModule,
    ArtworksModule,
  ],
  controllers: [AppController],
  providers: [AppService, dbProvider],
})
export class AppModule {}
