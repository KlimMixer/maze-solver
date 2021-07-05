import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MazeDto } from '../dto';
import { MazeValidator, Node } from '../../../libs/maze-solver';

@Injectable()
export class MazeValidationPipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}

  transform(value: MazeDto) {
    const { maze } = value;

    const mazeValidator: MazeValidator = new MazeValidator(
      this.configService.get('maxX', 30),
      this.configService.get('maxY', 30),
      this.configService.get('wallSymbol', '#'),
    );

    let endPointX = 0;
    let endPointY = 0;

    if (maze != undefined && maze.length > 0) {
      endPointX = maze.length - 1;
      endPointY = maze[endPointX].length - 1;
    }

    try {
      mazeValidator.validate(
        maze,
        new Node(0, 0),
        new Node(endPointX, endPointY),
      );
      return value;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
