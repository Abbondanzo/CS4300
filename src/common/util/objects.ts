import equal from "fast-deep-equal";

export const objectEquality = <T extends object>(objA: T, objB: T): boolean => {
  return equal(objA, objB);
};
