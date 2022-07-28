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

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Header('Accept', 'application/json')
  @HttpCode(200)
  @Get()
  async getAll() {
    return await this.albumService.getAll();
  }

  @Header('Accept', 'application/json')
  @Get(':id')
  async getById(@Param('id') id) {
    const album = await this.albumService.getByid(id);
    return album;
    // if (validate(id) === false) {
    //   throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    // } else if (album === undefined) {
    //   throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    // } else {
    //   return album;
    // }
  }

  @Header('Accept', 'application/json')
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Header('Accept', 'application/json')
  @Put(':id')
  async update(@Body() updateAlbumDto: UpdateAlbumDto, @Param('id') id) {
    // const albumId = this.albumService.getByid(id);
    const newAlbum = await this.albumService.update(id, updateAlbumDto);

    return newAlbum;

    // if (validate(id) === false) {
    //   throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    // } else if (albumId === undefined) {
    //   throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    // } else {
    //   return newAlbum;
    // }
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id) {
    // const album = this.albumService.getByid(id);

    // if (validate(id) === false) {
    //   throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    // } else if (album === undefined) {
    //   throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    // }
    return await this.albumService.remove(id);
  }
}
