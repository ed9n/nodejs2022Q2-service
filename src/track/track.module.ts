import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { AlbumService } from 'src/album/album.service';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackEntity } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity]), AlbumModule, ArtistModule],
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
