import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from '../service/project.service';
import { CreateProjectDto } from '../dto/project-create.dto';
import { ProjectDto } from '../dto/project.dto';
import { ProjectMapper } from '../mappers/project.mapper';
import { EditProjectDto } from '../dto/project-edit.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  async create(@Body() dto: CreateProjectDto): Promise<ProjectDto> {
    const entity = await this.projectService.create(dto);
    return ProjectMapper.mapProjectEntityToDto(entity);
  }

  @Get()
  @ApiOperation({ summary: 'List all projects with metadata' })
  async findAll(): Promise<ProjectDto[]> {
    const entities = await this.projectService.findAll();
    return ProjectMapper.mapProjectEntitiesToDtos(entities);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get detailed project info' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectDto> {
    const entity = await this.projectService.findOneOrThrow(id);
    return ProjectMapper.mapProjectEntityToDto(entity);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project settings' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditProjectDto,
  ): Promise<ProjectDto> {
    const entity = await this.projectService.update(id, dto);
    return ProjectMapper.mapProjectEntityToDto(entity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project and all associated data' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projectService.remove(id);
  }
}
