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

  /**
   * Helper to fetch project with metadata (counts)
   */
  async findOneOrThrow(id: number): Promise<Project> {
    const project = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.creator', 'creator')
      .loadRelationCountAndMap('project.trackCount', 'project.tracks')
      .loadRelationCountAndMap('project.commentCount', 'project.comments')
      .where('project.id_project = :id', { id })
      .getOne();

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.creator', 'creator')
      .loadRelationCountAndMap('project.trackCount', 'project.tracks')
      .loadRelationCountAndMap('project.commentCount', 'project.comments')
      .getMany();
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const newProject = this.projectRepository.create({
      name: dto.name,
      description: dto.description,
      picture: dto.picture,
      creator: { id_user: dto.creator_id } as User,
    });

    const saved = await this.projectRepository.save(newProject);
    return this.findOneOrThrow(saved.id_project);
  }

  async update(id: number, dto: EditProjectDto): Promise<Project> {
    const project = await this.findOneOrThrow(id);
    this.projectRepository.merge(project, dto);
    await this.projectRepository.save(project);
    return this.findOneOrThrow(id);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOneOrThrow(id);
    await this.projectRepository.remove(project);
  }
}
