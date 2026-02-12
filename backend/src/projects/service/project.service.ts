import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
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

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['creator', 'tracks', 'comments'],
    });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id_project: id } as FindOptionsWhere<Project>,
      relations: ['creator', 'tracks', 'tracks.uploader'],
    });

    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }

    return project;
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const newProject = this.projectRepository.create({
      name: dto.name,
      description: dto.description,
      creator: { id_user: dto.creator } as User,
    });
    return this.projectRepository.save(newProject);
  }

  async update(id: number, dto: EditProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    this.projectRepository.merge(project, dto);
    return await this.projectRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }
}
