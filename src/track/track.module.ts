import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
