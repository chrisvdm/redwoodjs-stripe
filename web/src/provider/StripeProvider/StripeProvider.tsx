import { type ReactNode, useEffect, useState, useMemo } from "react";

import { useStripeCustomerFetch } from "../../hooks";

import { createStripeApi } from "../createStripeApi";
import { StripeContext } from "../StripeContext";
import { useOnceDefined } from "./useOnceDefined";
import type { Cart, CustomerDescription } from "../types";

export const StripeProvider = ({
  children,
  customer = {
    id: "",
    search: "",
  },
}: {
  customer: CustomerDescription;
  children: ReactNode;
}) => {
  const [cart, setCart] = useState<Cart>([]);
  const [stripeCustomer, setCustomer] = useState(null);
  const { id = "", search = "" } = customer;

  const noSpaces = (text: string) => text.replace(/^\s+|\s+$/gm, "");

  // Fetches Stripe Customer object
  useStripeCustomerFetch(noSpaces(id), search, setCustomer);
  // Returns a fn that returns a promise when stripeCustomer is null
  // else returns resolved stripeCustomer value
  const onceCustomerResolved = useOnceDefined(stripeCustomer);

  const waitForCustomer = async () => {
    // Check that we have what we need to either fetch(search) for and create a Stripe Customer
    if (search !== "") {
      // Wait for stripeCustomer to have a value and return value
      return await onceCustomerResolved();
    } else {
      return null;
    }
  };

  // onMount fetch cart items from local storage
  useEffect(() => {
    let ignore = false;
    const serializedCart = window.localStorage.getItem("stripeCart");
    if (serializedCart) {
      setCart(JSON.parse(serializedCart));
    }
    return () => {
      ignore = true;
    };
  }, []);

  // sync Cart with localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.localStorage.setItem("stripeCart", JSON.stringify(cart));
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cart]);

  // Only create new api obj when cart and stripeCustomer changes
  const api = useMemo(
    () => createStripeApi(cart, setCart, stripeCustomer, waitForCustomer),
    [cart, stripeCustomer],
  );

  return (
    <StripeContext.Provider value={api}>{children}</StripeContext.Provider>
  );
};
