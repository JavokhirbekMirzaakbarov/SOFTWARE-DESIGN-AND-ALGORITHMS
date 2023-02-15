import { Point } from './types';

export const distance = (pointA: Point, pointB: Point): number => {
  const horizontalDistance = pointB.x - pointA.x;
  const verticalDistance = pointB.y - pointA.y;

  return parseFloat(
    Math.sqrt(verticalDistance ** 2 + horizontalDistance ** 2).toFixed(3)
  );
};
