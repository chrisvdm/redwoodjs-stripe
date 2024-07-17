import { handleStripeWebhooks } from "@redwoodjs-stripe/api";
import { generateStripeMockEvent } from "@redwoodjs-stripe/api/testing";

describe("stripeWebhooks function", () => {
  it("Should respond with 200", async () => {
    const mockStripeEvent = generateStripeMockEvent();

    const response = await handleStripeWebhooks(mockStripeEvent, {}, {}, false);

    expect(response.statusCode).toBe(200);
  });
});
