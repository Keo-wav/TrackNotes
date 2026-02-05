import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from '../dto/project-create.dto';
import { ProjectService } from '../service/project.service';
import { EditProjectDto } from '../dto/project-edit.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create a musical project' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all band projects' })
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific project' })
  async findOne(@Param('id') id: string) {
    const project = await this.projectService.findOne(+id);
    if (!project) throw new NotFoundException(`Project #${id} not found`);
    return project;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit project metadata' })
  async update(
    @Param('id') id: string,
    @Body() editProjectDto: EditProjectDto,
  ) {
    const updated = await this.projectService.update(+id, editProjectDto);
    if (!updated) throw new NotFoundException(`Project #${id} not found`);
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  async remove(@Param('id') id: string) {
    return await this.projectService.remove(+id);
  }
}
