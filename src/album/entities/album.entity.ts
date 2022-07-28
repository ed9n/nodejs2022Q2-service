// import { TrackEntity } from 'src/track/entities/track.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToMany(() => TrackEntity, (track: TrackEntity) => track.album, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  track: TrackEntity;

  @OneToOne(() => ArtistEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    // eager: true,
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  artist: ArtistEntity;

  @Column({ nullable: true })
  artistId: string | null;
}
