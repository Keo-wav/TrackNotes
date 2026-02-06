import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TrackService } from '../service/track.service';
import { CreateTrackDto } from '../dto/track-create.dto';
import { Track } from '../entity/track.entity';
import { EditTrackDto } from '../dto/track-edit.dto';

@ApiTags('tracks')
@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a new track or a new version' })
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks across all projects' })
  async findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single track by its ID' })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Track> {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    return track;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update track in case of mistake' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editTrackDto: EditTrackDto,
  ): Promise<Track> {
    const updatedTrack = await this.trackService.update(id, editTrackDto);

    if (!updatedTrack) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    return updatedTrack;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a track' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.trackService.remove(id);
    return { message: `Track #${id} has been deleted` };
  }
}
