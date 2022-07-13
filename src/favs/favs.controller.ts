import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { validate } from 'uuid';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Header('Accept', 'application/json')
  @Get()
  async getAll() {
    return this.favsService.getAll();
  }

  @Header('Accept', 'application/json')
  @Post('/artist/:id')
  async addArtist(@Param('id') id) {
    const artist = this.favsService.getByidArtist(id);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (artist === undefined) {
      throw new HttpException('ID not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return this.favsService.addArtist(id);
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete('/artist/:id')
  async removeArtist(@Param('id') id) {
    const artist = this.favsService.getByidArtist(id);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (artist === undefined) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }
    return this.favsService.removeArtist(id);
  }

  @Header('Accept', 'application/json')
  @Post('/track/:id')
  async addTrack(@Param('id') id) {
    const track = this.favsService.getByidTrack(id);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (track === undefined) {
      throw new HttpException('ID not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return this.favsService.addTrack(id);
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete('/track/:id')
  async removeTrack(@Param('id') id) {
    const track = this.favsService.getByidTrack(id);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (track === undefined) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }
    return this.favsService.removeTrack(id);
  }

  @Header('Accept', 'application/json')
  @Post('/album/:id')
  async addAlbum(@Param('id') id) {
    const album = this.favsService.getByidAlbum(id);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (album === undefined) {
      throw new HttpException('ID not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return this.favsService.addAlbum(id);
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete('/album/:id')
  async removeAlbum(@Param('id') id) {
    const album = this.favsService.getByidAlbum(id);

    if (validate(id) === false) {
      throw new HttpException('Is not uuid', HttpStatus.BAD_REQUEST);
    } else if (album === undefined) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }
    return this.favsService.removeAlbum(id);
  }
}
