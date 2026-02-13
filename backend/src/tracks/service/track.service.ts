import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../entity/track.entity';
import { CreateTrackDto } from '../dto/track-create.dto';
import { EditTrackDto } from '../dto/track-edit.dto';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entity/project.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async findOneOrThrow(id: number): Promise<Track> {
    const track = await this.trackRepository
      .createQueryBuilder('track')
      .leftJoinAndSelect('track.uploader', 'uploader')
      .leftJoinAndSelect('track.project', 'project')
      .leftJoinAndSelect('track.parent_track', 'parent')
      .leftJoinAndSelect('track.child_versions', 'children')
      .loadRelationCountAndMap('track.commentCount', 'track.comments')
      .where('track.id_track = :id', { id })
      .getOne();

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository
      .createQueryBuilder('track')
      .leftJoinAndSelect('track.uploader', 'uploader')
      .leftJoinAndSelect('track.project', 'project')
      .loadRelationCountAndMap('track.commentCount', 'track.comments')
      .orderBy('track.uploaded_at', 'DESC')
      .getMany();
  }

  async findAllByProject(id: number): Promise<Track[]> {
    return this.trackRepository
      .createQueryBuilder('track')
      .leftJoinAndSelect('track.uploader', 'uploader')
      .leftJoinAndSelect('track.project', 'project')
      .loadRelationCountAndMap('track.commentCount', 'track.comments')
      .where('track.id_project = :id', { id })
      .orderBy('track.uploaded_at', 'DESC')
      .getMany();
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const newTrack = this.trackRepository.create({
      track_name: dto.track_name,
      version: dto.version ?? 1.0,
      file_url: dto.file_url,
      duration: dto.duration ?? null,
      project: { id_project: dto.project_id } as Project,
      uploader: { id_user: dto.uploader_id } as User,
      parent_track: dto.parent_track_id
        ? ({ id_track: dto.parent_track_id } as Track)
        : null,
    });

    const saved = await this.trackRepository.save(newTrack);
    return this.findOneOrThrow(saved.id_track);
  }

  async update(id: number, dto: EditTrackDto): Promise<Track> {
    const track = await this.findOneOrThrow(id);
    this.trackRepository.merge(track, dto);
    await this.trackRepository.save(track);
    return this.findOneOrThrow(id);
  }

  async remove(id: number): Promise<void> {
    const track = await this.findOneOrThrow(id);
    await this.trackRepository.remove(track);
  }
}
