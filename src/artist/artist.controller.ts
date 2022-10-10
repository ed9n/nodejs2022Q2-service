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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('artist')
@UseGuards(JwtAuthGuard)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @Header('Accept', 'application/json')
  async getAll() {
    return await this.artistService.getAll();
  }

  @Header('Accept', 'application/json')
  @Get(':id')
  async getById(@Param('id') id) {
    const artist = await this.artistService.getByid(id);

    return artist;
  }

  @Header('Accept', 'application/json')
  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Header('Accept', 'application/json')
  @Put(':id')
  async update(@Body() updateArtistDto: UpdateArtistDto, @Param('id') id) {
    const newArtist = await this.artistService.update(id, updateArtistDto);

    return newArtist;
  }

  @Header('Accept', 'application/json')
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id) {
    return await this.artistService.remove(id);
  }
}
