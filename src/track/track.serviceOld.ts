// import { Injectable } from '@nestjs/common';
// import { v4 } from 'uuid';
// import { CreateTrackDto } from './dto/create-track.dto';
// import { UpdateTrackDto } from './dto/update-track.dto';
// import { Track } from './track';

// @Injectable()
// export class TrackService {
//   public arrayTracks: Track[] = [];

//   getAll() {
//     return this.arrayTracks.map((el) => {
//       return el;
//     });
//   }

//   getByid(id: string) {
//     return this.arrayTracks.find((el) => el.id === id);
//   }

//   create(createTrackDto: CreateTrackDto) {
//     const track = new Track();

//     track.id = v4();
//     track.name = createTrackDto.name;
//     track.artistId = createTrackDto.artistId;
//     track.albumId = createTrackDto.albumId;
//     track.duration = createTrackDto.duration;

//     this.arrayTracks.push(track);
//     return track;
//   }

//   update(id: string, updateTrackDto: UpdateTrackDto) {
//     return this.arrayTracks.find((el) => {
//       if (el.id === id) {
//         el.name = updateTrackDto.name;
//         el.artistId = updateTrackDto.artistId;
//         el.albumId = updateTrackDto.albumId;
//         el.duration = updateTrackDto.duration;

//         return el;
//       }
//     });
//   }

//   remove(id: string) {
//     const artist = this.arrayTracks.find((el) => el.id === id);

//     const index = this.arrayTracks.indexOf(artist);

//     if (index !== -1) {
//       this.arrayTracks.splice(index, 1);
//     }
//   }
// }
