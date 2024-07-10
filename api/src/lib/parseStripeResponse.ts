type ResponsePrimitive = number | string | boolean | null;

interface StripeResponseList<
  Value extends StripeResponseValue = StripeResponseValue,
> {
  object: "list";
  data: Value[];
}

type StripeResponseObject = {
  [K in keyof object]: StripeResponseValue;
};

type StripeResponseValue =
  | ResponsePrimitive
  | StripeResponseList
  | StripeResponseObject;

type ParsedStripeResponseValue =
  | ResponsePrimitive
  | Array<ParsedStripeResponseValue>
  | ParsedStripeResponseObject;

type ParsedStripeResponseObject = {
  [K in keyof object]: ParsedStripeResponseValue;
};

export type ParsedStripeResponse<Input> = Input extends null
  ? null
  : Input extends string
    ? string
    : Input extends number
      ? number
      : Input extends boolean
        ? boolean
        : Input extends StripeResponseList<infer Value>
          ? ParsedStripeResponse<Value>[]
          : Input extends { [K in keyof Input]: Input[K] }
            ? {
                [K in keyof Input]: ParsedStripeResponse<Input[K]>;
              }
            : never;

export const parseStripeResponse = <Input extends StripeResponseValue>(
  input: Input,
): ParsedStripeResponse<Input> => {
  let result: ParsedStripeResponseValue;

  if (input == null || typeof input !== "object") {
    result = input;
  } else if ("object" in input && input.object === "list") {
    result = input.data.map(parseStripeResponse);
  } else {
    result = mapValues(input as StripeResponseObject, parseStripeResponse);
  }

  return result as ParsedStripeResponse<Input>;
};

export const mapValues = <K extends string | number | symbol, A, B>(
  inputs: Record<K, A>,
  fn: (a: A) => B,
): Record<K, B> => {
  const results: Partial<Record<K, B>> = {};

  for (const key of Object.keys(inputs) as K[]) {
    const a = inputs[key];
    results[key] = fn(a);
  }

  return results as Record<K, B>;
};
