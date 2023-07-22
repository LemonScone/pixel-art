import { Test, TestingModule } from '@nestjs/testing';
import { ArtworksService } from './artworks.service';
import { dbProvider } from '../db/db.provider';
import { ConfigService } from '@nestjs/config';

describe('ArtworksService', () => {
  let service: ArtworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, ArtworksService, dbProvider],
    }).compile();

    service = module.get<ArtworksService>(ArtworksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
