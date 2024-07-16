import type { NonNil } from "./omitNils";
import { rejectNils } from "./rejectNils";

export type DeepOmitNilsObj<Inputs> = {
  [K in keyof Inputs]: DeepOmitNilsProp<Inputs[K]>;
};

type DeepOmitNilsProp<Value> = Value extends null
  ? undefined
  : Value extends undefined
    ? undefined
    : DeepOmitNils<Value>;

export type DeepOmitNils<Input> = Input extends Array<infer Item>
  ? Array<NonNil<DeepOmitNils<Item>>>
  : Input extends object
    ? DeepOmitNilsObj<Input>
    : NonNil<Input>;

const omitNilsObj = <Inputs extends object>(
  inputs: Inputs,
): null | DeepOmitNilsObj<Inputs> => {
  const results: Partial<DeepOmitNilsObj<Inputs>> = {};
  const keys = Object.keys(inputs) as (keyof Inputs)[];
  let isEmpty = true;

  for (const key of keys) {
    const value = inputs[key];

    if (value != null) {
      const result = deepOmitNils(value);

      if (result != null) {
        results[key] = result as DeepOmitNilsProp<Inputs[keyof Inputs]>;
        isEmpty = false;
      }
    }
  }

  return isEmpty && keys.length > 0
    ? null
    : (results as DeepOmitNilsObj<Inputs>);
};

export const deepOmitNils = <Input>(
  input: Input,
): undefined | DeepOmitNils<Input> => {
  if (input == null) {
    return undefined;
  }

  if (Array.isArray(input)) {
    return rejectNils(input.map(deepOmitNils)) as DeepOmitNils<Input>;
  }

  if (typeof input === "object") {
    return omitNilsObj(input) as undefined | DeepOmitNils<Input>;
  }

  return input as undefined | DeepOmitNils<Input>;
};
