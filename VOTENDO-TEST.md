
# Votendo Test Task
=================

## Goals

In this task we will not only evaluate how application works, but also the way how you build the project,
how clear the code is, how documented it is, how stable it is.

## Project requirements

Create NodeJS application, select suitable framework and tools for this project.

It shall be possible to run the application in Docker container. Add Dockerfile into the project.

Write automated tests.

Create a README.md file with general information about this project.
For example, describe code structure, how to build, set up and run the application and how to run automated tests.

## Task Description

User will send POST request to the application public REST API resource `/maze`
and must get response with number showing minimum amount of steps that are needed to go through his maze.
The maze is a rectangular table of rows and columns. Maximum size of maze is 30x30.
Every cell can be either empty (.) or be a wall (#).
Starting point is always located in the upper left point (maze[0][0]) and the end is always located in the lower right point.
It is allowed to move through empty cells, movements are blocked by walls.

### Input
Server shall receive JSON array as input.
Each element in the input array is another array which represents row.
Each element in a row represents cell.
Cell content can have one of the possible values: "." or "#"

**Example input**

```
[
  [".", ".", "."],
  ["#", "#", "."],
  [".", ".", "."],
  [".", "#", "#"],
  [".", ".", "."]
]
```

### Output
Server shall respond with number of minimal steps required to get from the starting point to the end point.
From the example above the response will be 10.
Server shall respond with HTTP error in case of invalid input.

## Submit your solution

Place your solution in public repository on Git Hub.
Link to the project repository shall be sent by email to info@votendo.com 
The letter subject shall be `{FirstName} {LastName} test task`

Take your time and good luck.