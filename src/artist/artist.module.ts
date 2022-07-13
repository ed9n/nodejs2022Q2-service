import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { UserModule } from 'src/user/user.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [AlbumModule],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
