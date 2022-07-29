import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { FavsEntity } from './entities/favs.entity';

@Injectable()
export class FavsService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,

    @InjectRepository(FavsEntity)
    private favsRepository: Repository<FavsEntity>,
  ) {}

  async getAll() {
    const favs = await this.favsRepository.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });

    return { ...favs };
  }

  async addArtist(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const artist = await this.artistService.artistRepository.findOne({
      where: { id: id },
    });

    if (!artist) {
      throw new HttpException('ID not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    let favorite = await this.favsRepository.findOne({
      where: {},
    });

    if (!favorite) {
      favorite = new FavsEntity();
    }
    if (!favorite.artists) {
      favorite.artists = [];
    }

    favorite.artists.push(artist);

    return await this.favsRepository.save(favorite);
  }

  async removeArtist(id: string) {
    const artist = await this.getAll();

    const index = artist.artists.findIndex((el) => el.id === id);

    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    } else if (index === -1) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }

    artist.artists.splice(index);

    await this.favsRepository.save(artist);
  }

  async addTrack(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }
    const track = await this.trackService.trackRepository.findOne({
      where: { id: id },
    });

    if (!track) {
      throw new HttpException('ID not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    let favorite = await this.favsRepository.findOne({
      where: {},
    });

    if (!favorite) {
      favorite = new FavsEntity();
    }
    if (!favorite.tracks) {
      favorite.tracks = [];
    }

    favorite.tracks.push(track);

    return await this.favsRepository.save(favorite);
  }

  async removeTrack(id: string) {
    const track = await this.getAll();

    const index = track.tracks.findIndex((el) => el.id === id);

    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    } else if (index === -1) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }

    track.tracks.splice(index);

    await this.favsRepository.save(track);
  }

  async addAlbum(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }
    const album = await this.albumService.albumRepository.findOne({
      where: { id: id },
    });
    if (!album) {
      throw new HttpException('ID not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    let favorite = await this.favsRepository.findOne({
      where: {},
    });

    if (!favorite) {
      favorite = new FavsEntity();
    }
    if (!favorite.albums) {
      favorite.albums = [];
    }

    favorite.albums.push(album);

    return await this.favsRepository.save(favorite);
  }

  async removeAlbum(id: string) {
    const album = await this.getAll();

    const index = album.albums.findIndex((el) => el.id === id);

    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    } else if (index === -1) {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }

    album.albums.splice(index);

    await this.favsRepository.save(album);
  }
}
