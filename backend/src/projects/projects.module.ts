import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { dbProvider } from 'src/db/db.provider';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, dbProvider],
})
export class ProjectsModule {}
