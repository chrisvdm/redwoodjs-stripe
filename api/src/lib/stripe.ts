import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  appInfo: {
    name: "redwoodjs-stripe",
    url: "https://github.com/chrisvdm/redwoodjs-stripe",
  },
});
