import { useContext } from "react";
import { StripeContext } from "./StripeContext.js";

export const useStripeCart = () => {
  const api = useContext(StripeContext);
  return api;
};
