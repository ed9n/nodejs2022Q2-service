import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistService } from 'src/artist/artist.service';
// import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { v4, validate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    public albumRepository: Repository<AlbumEntity>,
    // private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
  ) {}

  async getAll() {
    const albums = await this.albumRepository.find();
    // const artist = await this.artistService.artistRepository.findOne({
    //   where: { id: albums.artistId },
    // });
    return albums.map((album) => {
      return album;
    });
  }

  async getByid(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const album = await this.albumRepository.findOne({ where: { id: id } });

    if (!album) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    } else {
      return album;
    }
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = this.albumRepository.create({
      id: v4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    });
    return await this.albumRepository.save(createdAlbum);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const updateAlbum = await this.albumRepository.findOne({
      where: { id: id },
    });

    if (!updateAlbum) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    } else {
      updateAlbum.name = updateAlbumDto.name;
      updateAlbum.year = updateAlbumDto.year;
      updateAlbum.artistId = updateAlbumDto.artistId;

      return await this.albumRepository.save(updateAlbum);
    }
  }

  async remove(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const result = await this.albumRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    }
  }
}
