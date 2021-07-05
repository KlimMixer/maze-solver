import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MazeController } from './maze.controller';
import { MazeService } from './maze.service';

@Module({
  imports: [ConfigModule],
  controllers: [MazeController],
  providers: [MazeService],
})
export class MazeModule {}
