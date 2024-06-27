export const isEmptyObj = (
  obj: unknown,
): obj is Record<string | number | symbol, unknown> =>
  Boolean(
    obj && // 👈 null and undefined check
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype,
  );
