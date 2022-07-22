import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { v4, validate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,

    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    const artists = await this.artistRepository.find();

    return artists.map((artist) => artist.toResponse());
  }

  async getByid(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const artist = await this.artistRepository.findOne({ where: { id: id } });

    if (!artist) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    } else {
      return artist.toResponse();
    }
  }

  async create(createArtistDto: CreateArtistDto) {
    // const artist = new Artist();

    // artist.id = v4();
    // artist.name = createArtistDto.name;
    // artist.grammy = createArtistDto.grammy;
    // this.arrayArtists.push(artist);
    // return artist;

    const createdArtist = this.artistRepository.create({
      id: v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });

    return (await this.artistRepository.save(createdArtist)).toResponse();
  }

  async update(id, updateArtistDto: UpdateArtistDto) {
    // return this.arrayArtists.find((el) => {
    //   if (el.id === id) {
    // el.name = updateArtistDto.name;
    // el.grammy = updateArtistDto.grammy;
    //     return el;
    //   }
    // });

    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }
    const updateArtist = await this.artistRepository.findOne({
      where: { id: id },
    });

    if (!updateArtist) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    } else {
      updateArtist.name = updateArtistDto.name;
      updateArtist.grammy = updateArtistDto.grammy;

      return await updateArtist.toResponse();
    }
  }

  async remove(id: string) {
    // const artist = this.arrayArtists.find((el) => el.id === id);

    // this.albumService.arrayAlbums.find((el) => {
    //   return (el.artistId = null);
    // });

    // this.trackService.arrayTracks.find((el) => {
    //   return (el.artistId = null);
    // });

    // const index = this.arrayArtists.indexOf(artist);

    // if (index !== -1) {
    //   this.arrayArtists.splice(index, 1);
    // }

    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const result = await this.artistRepository.delete(id);
    const deletedTrack = await this.trackService.trackRepository.find();
    deletedTrack.map((track) => {
      track.artistId = null;
    });

    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    }
  }
}
