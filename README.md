# Maze solver api

## Description

[Test task for Votendo](VOTENDO-TEST.md).
Maze solver microservice.

## Documentation

[Api docs](docs/API.md)

[Configuration docs](docs/Configuration.md)

After starting of microservice you can access to swagger at: [http://localhost:3000/swagger](http://localhost:3000/swagger).

## Installation

```bash
$ npm install
```

## Installation development environment

```bash
$ npm install
$ npm run prepare
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# docker development
$ docker-compose up dev

# docker production mode
$ docker-compose up prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
