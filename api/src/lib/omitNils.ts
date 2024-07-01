export type OmitNils<Inputs> = Partial<{
  [K in keyof Inputs]?: NonNil<Inputs[K]>;
}>;

export type NonNil<Value> = Value extends null
  ? never
  : Value extends undefined
    ? undefined
    : Value;

export const omitNils = <Inputs extends object>(
  inputs: Inputs,
): OmitNils<Inputs> => {
  const results: Partial<OmitNils<Inputs>> = {};
  const keys = Object.keys(inputs) as (keyof Inputs)[];

  for (const key of keys) {
    const value = inputs[key];

    if (value != null) {
      results[key] = value as NonNil<Inputs[keyof Inputs]>;
    }
  }

  return results as OmitNils<Inputs>;
};
