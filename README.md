# redwoodjs-stripe

A Redwood/Stripe integration made easy!

This plugin enables you to create a commerce site with minimal configuration. After running the setup command you will have a demo storefront generated into your app which uses a simple cart machine for cart items and uses Stripe Checkout to checkout your items. You can either customise the demo store or use it as documentation for building your own storefront.

🚀 Built with help from the awesome people at [Redwood](https://redwoodjs.com/) and [Stripe](https://stripe.com/) 🚀

### Resources
- [Quick Start](#quick-start)
- [Installation](#installation)
- [API Reference]()
- [Wiki]()
- [Example Store](https://github.com/redwoodjs/example-store-stripe)
- [Contributing]()
- [Useful Links](#links)

## Quick Start

<a name="quick-start"></a>The easiest way to use the plugin is via the setup script. It generates a working demo that you can customise. 

** WARNING This method overwrites your `api/src/functions/graphql.js` file.

**Preflight**

- [Stripe CLI](https://github.com/stripe/stripe-cli) for webhook integration
- [Stripe API keys](https://dashboard.stripe.com/dashboard) nearby

**In terminal**

```
yarn add redwoodjs-stripe
yarn redwoodjs-stripe setup
yarn rw dev
```

Once the plugin is installed and set up navigate to [localhost:8910/stripe-demo](http://localhost:8910/stripe-demo) to see a working demo.

![an image of the demo store](https://github.com/chrisvdm/redwoodjs-stripe/blob/main/docs/img/demo-store.png?raw=true)

If you need a more complicated example then feel free to take a look at the [example store](https://github.com/redwoodjs/example-store-stripe) which demonstrates the plugin's user mapping.
