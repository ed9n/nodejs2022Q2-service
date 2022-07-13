import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Album } from './album';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  public arrayAlbums: Album[] = [];

  getAll() {
    return this.arrayAlbums.map((el) => {
      return el;
    });
  }

  getByid(id: string) {
    return this.arrayAlbums.find((el) => el.id === id);
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album = new Album();

    album.id = v4();
    album.name = createAlbumDto.name;
    album.year = createAlbumDto.year;
    album.artistId = createAlbumDto.artistId;

    this.arrayAlbums.push(album);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.arrayAlbums.find((el) => {
      if (el.id === id) {
        el.name = updateAlbumDto.name;
        el.year = updateAlbumDto.year;
        el.artistId = updateAlbumDto.artistId;

        return el;
      }
    });
  }

  remove(id: string) {
    const artist = this.arrayAlbums.find((el) => el.id === id);

    const index = this.arrayAlbums.indexOf(artist);

    if (index !== -1) {
      this.arrayAlbums.splice(index, 1);
    }
  }
}
