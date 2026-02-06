import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../entity/track.entity';
import { CreateTrackDto } from '../dto/track-create.dto';
import { Project } from '../../projects/entity/project.entity';
import { User } from '../../users/entities/user.entity';
import { EditTrackDto } from '../dto/track-edit.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

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

  findAll(): Promise<Track[]> {
    return this.trackRepository.find({
      relations: ['project', 'uploader', 'parent_track', 'child_versions'],
    });
  }

  async findOne(id: number): Promise<Track | null> {
    return this.trackRepository.findOne({
      where: { id_track: id },
      relations: ['project', 'uploader', 'comments', 'child_versions'],
    });
  }

  async update(id: number, dto: EditTrackDto): Promise<Track | null> {
    await this.trackRepository.update(id, dto as Track);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Track #${id} not found`);
    }
  }
}
