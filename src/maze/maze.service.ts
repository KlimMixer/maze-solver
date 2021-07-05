import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MazeSolver, QueueNode, Node } from '../../libs/maze-solver';
import { MazeDto } from './dto';

@Injectable()
export class MazeService {
  constructor(private readonly configService: ConfigService) {}

  public async countMinimumStepsToPassMaze(mazeDto: MazeDto): Promise<number> {
    const { maze } = mazeDto;

    const mazeSolver: MazeSolver = new MazeSolver(
      maze,
      this.configService.get('wallSymbol', '#'),
      this.configService.get('maxX', 30),
      this.configService.get('maxY', 30),
    );

    const solution: QueueNode = await mazeSolver.solveMaze(
      new Node(0, 0),
      new Node(maze.length - 1, maze[0].length - 1),
    );

    return solution.distance;
  }
}
