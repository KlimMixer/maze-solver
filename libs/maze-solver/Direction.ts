export class Direction {
  dx: number;
  dy: number;
  name: string;

  constructor(name: string, dx: number, dy: number) {
    this.name = name;
    this.dx = dx;
    this.dy = dy;
  }
}
