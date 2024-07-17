export type OmitNils<Inputs> = {
  [K in keyof Inputs]: NonNilProp<Inputs[K]>;
};

type NonNilProp<Value> = Value extends null
  ? undefined
  : Value extends undefined
    ? undefined
    : Value;

export type NonNil<Value> = Value extends null
  ? never
  : Value extends undefined
    ? never
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
