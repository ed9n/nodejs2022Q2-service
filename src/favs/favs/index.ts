import { Album } from 'src/album/album';
import { Artist } from 'src/artist/artist';
import { Track } from 'src/track/track';

export class Favs {
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
}
