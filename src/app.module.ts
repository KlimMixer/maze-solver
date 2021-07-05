import { Module } from '@nestjs/common';
import { MazeModule } from './maze/maze.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MazeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
