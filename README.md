# redwoodjs-stripe

A Redwood/Stripe integration made easy!

This package is being built with the support of the awesome people at [Redwood](https://redwoodjs.com/) and [Stripe](https://stripe.com/)

###  Try it out

There's a very unstable version of the plugin available to try out. It's held together with spit and wishful. It's to give future users a taste of things to come.

**Prerequisites**

A stripe account (prefferably in test mode)

**Steps**
1. Create a fresh Redwood app

`yarn create redwood-app myDemo`

2. Install the plugin

`yarn add redwoodjs-stripe`

3. Setup the plugin and follow the prompts

`yarn redwoodjs-stripe setup`

4. Start up your app and then navigate to [localhost:8910/stripe-demo](http://localhost:8910/stripe-demo)

`yarn rw dev`

## Current progress
 
You can take a look at the [Roadmap](https://github.com/chrisvdm/redwoodjs-stripe/issues/1) for this project for more details and a rough timeline. For a quick status update look below. 

**STATUS:** Building MVP

**ETA** July 2022 🤞

## How you can help
- Tell me what you would like to see in an Stripe/Redwoodjs plugin on the discussion page. Even though V1 features are pretty much locked in, it will help for planning later releases
- Contribute to the example store
- Send good vibes :)

## Useful Links

- [Stripe + Redwood Integration package discusson](https://community.redwoodjs.com/t/stripe-redwood-integration-package/2226) in the Redwood forum
- [Stripe + Redwood Integration Proof of Concept Repo](https://github.com/redwoodjs/payments) (work in progress)
- [Stripe + Redwood example store](https://github.com/redwoodjs/example-store) using Redwood and Stripe (open to contributors)
- [Roadmap](https://github.com/chrisvdm/redwoodjs-stripe/issues/1)
- [Sandbox](https://github.com/chrisvdm/test-app) a sandbox app for testing plugin integration before putting in the example store

## Planned V1 Features
- Subscription payments with Stripe Checkout
  - Customer Portal creation 
- Once-off payments with Stripe Checkout
- Webhook handling 
- LoFi Cart




