import { Test, TestingModule } from '@nestjs/testing';
import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';
import { dbProvider } from '../db/db.provider';
import { ConfigService } from '@nestjs/config';

describe('ArtworksController', () => {
  let controller: ArtworksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtworksController],
      providers: [ArtworksService, dbProvider, ConfigService],
    }).compile();

    controller = module.get<ArtworksController>(ArtworksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
