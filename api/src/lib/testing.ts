import { mockHttpEvent } from "@redwoodjs/testing/api";
import { stripe } from "./logger";

// Generates a test Stripe mock event.
export const generateStripeMockEvent = () => {
  const payload = JSON.stringify(
    {
      id: "evt_test_webhook",
      object: "event",
    },
    null,
    2,
  );

  process.env.STRIPE_WEBHOOK_SK = "whsec_test_secret";

  // See https://github.com/stripe/stripe-node/blob/master/README.md#testing-webhook-signing.
  const header = stripe.webhooks.generateTestHeaderString({
    payload,
    secret: process.env.STRIPE_WEBHOOK_SK,
  });

  const httpEvent = mockHttpEvent({
    body: payload,
    headers: {
      "stripe-signature": header,
    },
  });

  return httpEvent;
};
