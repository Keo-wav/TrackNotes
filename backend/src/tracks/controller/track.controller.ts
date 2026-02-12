import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TrackService } from '../service/track.service';
import { TrackMapper } from '../mappers/track.mapper';
import { TrackDto } from '../dto/track.dto';
import { CreateTrackDto } from '../dto/track-create.dto';
import { EditTrackDto } from '../dto/track-edit.dto';

@ApiTags('tracks')
@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a new track or a new version' })
  async create(@Body() dto: CreateTrackDto): Promise<TrackDto> {
    const track = await this.trackService.create(dto);
    return TrackMapper.mapTrackEntityToDto(track);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  async findAll(): Promise<TrackDto[]> {
    const tracks = await this.trackService.findAll();
    return TrackMapper.mapTrackEntitiesToDtos(tracks);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a track with full version history and comment count',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TrackDto> {
    const track = await this.trackService.findOneOrThrow(id);
    return TrackMapper.mapTrackEntityToDto(track);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update track info' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditTrackDto,
  ): Promise<TrackDto> {
    const track = await this.trackService.update(id, dto);
    return TrackMapper.mapTrackEntityToDto(track);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a track' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.trackService.remove(id);
  }
}
