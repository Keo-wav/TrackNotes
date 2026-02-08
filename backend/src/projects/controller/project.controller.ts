import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectService } from '../service/project.service';
import { Project } from '../entity/project.entity';
import { CreateProjectDto } from '../dto/project-create.dto';
import { EditProjectDto } from '../dto/project-edit.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new musical project' })
  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created.',
    type: Project,
  })
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all projects' })
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get project details, including creator and tracks',
  })
  @ApiResponse({ status: 200, type: Project })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project metadata' })
  @ApiResponse({ status: 200, type: Project })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editProjectDto: EditProjectDto,
  ): Promise<Project> {
    return this.projectService.update(id, editProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project and its associated data' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully.' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.projectService.remove(id);
    return {
      message: `Project #${id} and its associated tracks have been removed.`,
    };
  }
}
