import { Direction } from './Direction';
import { MazeValidator } from './MazeValidator';
import { Node } from './Node';
import { QueueNode } from './QueueNode';

export class MazeSolver {
  private readonly directions: Direction[] = [
    new Direction('left', -1, 0),
    new Direction('up', 0, -1),
    new Direction('right', 1, 0),
    new Direction('down', 0, 1),
  ];
  queue: QueueNode[];
  maze: string[][];
  visitedMaze: boolean[][];
  wallSymbol: string;
  mazeValidator: MazeValidator;

  constructor(
    maze: string[][],
    wallSymbol: string,
    maxX: number,
    maxY: number,
  ) {
    this.queue = new Array<QueueNode>();

    this.maze = maze;

    this.visitedMaze = new Array<Array<boolean>>(maze.length);

    for (let i = 0; i < maze.length; i++) {
      this.visitedMaze[i] = new Array<boolean>(maze[i].length);
      this.visitedMaze[i].fill(false);
    }

    this.mazeValidator = new MazeValidator(maxX, maxY, wallSymbol);
    this.wallSymbol = wallSymbol;
  }

  public async solveMaze(
    startPosition: Node,
    endPosition: Node,
  ): Promise<QueueNode> {
    this.mazeValidator.validate(this.maze, startPosition, endPosition);

    this.queue.push(new QueueNode(startPosition.x, startPosition.y, 0, []));
    this.visitedMaze[startPosition.x][startPosition.y] = true;

    while (this.queue.length > 0) {
      const currentNode: QueueNode = this.queue.shift();

      if (currentNode.x == endPosition.x && currentNode.y == endPosition.y) {
        return currentNode;
      }

      for (
        let directionId = 0;
        directionId < this.directions.length;
        directionId++
      ) {
        const nextX: number = currentNode.x + this.directions[directionId].dx;
        const nextY: number = currentNode.y + this.directions[directionId].dy;
        if (
          (await this.isValidCoor(nextX, nextY)) &&
          this.maze[nextX][nextY] != this.wallSymbol &&
          !this.visitedMaze[nextX][nextY]
        ) {
          const previousNodes: Node[] = currentNode.previousNodes;
          previousNodes.push(new Node(currentNode.x, currentNode.y));
          this.queue.push(
            new QueueNode(
              nextX,
              nextY,
              currentNode.distance + 1,
              previousNodes,
            ),
          );
        }
      }
    }

    throw new Error("Maze hasn't solution.");
  }

  private async isValidCoor(x: number, y: number) {
    return x >= 0 && x < this.maze.length && y >= 0 && y < this.maze[0].length;
  }
}
