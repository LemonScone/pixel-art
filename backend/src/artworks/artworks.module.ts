import { Module } from '@nestjs/common';
import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';
import { DbService } from '../db/db.service';

@Module({
  controllers: [ArtworksController],
  providers: [ArtworksService, DbService],
})
export class ArtworksModule {}
