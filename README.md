
# RedwoodJS-Stripe

<img alt="logo" src="https://github.com/chrisvdm/redwoodjs-stripe/assets/4147109/eab087ec-e176-4ce7-a066-4ca3e2e3db02"  width="33%" align="right">

_A Redwood/Stripe integration made easy!_

The aim of this plugin is to make setting up a RedwoodJS commerce app as simple as possible, with minimal configuration. After running a single setup command users will have a demo storefront generated into their app which uses a simple cart machine for cart items and uses Stripe Checkout to checkout. The demo store can either be customised by the user or used as documentation for building their own storefront.

**Current features:**

- Stripe Checkout via `useStripeCheckout()` hook
- Subscription support via `useStripeCustomerPortal()` hook
- LoFi persistent cart functionality via `useStripeCart()` hook
- User mapping via `<StripeProvider/>`
- Setup script to build a working demo `npx @redwoodjs-stripe/cli setup`
- Schemas and services are imported from plugin. Barely any boilerplate needed
- Demo store as in-app API reference

There's an [example store](https://github.com/redwoodjs/example-store-stripe) that is bit more realistic in its application of the plugin if you need a slightly more complicated example. 

🚀 Built with help from the awesome people at [RedwoodJS](https://redwoodjs.com/) and [Stripe](https://stripe.com/) 🚀

## Get Started

```
npx @redwoodjs-stripe/cli@latest setup
```

## Resources
- [Quick Start](https://github.com/chrisvdm/redwoodjs-stripe/wiki/Quick-Start)
- [Installation](https://github.com/chrisvdm/redwoodjs-stripe/wiki/Installation)
- [API Reference](https://github.com/chrisvdm/redwoodjs-stripe/wiki/API-Reference)
- [Example Store](https://github.com/redwoodjs/example-store-stripe)
- [Useful Links](https://github.com/chrisvdm/redwoodjs-stripe/wiki/Useful-Links)



## How you can help

<a name="contribution"></a>

- Help maintain the [Redwoodjs-stripe-example-store repo](https://github.com/redwoodjs/example-store)
- [Contribute](https://github.com/chrisvdm/redwoodjs-stripe/wiki/Contributing)!
- Send good vibes :)

## Thank you

<a name="thank-you"></a>

The teams from [Stripe](https://stripe.com/) and [RedwoodJS](https://redwoodjs.com/) who have supported this project from day one.

Everybody else who contributed in code, pep talks and every other way!

## Where to next? 
Go over to the [Quick Start](https://github.com/chrisvdm/redwoodjs-stripe/wiki/Quick-Start) guide to start playing around

