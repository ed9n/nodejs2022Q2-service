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
    console.log(this.favs);
    return this.favs;
  }

  getByidArtist(id: string) {
    return this.artistService.arrayArtists.find((el) => el.id === id);
  }

  addArtist(id: string) {
    const artist = this.artistService.arrayArtists.find((el) => {
      if (el.id === id) {
        return el;
      }
    });

    this.favs.artists.push(artist);

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
    return this.trackService.arrayTracks.find((el) => el.id === id);
  }

  addTrack(id: string) {
    const track = this.trackService.arrayTracks.find((el) => {
      if (el.id === id) {
        return el;
      }
    });

    this.favs.tracks.push(track);

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
    return this.albumService.arrayAlbums.find((el) => el.id === id);
  }
  addAlbum(id: string) {
    const album = this.albumService.arrayAlbums.find((el) => {
      if (el.id === id) {
        return el;
      }
    });

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
