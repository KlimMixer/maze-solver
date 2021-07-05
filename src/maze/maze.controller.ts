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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('maze')
@Controller('maze')
export class MazeController {
  constructor(private readonly mazeService: MazeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(MazeValidationPipe)
  @ApiBody({ type: MazeDto })
  @ApiOkResponse({
    status: 200,
    description:
      'Maze have solution and shortest path have distance equal to stepsToPass',
    type: MazeSolutionEntityRO,
  })
  @ApiBadRequestResponse({
    description:
      'Maze not passed validation. Reason of validation error at message param.',
  })
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
