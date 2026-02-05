import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entity/project.entity';
import { CreateProjectDto } from '../dto/project-create.dto';
import { EditProjectDto } from '../dto/project-edit.dto';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['creator', 'tracks'] });
  }

  async findOne(id: number): Promise<Project | null> {
    return await this.projectRepository.findOne({
      where: { id_project: id },
      relations: ['creator', 'tracks'],
    });
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const newProject: Project = this.projectRepository.create({
      name: dto.name,
      description: dto.description,
      creator: { id_user: dto.creator } as User,
    });
    return this.projectRepository.save(newProject);
  }

  async update(id: number, dto: EditProjectDto): Promise<Project | null> {
    await this.projectRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOne(id);
    if (!project) throw new NotFoundException(`Project #${id} not found`);

    await this.projectRepository.remove(project);
  }
}
