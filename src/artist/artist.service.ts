import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { v4 } from 'uuid';
import { Artist } from './artist';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  public arrayArtists: Artist[] = [];

  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  getAll() {
    return this.arrayArtists;
  }

  getByid(id: string) {
    return this.arrayArtists.find((el) => el.id === id);
  }

  create(createArtistDto: CreateArtistDto) {
    const artist = new Artist();

    artist.id = v4();
    artist.name = createArtistDto.name;
    artist.grammy = createArtistDto.grammy;
    this.arrayArtists.push(artist);
    return artist;
  }

  update(id, updateArtistDto: UpdateArtistDto) {
    return this.arrayArtists.find((el) => {
      if (el.id === id) {
        el.name = updateArtistDto.name;
        el.grammy = updateArtistDto.grammy;
        return el;
      }
    });
  }

  remove(id: string) {
    const artist = this.arrayArtists.find((el) => el.id === id);

    this.albumService.arrayAlbums.find((el) => {
      return (el.artistId = null);
    });

    this.trackService.arrayTracks.find((el) => {
      return (el.artistId = null);
    });

    const index = this.arrayArtists.indexOf(artist);

    if (index !== -1) {
      this.arrayArtists.splice(index, 1);
    }
  }
}
