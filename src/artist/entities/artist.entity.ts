// import { FavsEntity } from 'src/favs/entities';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean; // integer number

  @OneToMany(() => TrackEntity, (track: TrackEntity) => track.artist, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  track: TrackEntity;

  @OneToMany(() => AlbumEntity, (album: AlbumEntity) => album.artist, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;
}
