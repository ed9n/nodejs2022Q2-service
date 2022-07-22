import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  grammy: boolean; // integer number

  toResponse() {
    const { id, name, grammy } = this;
    return { id, name, grammy };
  }
}
