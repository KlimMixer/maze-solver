# API Docs

## `POST /maze`

Request parameters:
| Name | Type       | Description | Example                  |
|------|------------|-------------|--------------------------|
| maze | string[][] | maze grid   | [[".", "#"], [".", "."]] |

Example request:
```json
{
  "maze": [
    [".", "#"],
    [".", "."]
  ]
}
```

Example response:
```json
{
  "stepsToPass": 2
}
```

### Validation errors

| Status Code | Message                                                                                      |
|-------------|----------------------------------------------------------------------------------------------|
| 400         | Maze is to small. It should be more than 1 row and 1 column                                  |
| 400         | Maze is to big. It should be less than {MAX_X} rows and {MAX_Y} columns                      |
| 400         | Maze hasn't solution.                                                                        |
| 400         | Start point should be empty. Start point at (x = 0, y = 0)                                   |
| 400         | Start point should be empty. End point at (x = {LAST_X_COORDINATE}, y = {LAST_Y_COORDINATE}) |
