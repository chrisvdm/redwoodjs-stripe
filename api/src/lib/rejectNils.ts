export const rejectNils = <V>(
  inputs: Array<V | null | undefined>,
): Array<V> => {
  const results: Array<V> = [];

  for (const value of inputs) {
    if (value != null) {
      results.push(value);
    }
  }

  return results as Array<V>;
};
