import type {
  MutationCreateStripeCustomerArgs,
  QueryRetrieveStripeCustomerArgs,
  QueryStripeCustomerSearchArgs,
} from "../../generated/graphql.js";
import { deepOmitNils } from "../../lib/deepOmitNils.js";
import { lastStripeObject } from "../../lib/lastStripeObject.js";
import { nonNilAssertionError } from "../../lib/nonNilAssertionError.js";
import { parseStripeResponse } from "../../lib/parseStripeResponse.js";
import { stripe } from "../../lib/stripe.js";

export const stripeCustomerSearch = async ({
  query,
}: QueryStripeCustomerSearchArgs) => {
  const customer = await stripe.customers.search({
    query: query ?? "",
  });

  return parseStripeResponse(lastStripeObject(customer.data));
};

export const retrieveStripeCustomer = async ({
  data,
}: QueryRetrieveStripeCustomerArgs) => {
  const { id, addProps } = data ?? {};

  if (id !== null) {
    throw nonNilAssertionError("retrieveStripeCustomer:id", data);
  }

  const customer = await stripe.customers.retrieve(
    id,
    deepOmitNils(addProps) ?? {},
  );
  return parseStripeResponse(customer);
};

export const createStripeCustomer = async ({
  data,
}: MutationCreateStripeCustomerArgs) => {
  const params = deepOmitNils(data) ?? {};

  if (params.name == null) {
    throw nonNilAssertionError("createStripeCustomer:name", params);
  }

  const newCustomer = await stripe.customers.create(params);
  return parseStripeResponse(newCustomer);
};
