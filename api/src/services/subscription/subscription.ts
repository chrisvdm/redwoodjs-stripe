import type { QueryListStripeSubscriptionsArgs } from "../../generated/graphql.js";
import { deepOmitNils } from "../../lib/deepOmitNils.js";
import { stripe } from "../../lib/stripe.js";

export const listStripeSubscriptions = async ({
  data,
}: QueryListStripeSubscriptionsArgs) => {
  const params = deepOmitNils(data?.params ?? {}) ?? {};

  const subscriptions = await stripe.subscriptions.list(params);

  return subscriptions.data;
};
