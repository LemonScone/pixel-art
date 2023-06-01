import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { dbProvider } from 'src/db/db.provider';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, dbProvider, JwtService],
})
export class ProjectsModule {}
