import { Test, TestingModule } from '@nestjs/testing';
import { ArtworksService } from './artworks.service';
import { ConfigService } from '@nestjs/config';
import { DbService } from '../db/db.service';

describe('ArtworksService', () => {
  let service: ArtworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, ArtworksService, DbService],
    }).compile();

    service = module.get<ArtworksService>(ArtworksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
