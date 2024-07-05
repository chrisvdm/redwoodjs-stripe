import type { Stripe } from "stripe";
import type {
  MutationCreateStripeCustomerPortalConfigArgs,
  MutationCreateStripeCustomerPortalSessionArgs,
  MutationCreateStripeCustomerPortalSessionSkipAuthArgs,
  QueryListStripeCustomerPortalConfigArgs,
} from "../../generated/graphql.js";
import { deepOmitNils } from "../../lib/deepOmitNils.js";
import { nonNilAssertionError } from "../../lib/nonNilAssertionError.js";
import { stripe } from "../../lib/stripe.js";

export const createStripeCustomerPortalSession = async ({
  data: inputData,
}: MutationCreateStripeCustomerPortalSessionArgs) => {
  const data = deepOmitNils(inputData);

  if (data?.customer == null) {
    throw nonNilAssertionError(
      "createStripeCustomerPortalSession:customer",
      data,
    );
  }

  const params = {
    ...data,
    locale: data.locale as Stripe.BillingPortal.SessionCreateParams.Locale,
  };

  const session = await stripe.billingPortal.sessions.create(params);

  return session;
};

export const createStripeCustomerPortalSessionSkipAuth = async (
  payload: MutationCreateStripeCustomerPortalSessionSkipAuthArgs,
) => {
  const session = await createStripeCustomerPortalSession(payload);
  return session;
};

export const createStripeCustomerPortalConfig = async ({
  data: inputData,
}: MutationCreateStripeCustomerPortalConfigArgs) => {
  const data = deepOmitNils(inputData);

  if (data == null) {
    throw nonNilAssertionError(
      "createStripeCustomerPortalConfig:data",
      data,
    );
  }

  const config = await stripe.billingPortal.configurations.create(data);
  return config;
};

export const listStripeCustomerPortalConfig = async ({
  params,
}: QueryListStripeCustomerPortalConfigArgs) => {
  const configArray = await stripe.billingPortal.configurations.list(
    deepOmitNils(params),
  );
  return configArray;
};
