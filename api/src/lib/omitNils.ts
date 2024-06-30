export const omitNils = <K extends string | number | symbol, V>(
  inputs: Record<K, V | null | undefined>,
): Record<K, V> => {
  const results: Partial<Record<K, V>> = {};

  for (const key of Object.keys(inputs) as K[]) {
    const value = inputs[key];
    if (value != null) {
      results[key] = value;
    }
  }

  return results as Record<K, V>;
};
