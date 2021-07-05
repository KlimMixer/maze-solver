import { ApiResponseProperty } from '@nestjs/swagger';

export class MazeSolutionEntityRO {
  @ApiResponseProperty()
  public readonly stepsToPass: number;
}
