import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { JwtService } from '@nestjs/jwt';
import { ProjectsService } from './projects.service';
import { DbService } from '../db/db.service';
import { ConfigService } from '@nestjs/config';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [ConfigService, ProjectsService, JwtService, DbService],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
