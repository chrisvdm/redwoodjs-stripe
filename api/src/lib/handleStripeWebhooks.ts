import type { APIGatewayEvent, Context } from "aws-lambda";
import type { Stripe } from "stripe";
import { stripe } from "./stripe";
import { nonNilAssertionError } from "./nonNilAssertionError";

type Webhook = (
  event: Stripe.Event,
  context: Context,
) => unknown | Promise<unknown>;

type Webhooks = Record<Stripe.Event["type"], Webhook>;

interface HandleStripeWebhooksProps {
  event: APIGatewayEvent;
  context: Context;
  webhooks?: Webhooks;
  secure?: boolean;
}

export const handleStripeWebhooks = async ({
  event,
  context,
  webhooks = {} as Webhooks,
  secure = true,
}: HandleStripeWebhooksProps) => {
  if (secure) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

    if (!endpointSecret) {
      throw nonNilAssertionError("handleStripeWebhooks:webhookKey", {
        endpointSecret,
      });
    }

    const signature = event.headers["stripe-signature"];

    if (!signature) {
      throw nonNilAssertionError("handleStripeWebhooks:signature", {
        signature,
      });
    }

    // For Vercel deploys, events are based64 encoded
    const parsedBody = event.isBase64Encoded
      ? Buffer.from(event.body ?? "", "base64").toString("utf-8")
      : event.body;

    const stripeEvent = stripe.webhooks.constructEvent(
      parsedBody ?? "",
      signature,
      endpointSecret,
    );

    // Find event type in webhookObject and execute function for the event.
    if (typeof webhooks[stripeEvent.type] !== "undefined") {
      await webhooks[stripeEvent.type](stripeEvent, context);
    }

    return {
      statusCode: 200,
      results: stripeEvent,
    };
  } else {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Stripe webhooks must be secure in production");
    }

    const unverifiedStripeEvent = JSON.parse(event.body ?? "");
    const eventType = unverifiedStripeEvent.type as Stripe.Event["type"];

    if (typeof webhooks[eventType] !== "undefined") {
      await webhooks[eventType](unverifiedStripeEvent, context);
    }

    return {
      statusCode: 200,
      results: unverifiedStripeEvent,
    };
  }
};
