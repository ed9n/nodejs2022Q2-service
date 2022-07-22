import { Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import { Favs } from './favs';

@Injectable()
export class FavsService {
  constructor(
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  favs = new Favs();

  async getAll() {
    return this.favs;
  }

  getByidArtist(id: string) {
    return this.artistService.getByid(id);
  }

  addArtist(id: string) {
    const artist = this.artistService.getByid(id);

    // this.favs.artists.push(artist);

    return artist;
  }

  removeArtist(id: string) {
    const artist = this.favs.artists.find((el) => el.id === id);

    const index = this.favs.artists.indexOf(artist);

    if (index !== -1) {
      this.favs.artists.splice(index, 1);
    }
  }

  getByidTrack(id: string) {
    return this.trackService.getByid(id);
  }

  addTrack(id: string) {
    const track = this.trackService.getByid(id);

    // this.favs.tracks.push(track);

    return track;
  }

  removeTrack(id: string) {
    const track = this.favs.tracks.find((el) => el.id === id);

    const index = this.favs.tracks.indexOf(track);

    if (index !== -1) {
      this.favs.tracks.splice(index, 1);
    }
  }

  getByidAlbum(id: string) {
    return this.albumService.getByid(id);
  }

  addAlbum(id: string) {
    const album = this.albumService.getByid(id);

    this.favs.albums.push(album);

    return album;
  }

  removeAlbum(id: string) {
    const album = this.favs.albums.find((el) => el.id === id);

    const index = this.favs.albums.indexOf(album);

    if (index !== -1) {
      this.favs.albums.splice(index, 1);
    }
  }
}
