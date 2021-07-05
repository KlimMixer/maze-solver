export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  wallSymbol: process.env.WALL_SYMBOL || '#',
  maxX: parseInt(process.env.MAX_X, 10) || 30,
  maxY: parseInt(process.env.MAX_Y, 10) || 30,
});
