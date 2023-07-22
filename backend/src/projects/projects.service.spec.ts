import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { DbService } from '../db/db.service';
import { ConfigService } from '@nestjs/config';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, ProjectsService, DbService],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
