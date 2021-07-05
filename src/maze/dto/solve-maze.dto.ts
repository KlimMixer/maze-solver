import { ApiProperty } from '@nestjs/swagger';

export class MazeDto {
  @ApiProperty({
    description: 'Maze grid',
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    default: [
      ['.', '#'],
      ['.', '.'],
    ],
  })
  readonly maze: string[][];
}
