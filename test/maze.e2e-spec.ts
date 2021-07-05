import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MazeModule } from '../src/maze/maze.module';
import configuration from '../src/config/configuration';

describe('MazeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MazeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/maze (POST) empty maze', () => {
    return request(app.getHttpServer())
      .post('/maze')
      .set('Content-type', 'application/json')
      .send({ maze: [] })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('statusCode', 400);
        expect(res.body).toHaveProperty(
          'message',
          'Maze is to small. It should be more than 1 row and 1 column',
        );
        expect(res.body).toHaveProperty('error', 'Bad Request');
      });
  });

  it('/maze (POST) to small maze', () => {
    return request(app.getHttpServer())
      .post('/maze')
      .set('Content-type', 'application/json')
      .send({ maze: [['.'], ['.']] })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('statusCode', 400);
        expect(res.body).toHaveProperty(
          'message',
          'Maze is to small. It should be more than 1 row and 1 column',
        );
        expect(res.body).toHaveProperty('error', 'Bad Request');
      });
  });

  it('/maze (POST) to big maze', () => {
    const mazeData = [];
    const maxX = configuration().maxX + 1;
    const maxY = configuration().maxY + 1;
    for (let i = 0; i < maxX; i++) {
      mazeData[i] = new Array<string>(maxY);
      mazeData[i].fill('.');
    }
    return request(app.getHttpServer())
      .post('/maze')
      .set('Content-type', 'application/json')
      .send({ maze: mazeData })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('statusCode', 400);
        expect(res.body).toHaveProperty(
          'message',
          `Maze is to big. It should be less than ${maxX - 1} rows and ${
            maxY - 1
          } column`,
        );
        expect(res.body).toHaveProperty('error', 'Bad Request');
      });
  });

  it('/maze (POST) unsolvable maze', () => {
    return request(app.getHttpServer())
      .post('/maze')
      .set('Content-type', 'application/json')
      .send({
        maze: [
          ['.', '#'],
          ['#', '.'],
        ],
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('statusCode', 400);
        expect(res.body).toHaveProperty('message', "Maze hasn't solution");
        expect(res.body).toHaveProperty('error', 'Bad Request');
      });
  });

  it('/maze (POST) maze with blocked start position', () => {
    return request(app.getHttpServer())
      .post('/maze')
      .set('Content-type', 'application/json')
      .send({
        maze: [
          ['#', '#'],
          ['#', '.'],
        ],
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('statusCode', 400);
        expect(res.body).toHaveProperty(
          'message',
          'Start point should be empty. Start point at (x = 0, y = 0)',
        );
        expect(res.body).toHaveProperty('error', 'Bad Request');
      });
  });

  it('/maze (POST) maze with blocked end position', () => {
    return request(app.getHttpServer())
      .post('/maze')
      .set('Content-type', 'application/json')
      .send({
        maze: [
          ['.', '#', '#'],
          ['#', '#', '#'],
          ['#', '#', '#'],
        ],
      })
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty('statusCode', 400);
        expect(res.body).toHaveProperty(
          'message',
          'End point should be empty. End point at (x = 2, y = 2)',
        );
        expect(res.body).toHaveProperty('error', 'Bad Request');
      });
  });

  it('/maze (POST) small (2x2) maze', () => {
    const mazeData = {
      maze: [
        ['.', '.'],
        ['.', '.'],
      ],
    };
    return request(app.getHttpServer())
      .post('/maze')
      .set('Content-type', 'application/json')
      .send(mazeData)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('stepsToPass', 2);
      });
  });

  it('/maze (POST) small (6x6) maze', () => {
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
    return request(app.getHttpServer())
      .post('/maze')
      .set('Content-type', 'application/json')
      .send(mazeData)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty('stepsToPass', 10);
      });
  });
});
