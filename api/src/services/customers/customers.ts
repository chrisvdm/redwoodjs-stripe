import type {
  MutationCreateStripeCustomerArgs,
  QueryRetrieveStripeCustomerArgs,
  QueryStripeCustomerSearchArgs,
} from "../../generated/graphql.js";
import { lastStripeObject } from "../../lib/lastStripeObject.js";
import { omitNils } from "../../lib/omitNils.js";
import { parseStripeResponse } from "../../lib/parseStripeResponse.js";
import { stripe } from "../../lib/stripe.js";

export const stripeCustomerSearch = async ({
  query,
}: QueryStripeCustomerSearchArgs) => {
  const customer = await stripe.customers.search(
    omitNils({
      query,
    }),
  );

  return parseStripeResponse(lastStripeObject(customer.data));
};

export const retrieveStripeCustomer = async ({
  data,
}: QueryRetrieveStripeCustomerArgs) => {
  const { id, addProps } = data;

  const customer = await stripe.customers.retrieve(id, { ...addProps });
  return parseStripeResponse(customer);
};

export const createStripeCustomer = async ({
  data,
}: MutationCreateStripeCustomerArgs) => {
  const newCustomer = await stripe.customers.create(data);
  return parseStripeResponse(newCustomer);
};
