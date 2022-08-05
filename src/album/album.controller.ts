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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
@UseGuards(JwtAuthGuard)
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
  }

  @Header('Accept', 'application/json')
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Header('Accept', 'application/json')
  @Put(':id')
  async update(@Body() updateAlbumDto: UpdateAlbumDto, @Param('id') id) {
    const newAlbum = await this.albumService.update(id, updateAlbumDto);

    return newAlbum;
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.albumService.remove(id);
  }
}
