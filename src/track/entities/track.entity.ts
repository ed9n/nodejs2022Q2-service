import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @OneToOne(() => AlbumEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'albumId' })
  album: string;

  @Column({ nullable: true })
  albumId: string | null;

  @OneToOne(() => ArtistEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'artistId' })
  artist: string;

  @Column({ nullable: true })
  artistId: string | null;
}
