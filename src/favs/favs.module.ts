import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { FavsEntity } from './entities/favs.entity';

import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavsEntity]),
    ArtistModule,
    AlbumModule,
    TrackModule,
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
