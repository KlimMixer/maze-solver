import { Node } from './Node';

export class MazeValidator {
  private readonly maxX: number;
  private readonly maxY: number;
  private readonly wallSymbol: string;

  constructor(maxX: number, maxY: number, wallSymbol: string) {
    this.maxX = maxX;
    this.maxY = maxY;
    this.wallSymbol = wallSymbol;
  }

  public validate(
    maze: string[][],
    startPosition: Node,
    endPosition: Node,
  ): void {
    if (this.isMazeToSmall(maze)) {
      throw new Error(
        'Maze is to small. It should be more than 1 row and 1 column',
      );
    }

    if (this.isMazeToBig(maze)) {
      throw new Error(
        `Maze is to big. It should be less than ${this.maxX} rows and ${this.maxY} column`,
      );
    }

    if (this.isStartPointIsWall(maze, startPosition)) {
      throw new Error(
        `Start point should be empty. Start point at (x = ${startPosition.x}, y = ${startPosition.y})`,
      );
    }

    if (this.isEndPointIsWall(maze, endPosition)) {
      throw new Error(
        `End point should be empty. End point at (x = ${endPosition.x}, y = ${endPosition.y})`,
      );
    }
  }

  private isMazeToSmall(value: string[][]): boolean {
    return value.length < 2 || value.some((row: string[]) => row.length < 2);
  }

  private isMazeToBig(value: string[][]): boolean {
    return (
      value.length > this.maxX ||
      value.some((row: string[]) => row.length > this.maxY)
    );
  }

  private isStartPointIsWall(value: string[][], startPosition: Node): boolean {
    return value[startPosition.x][startPosition.y] == this.wallSymbol;
  }

  private isEndPointIsWall(value: string[][], endPosition: Node): boolean {
    return value[endPosition.x][endPosition.y] == this.wallSymbol;
  }
}
