# redwoodjs-stripe

A Redwood/Stripe integration made easy!

This plugin is being built with the support of the awesome people at [Redwood](https://redwoodjs.com/) and [Stripe](https://stripe.com/)


- [Installation](#installation)
- [Usage](#usage)
  - [Web-side API Reference](#api--web)
    - [StripeProvider](#api--stripe-provider)
    - [User mapping](#api--user-mapping)
    - [useStripeCheckout](#api--use-stripe-checkout)
    - [useStripeCart](#api--use-stripe-cart)
    - [useStripeCustomerPortal](#api--use-stripe-customer-portal)
    - [StripeItemsCell](#api--stripe-items-cell)
  - [Api-side API Reference](#api--api)
    - [Webhook handling](#api--webhook-handling)
    - [Services](#api--services)
    - [Schemas](#api--schemas)
- [Current Features](#features)
- [Current progress](#current-progress)
- [How you can help](#contribution)
- [Links](#links)

- [Thank you](#thank-you)


## Installation

<a name="installation"></a>Installation of the plugin involves a setup step which collects your Stripe API keys and integrates things.

**Preflight**

- [Stripe CLI](https://github.com/stripe/stripe-cli) for webhook integration
- [Stripe API keys](https://dashboard.stripe.com/dashboard) nearby

**In terminal**

```
yarn add redwoodjs-stripe
yarn redwoodjs-stripe setup
yarn rw dev
```

Once the plugin is installed and set up navigate to [localhost:8910/stripe-demo](http://localhost:8910/stripe-demo) to see a little demo of how to use the plugin

## Usage

<a name="installation"></a>The idea for this plugin was that after running a setup command you would receive all the boilerplate needed to build your own online store using Redwoodjs and Stripe and also provide you with a library to customise your store.

The plugin library is divided into a `web` side and an `api` side. You'd import methods from each _side_ depending on where you need them in your app ([RedwoodJS documentation](https://redwoodjs.com/docs/tutorial/chapter1/file-structure) on "sides"):

```js
// web-side
import { useStripeCheckout } from 'redwoodjs-stripe/web';

// app-side
import { createStripeCustomer } from 'redwoodjs-stripe/api';
```

### Web-side API Reference

<a name="api--web"></a>After setting up your app via the setup command, you'll see that a demo page has been added to your app. This is intended as an in-app API reference.

#### `<StripeProvider customer/>`

<a name="api--stripe-provider">Uses React context to manage the StripeCart, store customer data and contain the plugin logic on the web side.

There are two ways to use the `<StripeProvider/>`. The first would be to wrap it around your storefront component (Example 1). This would be fine for a single page store, however if you have a more complicated store then the second and preferred approach will be better (Example 2). The second and preferred way is to wrap the group of `<Routes/>` that will make up your store with the provider inside the `<Router/>` using `<Set/>`. You can find out more about the RedwoodJS Router in their [documentaion](https://redwoodjs.com/docs/router).

**Example 1**

Simple use case

```jsx
import { StripeProvider } from 'redwoodjs-stripe/web';

// ...

<StripeProvider
  customer={{
    search: isLoggedIn ? `email: "${emailFromAuth}"` : '',
  }}
>
  <Storefront />
</StripeProvider>;
```

**Example 2**

Routes.js 

```jsx
import { StripeProvider } from 'redwoodjs-stripe/web';

// ...
<Router>

 <Set
   wrap={StripeProvider}
   customer={{ search: isLoggedIn ? `email: "${emailFromAuth}"` : '' }}
 >
   <Route path="/category" page={CategoryPage} name="category" />
   <Route path="/product" page={ProductPage} name="product" />
   // ...
 </Set>
 
</Router>
```

#### User Mapping

<a name="api--user-mapping">User mapping is managed via the `customer` object passed to the `<StripeProvider/>`. 

`customer` has the following shape:

```ts
type Customer = {
  search: string | '';
  create: customer | {};
};
```

`search` accepts a [Search API query](https://stripe.com/docs/search#search-query-language) that is used to search for a Stripe Customer. The idea is to use data of your authenticated user to build the search query. In most cases your authentication provider will provide you with an email address that you will be able to use to map to a Stripe Customer.

`create` accepts a [Stripe Customer](https://stripe.com/docs/api/customers/create) object that uses the authenticated user data to create a new **Stripe Customer** if the authenticated user is not already a Stripe Customer.

**Example**

```js

import { StripeProvider } from 'redwoodjs-stripe/web'

// ...

const { authUser } = useAuthentication()

// ...

 <Set
   wrap={StripeProvider}
   customer={{ 
     search: isLoggedIn ? `email: "${authUser.email}"` : '',
     create: {
       email: authUser.email,
       name: authUser.name
     }
   }}
 >
   <Route path="/category" page={CategoryPage} name="category" />
   <Route path="/product" page={ProductPage} name="product" />
   
   // ...
   
 </Set>
```

#### `useStripeCheckout()`

<a name="api--use-stripe-checkout"></a>Hook to redirect to Stripe's hosted [Checkout](https://stripe.com/docs/payments/checkout).

Returns an object containing a [`checkout`](#api--use-stripe-checkout--checkout) function. See the comments in the example below for more information on its usage.

**Example**

```js
import { useStripeCheckout } from 'redwoodjs-stripe/web';

// ...

const { checkout } = useStripeCheckout();
```

##### `checkout(session)`

<a name="api--use-stripe-checkout--checkout"></a>Creates a [Stripe Checkout Session](https://stripe.com/docs/api/checkout/sessions/create) and redirects to the Stripe Checkout page.

```js
await checkout({
  successUrl:
    'http://localhost:8910/stripe-demo?success=true&sessionId={CHECKOUT_SESSION_ID}',
  cancelUrl: 'http://localhost:8910/stripe-demo?success=false',
});
```

`session` has the following shape:

```ts
type Session = {
  mode?: string; // optional if cart items have 'type' as part their objects, else defaults to 'once-off'
  cart?: Product[]; // 'cart' is not required when using built-in cart
  cancelUrl: string;
  successUrl: string;
};
```

#### `useStripeCart()`

<a name="api--use-stripe-cart"></a>Hook to manage the Stripe Cart. Returns an object with the cart api (described below).

**Example**

```js
import { useStripeCart } from 'redwoodjs-stripe/web';
// ...
const { cart, clearCart, addToCart, removeFromCart, editCartItem } =
  useStripeCart();
```

#### Cart API

<a name="api--use-stripe-cart--cart"></a>

##### `cart`

An array of `StripeItem` objects. Each item in the array has the following shape:

```ts
type StripeItem = {
  id: string;
  name?: string;
  images?: string[];
  description?: string;
  price?: number;
  type?: string;
};
```

Each object _must_ contain an `id`. This `id` corresponds to the StripePrice's `id` when using the generated [`StripeProductsCell`](#api--stripe-products-cell).

If you're checking out with both recurring and once-off items, `type` needs to be included in the object.

##### `clearCart()`

Removes all items from `cart`.

##### `addToCart(product)`

Adds a `Product` to the `cart`.

```js
addToCart({
  id: 'price_12345',
  // ...
});
```

##### `removeFromCart(id)`

Removes an item from the `cart` via the item's `id`.

```js
removeFromCart('price_12345');
```

##### `editCartItem(id, details)`

Edits the cart item. For example, to change the `quantity`:

```js
editCartItem('price_12345', { quantity: 4 });
```

`details` has the following shape:

```ts
type Details = {
  quantity?: number;
};
```

#### `useStripeCustomerPortal()`

<a name="api--use-stripe-customer-portal"></a>Hook for [Stripe's Customer Portal](https://stripe.com/docs/billing/subscriptions/integrating-customer-portal) logic. Requires a customer search query to have been passed to the [`<StripeProvider/>`](#api--stripe-provider). In other words, an authenticated user.

Returns an object containing a `redirectToStripeCustomerPortal` function.

```js
import { useStripeCustomerPortal } from 'redwoodjs-stripe/web';
// ...
const { redirectToStripeCustomerPortal } = useStripeCustomerPortal();
```

##### `redirectToStripeCustomerPortal(portalSession, skipAuth = false)`

Creates a Stripe Customer Portal Session and redirects to Stripe's Customer Portal page.

```js
await redirectToStripeCustomerPortal(
  {
    return_url: 'http://localhost:8910/stripe-demo',
  },
  true
);
```

`portalSession` has the following shape ([Stripe Customer Portal API reference](https://stripe.com/docs/api/customer_portal/sessions/create)):

```ts
type PortalSession = {
  configuration?: config;
  locale?: string;
  on_behalf_of?: string;
  return_url: string;
};
```

Set the second parameter, `skipAuth`, to `true` when testing the Customer Portal redirect if you have not yet set up user authentication in your app. Once authentication is set up please remove the argument.

##### `createStripeCustomerPortalConfig(portalConfig)`

Creates a [Customer Portal Configuration](https://stripe.com/docs/api/customer_portal/configuration) object.

````js

```ts
type PortalConfig = {
  // TODO
}
````

#### `<StripeItemsCell params={priceParams, productParams}/>`

<a name="api--stripe-items-cell"></a>As part of the setup process, a `<StripeProductsCell/>` gets generated inside of your app's `components` folder.

This [Cell](https://redwoodjs.com/docs/cells) returns a list of StripeItems unique to this plugin. It uses a combination of data from [Stripe Prices](https://stripe.com/docs/api/prices) and [Stripe Products](https://stripe.com/docs/api/products). The data is combined as follows:

```js
{
  id: stripePrice.id,
  name: stripeProduct.name,
  description: stripeProduct.description,
  images: stripeProduct.images,
  price: stripePrice.unit_amount,
  type: stripePrice.type,
}
```

The `params` passed to the Cell are the same parameters that would be passed to Stripe's Products and Prices list functions. The following example shows how to get a list of Products from `active` Stripe Products that have `recurring` Stripe Prices. In other words, this example shows a Cell that returns a list of active subscriptions.

```js
import StripeItemsCell from 'src/components/StripeItemsCell/StripeItemsCell';

// ...

<StripeItemsCell
  params={{
    productParams: { active: true },
    priceParams: { type: 'recurring' },
  }}
/>;
```

`priceParams` has the following shape (for more information, look at the [Stripe Price list API documentation](https://stripe.com/docs/api/prices/list))

```ts
type PriceParams = {
  active?: boolean;
  currency?: string;
  product?: string;
  created?: stripeCreated;
  ending_before?: string;
  limit?: number;
  lookup_keys?: string;
  recurring?: stripeRecurringPrice;
  starting_after?: string;
  type?: string;
};
```

`productParams` has the following shape (for more information, look at the [Stripe Products list API documentation](https://stripe.com/docs/api/products/list))

```ts
type ProductParams = {
  active?: boolean;
  created?: stripeCreated;
  ending_before?: string;
  ids?: string[];
  limit?: number;
  shippable?: boolean;
  starting_after?: string;
  url?: string;
};
```

The Cell has it's own UI for illustrative purpose. You should replace the UI with your own.

### Api-side API Reference

<a name="api--api"></a>

#### Webhook handling

<a name="api--webhook-handling"></a>As part of the setup process, a `/stripeWebhook` function is generated. It uses the plugin handler function to verify and manage webhook events.

##### `handleStripeWebhooks(event, context, webhookObject, verify = false)`

<a name="api--handle-stripe-webhooks"></a>This function verifies and manages [Stripe webhook events](https://stripe.com/docs/webhooks/stripe-events).

```js
import { handleStripeWebhooks } from 'redwoodjs-stripe';
// ...
const { results } = await handleStripeWebhooks(event, context, {
  'customer.updated': async (e) => {
    updateUser(e);
  },
  'payment_intent.succeeded': (e) => {
    sendCustomerThankYouEmail(e);
  },
});
```

`webhookObject` is an object mapping [webhook event names](https://stripe.com/docs/api/events/types) to handler functions. Each handler function accepts the relevant [event object](https://stripe.com/docs/api/events/object) as input.

[webhook signature verification](https://stripe.com/docs/webhooks/signatures) is enabled by default, and can be disabled by providing `false` for the `verify` parameter.

##### Installing Stripe CLI

<a name="api--installion-stripe-cli"></a>To use webhooks and Stripe webhook events, we recommend installing the [Stripe CLI](https://github.com/stripe/stripe-cli).

After logging in you'll be given a webhook secret. Make sure it matches the `STRIPE_WEBHOOK_SK` key in your `.env` file

##### Testing Stripe webhooks locally

<a name="api--testing-stripe-webhooks"></a>

1. Listen for webhook events locally

`stripe listen --forward-to localhost:8911/stripeWebhook`

> If you'd prefer to use snakecase, then you can just change `api/src/functions/stripeWebhook/stripeWebhook.js` to `api/src/functions/stripe_webhook/stripe_webhook.js` and the other files in that folder

2. Trigger webhook events locally via the CLI

`stripe trigger customer.updated`

#### Services

<a name="api--services"></a>Services used in the plugin can also be imported into your project to build custom Services for more-complicated use cases.

##### `createStripeCheckoutSession(session)`

Creates a Stripe Checkout Session and returns a Session object.

```js
import { createStripeCheckoutSession } from 'redwoodjs-stripe/api';
// ...
const newSession = await createStripeCheckoutSession({
  mode: 'payment',
  cart: cartItems,
});
```

`session` has the following shape:

```ts
type Session = {
  customer?: Customer = {};
  mode: string;
  cart: CartItem[];
  successUrl: string = 'http://localhost:8910/stripe-demo?success=true&sessionId={CHECKOUT_SESSION_ID}';
  cancelUrl: string = 'http://localhost:8910/stripe-demo?success=false';
};

type Customer = {
  id: string;
  name?: string;
  email?: string;
};

type CartItem = {
  id: string;
  quantity: number;
};
```

##### `searchLatestStripeCustomer(string)`

Accepts a [Search API query](https://stripe.com/docs/search#search-query-language) and returns the Customer object of the last created Customer that matches the search query.

```js
import { searchLatestStripeCustomer } from 'redwoodjs-stripe/api';
// ...
const customer = await searchLatestStripeCustomer('email: "user@test.com"');
```

##### `createStripeCustomer(customer)`

Accepts an object with data to create a new Stripe customer and returns the newly created Stripe Customer object.

```js
import { createStripeCustomer } from 'redwoodjs-stripe/api';
// ...
const customer = await createStripeCustomer({ email });
```


#### Schemas

<a name="api--schemas"></a>Schemas are imported from the plugin. You can view the sdl files [here](https://github.com/chrisvdm/redwoodjs-stripe/tree/main/src/api/schemas). Although I tried to have the sdls match the [Stripe objects](https://stripe.com/docs/api), there may be times you need something more. For that reason my sdl files follow a naming convention so that you can add your own custom Stripe sdl files without there being a conflict.

The following Stripe API objects have sdl files:

- [Customers](https://stripe.com/docs/api/customers)
- [Subscriptions](https://stripe.com/docs/api/subscriptions)
- [Customer Portal](https://stripe.com/docs/api/customer_portal)
- [Payment Methods](https://stripe.com/docs/api/payment_methods)
- [Coupons](https://stripe.com/docs/api/coupons)
- [Discounts](https://stripe.com/docs/api/discounts)

## Current Features

<a name="features"></a>

- Subscription payments with Stripe Checkout
  - Customer Portal creation
- Once-off payments with Stripe Checkout
- Webhook handling
- LoFi Cart
- Demo store as in-app API reference

## Current progress

<a name="current-progress"></a>You can take a look at the [Roadmap](https://github.com/chrisvdm/redwoodjs-stripe/issues/1) for this project for more details and a rough timeline. For a quick status update look below.

**STATUS:** Release Candidate!!!

**ETA** August 2022 🤞

## How you can help

<a name="contribution"></a>

- Try out this release and give [feedback](https://github.com/chrisvdm/redwoodjs-stripe/discussions/60)
- Help maintain the [Redwoodjs-stripe-example-store repo](https://github.com/redwoodjs/example-store)
- Send good vibes :)

## Useful Links

<a name="links"></a>

- [Stripe + Redwood Integration package discusson](https://community.redwoodjs.com/t/stripe-redwood-integration-package/2226) in the Redwood forum
- [Stripe + Redwood Integration Proof of Concept Repo](https://github.com/redwoodjs/payments) (work in progress)
- [Stripe + Redwood example store](https://github.com/redwoodjs/example-store) using Redwood and Stripe (open to contributors)
- [Roadmap](https://github.com/chrisvdm/redwoodjs-stripe/issues/1)
- [Sandbox](https://github.com/chrisvdm/test-app) a sandbox app for testing plugin integration before putting in the example store


## Thank you

<a name="thank-you"></a>

The teams from [Stripe](https://stripe.com/) and [RedwoodJS](https://redwoodjs.com/) who have supported this project from day one.

Everybody else who contributed in code, pep talks and every other way!
