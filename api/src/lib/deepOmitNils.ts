import type { NonNil } from "./omitNils";
import { rejectNils } from "./rejectNils";

export type DeepOmitNilsObj<Inputs> = {
  [K in keyof Inputs]: DeepOmitNils<Inputs[K]>;
};

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
      const result = deepOmitNils(value) as DeepOmitNils<Inputs[keyof Inputs]>;

      if (result != null) {
        results[key] = result;
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
): null | DeepOmitNils<Input> => {
  if (input == null) {
    return null;
  }

  if (Array.isArray(input)) {
    return input.map(deepOmitNils).filter(rejectNils) as DeepOmitNils<Input>;
  }

  if (typeof input === "object") {
    return omitNilsObj(input) as null | DeepOmitNils<Input>;
  }

  return input as null | DeepOmitNils<Input>;
};
