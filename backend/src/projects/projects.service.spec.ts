import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { dbProvider } from '../db/db.provider';
import { ConfigService } from '@nestjs/config';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, ProjectsService, dbProvider],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
