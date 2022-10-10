import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { validate } from 'uuid';
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
    const track = this.trackService.getByid(id);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (track === undefined) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    } else {
      return track;
    }
  }

  @Header('Accept', 'application/json')
  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Header('Accept', 'application/json')
  @Put(':id')
  async update(@Body() updateTrackDto: UpdateTrackDto, @Param('id') id) {
    const trackId = this.trackService.getByid(id);
    const newTrack = this.trackService.update(id, updateTrackDto);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (trackId === undefined) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    } else {
      return newTrack;
    }
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id) {
    const track = this.trackService.getByid(id);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (track === undefined) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }
    return this.trackService.remove(id);
  }
}
