import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  artistId: string | null; // refers to Artist

  @Column()
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number

  toResponse() {
    const { id, name, artistId, albumId, duration } = this;
    return { id, name, artistId, albumId, duration };
  }
}
