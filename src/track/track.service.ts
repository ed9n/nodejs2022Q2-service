import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async getAll() {
    const tracks = await this.trackRepository.find();

    return tracks.map((track) => track.toResponse());
  }

  async getByid(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const track = await this.trackRepository.findOne({ where: { id: id } });

    if (!track) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    } else {
      return track.toResponse();
    }
  }

  async create(createTrackDto: CreateTrackDto) {
    const createdTrack = this.trackRepository.create({
      id: v4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    });

    return (await this.trackRepository.save(createdTrack)).toResponse();
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

      return await (await this.trackRepository.save(updateTrack)).toResponse();
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
