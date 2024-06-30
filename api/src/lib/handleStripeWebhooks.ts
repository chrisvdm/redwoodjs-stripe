export const handleStripeWebhooks = async (
  event,
  context,
  webhooksObj = {},
  secure = true,
) => {
  if (secure) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

    if (!endpointSecret) {
      throw new Error(`The Stripe webhook secret key isn't set`);
    }

    const signature = event.headers["stripe-signature"];

    // For Vercel deploys, events are based64 encoded
    const parsedBody = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf-8")
      : event.body;

    const stripeEvent = stripe.webhooks.constructEvent(
      parsedBody,
      signature,
      endpointSecret,
    );

    // Find event type in webhookObject and execute function for the event.
    if (typeof webhooksObj[stripeEvent.type] !== "undefined") {
      await webhooksObj[stripeEvent.type](stripeEvent, context);
    }

    return {
      statusCode: 200,
      results: stripeEvent,
    };
  } else {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Stripe webhooks must be secure in production");
    }

    const unverifiedStripeEvent = JSON.parse(event.body);

    if (typeof webhooksObj[unverifiedStripeEvent.type] !== "undefined") {
      await webhooksObj[unverifiedStripeEvent.type](
        unverifiedStripeEvent,
        context,
      );
    }

    return {
      statusCode: 200,
      results: unverifiedStripeEvent,
    };
  }
};
