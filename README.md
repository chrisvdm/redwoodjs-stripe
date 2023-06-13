_A Redwood/Stripe integration made easy!_

The aim of this plugin is to make setting up a Redwoodjs commerce app as simple as possible, with minimal configuration. After running a single setup command users will have a demo storefront generated into their app which uses a simple cart machine for cart items and uses Stripe Checkout to checkout. The demo store can either be customised by the user or used as documentation for building their own storefront.

**Current features:**

- Stripe Checkout via `useStripeCheckout()` hook
- Subscription support via `useStripeCustomerPortal()` hook
- LoFi persistent cart functionality via `useStripeCart()` hook
- User mapping via `<StripeProvider/>`
- Setup script to build a working demo `npx @redwoodjs-stripe/cli setup`
- Schemas and services are imported from plugin. Barely any boilerplate needed
- Demo store as in-app API reference

There's an [example store](https://github.com/redwoodjs/example-store-stripe) that is bit more realistic in its application of the plugin if you need a slightly more complicated example. 

**Limitations**

<a name='limitations'></a>Majority of these will be fixed in upcoming releases.
- Setup script will overwrite `api/src/functions/graphql.js`. This file is used to import the services and sdl from the plugin. If you have made changes to your file after creating your Redwoodjs app then you can either import the services and schemas manually and not run the setup script or rename your file temporarily then run the setup script.
```js
import { stripeServices, stripeSchemas } from '@redwoodjs-stripe/api'
```
- There's currently no Typescript support
- There's no integration tests

🚀 Built with help from the awesome people at [Redwood](https://redwoodjs.com/) and [Stripe](https://stripe.com/) 🚀

## Get Started

```
npx @redwoodjs-stripe/cli@latest setup
```

## Resources
- [Quick Start](https://github.com/chrisvdm/redwoodjs-stripe/wiki/Quick-Start)
- [Installation](https://github.com/chrisvdm/redwoodjs-stripe/wiki/Installation)
- [API Reference](https://github.com/chrisvdm/redwoodjs-stripe/wik/API-Reference)
- [Example Store](https://github.com/redwoodjs/example-store-stripe)
- [Useful Links](https://github.com/chrisvdm/redwoodjs-stripe/wiki/Useful-Links)



## How you can help

<a name="contribution"></a>

- Try out this release and give [feedback](https://github.com/chrisvdm/redwoodjs-stripe/discussions/60)
- Help maintain the [Redwoodjs-stripe-example-store repo](https://github.com/redwoodjs/example-store)
- Send good vibes :)

## Thank you

<a name="thank-you"></a>

The teams from [Stripe](https://stripe.com/) and [RedwoodJS](https://redwoodjs.com/) who have supported this project from day one.

Everybody else who contributed in code, pep talks and every other way!

## Where to next? 
Go over to the [Quick Start](https://github.com/chrisvdm/redwoodjs-stripe/wiki/Quick-Start) guide to start playing around

