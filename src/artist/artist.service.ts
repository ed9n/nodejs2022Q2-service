import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4, validate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    public artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    const artists = await this.artistRepository.find();

    return artists.map((artist) => artist);
  }

  async getByid(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }

    const artist = await this.artistRepository.findOne({ where: { id: id } });

    if (!artist) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    } else {
      return artist;
    }
  }

  async create(createArtistDto: CreateArtistDto) {
    const createdArtist = this.artistRepository.create({
      id: v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });

    return await this.artistRepository.save(createdArtist);
  }

  async update(id, updateArtistDto: UpdateArtistDto) {
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

      return await this.artistRepository.save(updateArtist);
    }
  }

  async remove(id: string) {
    if (validate(id) === false) {
      throw new BadRequestException(`Is not uuid`);
    }
    const result = await this.artistRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    }
  }
}
