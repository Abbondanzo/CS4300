export const twoDimensionConverter = (points: number[]) => {
  const newPoints = [];
  for (let i = 0; i < points.length; i++) {
    newPoints.push(points[i]);
    // Push every odd number (after Y is inserted)
    if (i % 2 === 1) {
      newPoints.push(0);
    }
  }
  return newPoints;
};
