import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MazeController } from './maze.controller';
import { MazeService } from './maze.service';

describe('MazeController', () => {
  let mazeController: MazeController;
  let configService: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [MazeController],
      providers: [MazeService],
    }).compile();

    mazeController = app.get<MazeController>(MazeController);
    configService = app.get<ConfigService>(ConfigService);
  });

  describe('solve-maze', () => {
    it('Check for small(2x2) maze', async () => {
      const mazeData = {
        maze: [
          ['.', '.'],
          ['.', '.'],
        ],
      };
      const solution = await mazeController.solveMaze(mazeData);
      expect(solution.stepsToPass).toEqual(2);
    });

    it('Check to unsolvable maze', async () => {
      const mazeData = {
        maze: [
          ['.', '#'],
          ['#', '.'],
        ],
      };
      let error: Error = null;
      try {
        await mazeController.solveMaze(mazeData);
      } catch (err) {
        error = err;
      }
      expect(error.message).toContain("Maze hasn't solution");
    });

    it('Check to small(1x1) maze', async () => {
      const mazeData = {
        maze: [['.'], ['#']],
      };
      let error: Error = null;
      try {
        await mazeController.solveMaze(mazeData);
      } catch (err) {
        error = err;
      }
      expect(error.message).toContain(
        'Maze is to small. It should be more than 1 row and 1 column',
      );
    });

    it('Check to big maze', async () => {
      const mazeData = [];
      const maxX = configService.get<number>('maxX', 30);
      const maxY = configService.get<number>('maxY', 30);
      for (let i = 0; i < maxX + 1; i++) {
        mazeData[i] = new Array<string>(maxY + 1);
        mazeData[i].fill('.');
      }
      let error: Error = null;
      try {
        await mazeController.solveMaze({ maze: mazeData });
      } catch (err) {
        error = err;
      }
      expect(error.message).toContain(
        `Maze is to big. It should be less than ${maxX} rows and ${maxY} column`,
      );
    });

    it('Check maze with blocked start position', async () => {
      const mazeData = {
        maze: [
          ['#', '#'],
          ['#', '.'],
        ],
      };
      let error: Error = null;
      try {
        await mazeController.solveMaze(mazeData);
      } catch (err) {
        error = err;
      }
      expect(error.message).toContain(
        'Start point should be empty. Start point at (x = 0, y = 0)',
      );
    });

    it('Check maze with blocked end position', async () => {
      const mazeData = {
        maze: [
          ['.', '#', '#'],
          ['#', '#', '#'],
          ['#', '#', '#'],
        ],
      };
      let error: Error = null;
      try {
        await mazeController.solveMaze(mazeData);
      } catch (err) {
        error = err;
      }
      expect(error.message).toContain(
        'End point should be empty. End point at (x = 2, y = 2)',
      );
    });

    it('Check for medium(6x6) maze', async () => {
      const mazeData = {
        maze: [
          ['.', '#', '#', '#', '#', '#'],
          ['.', '.', '#', '.', '#', '#'],
          ['#', '.', '#', '.', '.', '.'],
          ['#', '.', '.', '.', '#', '.'],
          ['#', '#', '#', '.', '#', '.'],
          ['#', '#', '#', '.', '.', '.'],
        ],
      };
      const solution = await mazeController.solveMaze(mazeData);
      expect(solution.stepsToPass).toEqual(10);
    });
  });
});
