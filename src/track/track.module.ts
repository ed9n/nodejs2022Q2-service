import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
