import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { JwtService } from '@nestjs/jwt';
import { DbService } from '../db/db.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, DbService, JwtService],
})
export class ProjectsModule {}
