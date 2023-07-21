import { Module } from '@nestjs/common';
import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';
import { dbProvider } from '../db/db.provider';

@Module({
  controllers: [ArtworksController],
  providers: [ArtworksService, dbProvider],
})
export class ArtworksModule {}
