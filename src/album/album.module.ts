import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), ArtistModule],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
