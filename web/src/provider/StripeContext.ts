import { createContext } from "react";
import { createStripeApi } from "./createStripeApi.js";

export const StripeContext = createContext(
  createStripeApi(
    [],
    () => null,
    null,
    () => null,
  ),
);
