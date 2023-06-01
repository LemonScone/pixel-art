import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArtworksService } from './artworks.service';

@ApiTags('artworks')
@Controller('artworks')
export class ArtworksController {
  constructor(private readonly artworksService: ArtworksService) {}

  @Get()
  @ApiOperation({
    summary: 'ARTWORK에 게시된 project를 조회합니다.',
    description: 'isPublished가 true인 project를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 게시된 프로젝트만 조회했습니다.',
  })
  getArtWork() {
    return this.artworksService.getArtWorks();
  }
}
