import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Track } from '../entity/track.entity';
import { CreateTrackDto } from '../dto/track-create.dto';
import { EditTrackDto } from '../dto/track-edit.dto';
import { Project } from '../../projects/entity/project.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async findAll(): Promise<Track[]> {
    return this.trackRepository.find({ relations: ['uploader', 'project'] });
  }

  async findOne(id: number): Promise<Track> {
    const track: Track | null = await this.trackRepository.findOne({
      where: { id_track: id } as FindOptionsWhere<Track>,
      relations: [
        'uploader',
        'project',
        'parent_track',
        'child_versions',
        'comments',
      ],
    });

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const newTrack = this.trackRepository.create({
      track_name: dto.track_name,
      version: dto.version,
      file_url: dto.file_url,
      project: { id_project: dto.project_id } as Project,
      uploader: { id_user: dto.uploader_id } as User,
      parent_track: dto.parent_track_id
        ? ({ id_track: dto.parent_track_id } as Track)
        : undefined,
    });

    return this.trackRepository.save(newTrack);
  }

  async update(id: number, dto: EditTrackDto): Promise<Track> {
    const track = await this.findOne(id);
    this.trackRepository.merge(track, dto);
    return this.trackRepository.save(track);
  }

  async remove(id: number): Promise<void> {
    const track = await this.findOne(id);
    await this.trackRepository.remove(track);
  }
}
