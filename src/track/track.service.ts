import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { Repository } from 'typeorm';
import { v4, validate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    public trackRepository: Repository<TrackEntity>,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  async getAll() {
    const tracks = await this.trackRepository.find();

    return tracks.map((track) => {
      return track;
    });
  }

  async getByid(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const track = await this.trackRepository.findOne({ where: { id: id } });

    if (!track) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    } else {
      return track;
    }
  }

  async create(createTrackDto: CreateTrackDto) {
    const createdTrack = this.trackRepository.create({
      name: createTrackDto.name,
      albumId: createTrackDto.albumId,
      artistId: createTrackDto.artistId,
      duration: createTrackDto.duration,
    });

    return await this.trackRepository.save(createdTrack);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }
    const updateTrack = await this.trackRepository.findOne({
      where: { id: id },
    });

    if (!updateTrack) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    } else {
      updateTrack.name = updateTrackDto.name;
      updateTrack.artistId = updateTrackDto.artistId;
      updateTrack.albumId = updateTrackDto.albumId;
      updateTrack.duration = updateTrackDto.duration;

      return await this.trackRepository.save(updateTrack);
    }
  }

  async remove(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const result = await this.trackRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    }
  }
}
