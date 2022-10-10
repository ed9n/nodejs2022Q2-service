import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Header('Accept', 'application/json')
  @Get()
  async getAll() {
    return await this.favsService.getAll();
  }

  @Header('Accept', 'application/json')
  @Post('/artist/:id')
  async addArtist(@Param('id') id) {
    return this.favsService.addArtist(id);
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete('/artist/:id')
  async removeArtist(@Param('id') id) {
    return this.favsService.removeArtist(id);
  }

  @Header('Accept', 'application/json')
  @Post('/track/:id')
  async addTrack(@Param('id') id) {
    return this.favsService.addTrack(id);
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete('/track/:id')
  async removeTrack(@Param('id') id) {
    return this.favsService.removeTrack(id);
  }

  @Header('Accept', 'application/json')
  @Post('/album/:id')
  async addAlbum(@Param('id') id) {
    return this.favsService.addAlbum(id);
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete('/album/:id')
  async removeAlbum(@Param('id') id) {
    return this.favsService.removeAlbum(id);
  }
}
