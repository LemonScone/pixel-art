import { Test, TestingModule } from '@nestjs/testing';
import { ArtworksController } from './artworks.controller';

describe('ArtworksController', () => {
  let controller: ArtworksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtworksController],
    }).compile();

    controller = module.get<ArtworksController>(ArtworksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
