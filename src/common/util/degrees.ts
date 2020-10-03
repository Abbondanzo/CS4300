import { truncate } from "./numbers";

export const degreesToRadians = (degrees: number) => {
  return ((360 - degrees) * Math.PI) / 180;
};

export const radiansToDegrees = (radians: number) => {
  return (360 - truncate((radians * 180) / Math.PI)) % 360;
};
