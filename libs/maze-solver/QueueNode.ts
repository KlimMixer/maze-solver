import { Node } from './Node';

export class QueueNode extends Node {
  distance: number;
  previousNodes: Node[];

  constructor(x: number, y: number, distance: number, previousNodes: Node[]) {
    super(x, y);
    this.distance = distance;
    this.previousNodes = previousNodes;
  }

  public toString(): string {
    return `QueueNode x = ${this.x},
                      y = ${this.y},
                      distance = ${this.distance},
                      previousNodes = ${this.previousNodes}`;
  }
}
