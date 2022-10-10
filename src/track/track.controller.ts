import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Header('Accept', 'application/json')
  @Get()
  async getAll() {
    return this.trackService.getAll();
  }

  @Header('Accept', 'application/json')
  @Get(':id')
  async getById(@Param('id') id) {
    const track = await this.trackService.getByid(id);

    return track;
  }

  @Header('Accept', 'application/json')
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Header('Accept', 'application/json')
  @Put(':id')
  async update(@Body() updateTrackDto: UpdateTrackDto, @Param('id') id) {
    const newTrack = await this.trackService.update(id, updateTrackDto);

    return newTrack;
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.trackService.remove(id);
  }
}
