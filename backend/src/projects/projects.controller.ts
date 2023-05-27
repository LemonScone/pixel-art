import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.model';
import { CreateProjectDto } from './dto/create-dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateProjectDto } from './dto/update-dto';

@ApiTags('propjects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':id')
  @ApiOperation({
    summary: '개별 프로젝트 조회',
    description:
      '특정 id를 가진 프로젝트를 조회합니다. id는 unique하므로 한 건 조회입니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 프로젝트를 조회했습니다.',
    type: CreateProjectDto,
  })
  getProjectById(@Param('id') id: number): Promise<Project> {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  @ApiOperation({
    summary: '프로젝트 생성',
    description: '신규 project를 생성합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 프로젝트를 생성했습니다.',
  })
  createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.createProject(createProjectDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '프로젝트 수정',
    description: 'project를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 프로젝트를 수정했습니다.',
  })
  updateProject(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '개별 프로젝트 삭제',
    description: '특정 id를 가진 프로젝트를 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 프로젝트를 삭제했습니다.',
  })
  deleteProject(@Param('id') id: number) {
    return this.projectsService.deleteProject(id);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: '게시여부 수정',
    description: 'project의 isPublished를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '성공적으로 게시여부를 수정했습니다.',
  })
  updatePulishStatus(@Param('id') id: number, @Body('status') status: boolean) {
    return this.projectsService.updatePulishStatus(id, status);
  }
}
