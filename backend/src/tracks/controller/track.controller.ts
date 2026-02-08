import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
  @ApiResponse({ status: 201, type: Track })
  create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks across all projects' })
  findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single track by its ID' })
  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({ status: 404, description: 'Track not found' })
  getById(@Param('id', ParseIntPipe) id: number): Promise<Track> {
    return this.trackService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update track metadata' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editTrackDto: EditTrackDto,
  ): Promise<Track> {
    return this.trackService.update(id, editTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a track' })
  @ApiResponse({ status: 200, description: 'Track deleted successfully' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.trackService.remove(id);
    return { message: `Track #${id} has been deleted` };
  }
}
