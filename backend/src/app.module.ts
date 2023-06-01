import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbProvider } from './db/db.provider';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { ProjectsModule } from './projects/projects.module';
import { ArtworksModule } from './artworks/artworks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    ArtworksModule,
  ],
  controllers: [AppController],
  providers: [AppService, dbProvider, UsersService, JwtAuthGuard, JwtService],
})
export class AppModule {}
