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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Header('Accept', 'application/json')
  @Get()
  async getAll() {
    return await this.artistService.getAll();
  }

  @Header('Accept', 'application/json')
  @Get(':id')
  async getById(@Param('id') id) {
    const artist = await this.artistService.getByid(id);

    return artist;

    // if (validate(id) === false) {
    //   throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    // } else if (artist === undefined) {
    //   throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    // } else {
    //   return artist;
    // }
  }

  @Header('Accept', 'application/json')
  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Header('Accept', 'application/json')
  @Put(':id')
  async update(@Body() updateArtistDto: UpdateArtistDto, @Param('id') id) {
    // const artistId = this.artistService.getByid(id);
    const newArtist = await this.artistService.update(id, updateArtistDto);

    return newArtist;

    // if (validate(id) === false) {
    //   throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    // } else if (artistId === undefined) {
    //   throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    // } else {
    //   return newArtist;
    // }
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id) {
    // const artist = this.artistService.getByid(id);

    // if (validate(id) === false) {
    //   throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    // } else if (artist === undefined) {
    //   throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    // }
    return await this.artistService.remove(id);
  }
}
