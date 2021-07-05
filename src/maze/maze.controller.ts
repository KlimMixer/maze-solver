import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { MazeSolutionEntityRO } from './entities';
import { MazeService } from './maze.service';
import { MazeDto } from './dto';
import { MazeValidationPipe } from './pipes';

@Controller('maze')
export class MazeController {
  constructor(private readonly mazeService: MazeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(MazeValidationPipe)
  async solveMaze(@Body() solveMaze: MazeDto): Promise<MazeSolutionEntityRO> {
    try {
      const stepsToPass = await this.mazeService.countMinimumStepsToPassMaze(
        solveMaze,
      );

      return { stepsToPass };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
