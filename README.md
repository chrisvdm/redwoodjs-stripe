# redwoodjs-stripe

A Redwood/Stripe integration made easy!

This package is being built with the support of the awesome people at [Redwood](https://redwoodjs.com/) and [Stripe](https://stripe.com/)

###  Try it out

There's a very unstable version of the plugin available to try out. It's held together with spit and wishful. It's to give future users a taste of things to come.

**Prerequisites**

A stripe account (preferably in test mode)

[Stripe CLI](https://stripe.com/docs/stripe-cli) installed (if you want to play with webhooks)

**Steps**
1. Create a fresh Redwood app

`yarn create redwood-app myDemo`

`cd myDemo`

2. Install the plugin

`yarn add redwoodjs-stripe`

3. Setup the plugin and follow the prompts

`yarn redwoodjs-stripe setup`

4. Start up your app and then navigate to [localhost:8910/stripe-demo](http://localhost:8910/stripe-demo)

`yarn rw dev`

> **Note**
>
> The following steps won't be needed for much longer

5. Checkout a subscription item using "user@test.com" as the email.

6. Configure Customer Portal in the [Stripe Dashboard](https://dashboard.stripe.com/subscriptions) 

7. Play around!

## Web-side API Reference

After setting up your app via the setup command, you'll see that a demo page has been added to your app. This is intended as an in-app API reference—I'm assuming you would want your commerce project to look a different.

### `<StripeProvider customer/>`

Uses React context to manage the StripeCart, store customer data and contain the plugin logic on the web side.

**Example 1**

```jsx
import { StripeProvider } from 'redwoodjs-stripe/web'

// ...

 <StripeProvider
        customer={{
          search: isLoggedIn ? `email: "${emailFromAuth}"` : '',
        }}
      >
        <Storefront/>
  </StripeProvider>
```

**Example 2**

Routes.js
```jsx
import { StripeProvider } from 'redwoodjs-stripe/web'

// ...

<Set wrap={StripeProvider} customer={{search: isLoggedIn ? `email: "${emailFromAuth}"` : ''}}>
  <Route path="/category" page={CategoryPage} name="category" />
  <Route path="/product" page={ProductPage} name="product" />
  // ...
</Set>
```

`customer` has the following shape:
```ts
type Customer = {
  search: string | ''
}
```
`search` accepts a [querystring](https://stripe.com/docs/search#search-query-language) that is used to search for a Stripe Customer. The idea is to use data of your authenticated user to build the querystring. In most cases your authentication provider will provide you with an email address that you will be able to use to map to a Stripe Customer.

### `useStripeCheckout()`

Hook to redirect to Stripe's hosted [Checkout](https://stripe.com/docs/payments/checkout). 

Returns a `checkout` function. See the comments in the example below for more information on its usage.

**Example**

```js
import { useStripeCheckout } from 'redwoodjs-stripe/web'

// ...

const checkout = useStripeCheckout()
```

#### `checkout(session)`

Creates a Stripe Checkout Session and redirects to the Stripe Checkout page.

```js
  await checkout({
    successUrl: 'http://localhost:8910/stripe-demo?success=true&sessionId={CHECKOUT_SESSION_ID}',
    cancelUrl: 'http://localhost:8910/stripe-demo?success=false'
  })
 ```
 
`session` has the following shape:

```ts
type Session = {
  mode?: string       // optional if cart items have 'type' as part their objects, else defaults to 'once-off'
  cart?: Product[]    // 'cart' is not required when using built-in cart
  cancelUrl: string
  successUrl: string
}
```

### `useStripeCart()`

Hook to manage the Stripe Cart. Returns an object with the cart api (described below).

**Example**
```js
import { useStripeCart } from 'redwoodjs-stripe/web'
// ...
const { 
  cart, 
  clearCart, 
  addToCart, 
  removeFromCart, 
  editCartItem
} = useStripeCart()
```

### Cart API

#### `cart`

An array of Product objects. Each `product` has the following shape:

```ts
type Product = {
  id: string
  name?: string
  images?: string[]
  description?: string
  price?: number
  type?: string
}
```

Each object _must_ contain an `id`. This `id` corresponds to the StripePrice's `id` when using the generated StripeProductsCell.

If you're checking out with both recurring and once-off items, `type` needs to be included in the object.

#### `clearCart()`

Removes all items from `cart`.

#### `addToCart(product)`

Adds a `Product` to the `cart`. 

```js
addToCart({
  id: 'price_12345',
  // ...
})
```

#### `removeFromCart(id)`

Removes an item from the `cart` via the item's `id`.

```js
removeFromCart('price_12345')
```

#### `editCartItem(id, details)`

Edits the cart item. For example, to change the `quantity`:

```js
editCartItem('price_12345', { quantity: 4 })
```

`details` has the following shape:

```ts
type Details = {
  quantity?: number
}
```

### `useStripeCustomerPortal()`

Hook for [Stripe's Customer Portal](https://stripe.com/docs/billing/subscriptions/integrating-customer-portal) logic. Requires a customer query string to have been passed to the `<StripeProvider/>`. In other words, an authenticated user. 

Returns a `redirectToStripeCustomerPortal` function. 

```js
import { useStripeCustomerPortal } from 'redwoodjs-stripe/web'
// ...
const { redirectToStripeCustomerPortal } = useStripeCustomerPortal()
```

#### `redirectToStripeCustomerPortal(portalSession, skipAuth = false)`

Creates a Stripe Customer Portal Session and redirects to Stripe's Customer Portal page.

```js
await redirectToStripeCustomerPortal(
  {
    return_url: 'http://localhost:8910/stripe-demo',
  },
  true
)
```

`portalSession` has the following shape ([Stripe Customer Portal API reference](https://stripe.com/docs/api/customer_portal/sessions/create)):

```ts
type PortalSession = {
  configuration?: config
  locale?: string
  on_behalf_of?: string
  return_url: string
}
```

Set the second parameter, `skipAuth`, to `true` when testing the Customer Portal redirect if you have not yet set up user authentication in your app. Once authentication is set up please remove the argument.

#### `createStripeCustomerPortalConfig(portalConfig)`

Creates a [Customer Portal Configuration](https://stripe.com/docs/api/customer_portal/configuration) object.

```js

```ts
type PortalConfig = {
  // TODO
}
```

### `<StripeProductsCell params={priceParams, productParams}/>`

As part of the setup process, a `<StripeProductsCell/>` gets generated inside of your app's `components` folder. 

This [Cell](https://redwoodjs.com/docs/cells) returns a list of Products unique to this plugin. It uses a combination of data from [Stripe Prices](https://stripe.com/docs/api/prices) and [Stripe Products](https://stripe.com/docs/api/products). The data is combined as follows: 
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
import StripeProductsCell from 'src/components/StripeProductsCell/StripeProductsCell'

// ...

<StripeProductsCell
  params={{
    productParams: { active: true },
    priceParams: { type: 'recurring' },
  }}
/>
```

`priceParams` has the following shape (for more information, look at the [Stripe Price list API documentation](https://stripe.com/docs/api/prices/list))

```ts
type priceParams = {
  active?: boolean
  currency?: string
  product?: string
  created?: stripeCreated
  ending_before?: string
  limit?: number
  lookup_keys?: string
  recurring?: stripeRecurringPrice
  starting_after?: string
  type?: string
}
```

`productParams` has the following shape (for more information, look at the [Stripe Products list API documentation](https://stripe.com/docs/api/products/list))

```ts
type productParams = {
  active?: boolean
  created?: stripeCreated
  ending_before?: string
  ids?: string[]
  limit?: number
  shippable?: boolean
  starting_after?: string
  url?: string
}
```

The Cell has it's own UI for illustrative purpose. You should replace the UI with your own.

## Api-side API Reference

### Webhook handling

As part of the setup process, a `/stripeWebhook` function is generated. It uses the plugin handler function to verify and manage webhook events.

#### `handleStripeWebhooks(event, context, webhookObject[, verify])`

This function verifies and manages Stripe webhook events. `webhookObj` is an object of

```js
import { handleStripeWebhooks } from 'redwoodjs-stripe'
// ...
const { results } = await handleStripeWebhooks(
    event,
    context,
    {
      'customer.updated': async (e) => {
        updateUser(e)
      },
      'payment_intent.succeeded': (e) => {
        sendCustomerThankYouEmail(e)
      },
    }
  )
```

#### Installing Stripe CLI

To use webhooks and Stripe webhook events, we recommend installing the [Stripe CLI](https://stripe.com/docs/cli). You can follow the instructions below if you're using homebrew; otherwise, follow [Stripe's installation guide](https://stripe.com/docs/stripe-cli#install).

`brew install stripe/stripe-cli/stripe`

Then, log in to your Stripe account

`stripe login`

You'll be given a webhook secret. Make sure it matches the `STRIPE_WEBHOOK_KEY` key in your `.env` file

#### Testing Stripe webhooks locally

1. Listen for webhook events locally

`stripe listen --forward-to localhost:8911/stripeWebhook`

2. Trigger webhook events locally via the CLI

`stripe trigger customer.updated`

### Services

Services used in the plugin can also be imported into your project to build custom Services for more-complicated use cases.

#### `createStripeCheckoutSession(session)`

Creates a Stripe Checkout Session and returns a Session object.

```js
import { createStripeCheckoutSession } from 'redwoodjs-stripe/api'
// ...
const newSession = await createStripeCheckoutSession({
  mode: 'payment',
  cart: cartItems
})
```

`session` has the following shape:

```ts
type Session = {
 customer?: Customer = {}
 mode: string
 cart: CartItem[]
 successUrl: string = "http://localhost:8910/stripe-demo?success=true&sessionId={CHECKOUT_SESSION_ID}"
 cancelUrl: string = "http://localhost:8910/stripe-demo?success=false"
}

type Customer = {
  id: string
  name?: string
  email?: string
}

type CartItem = {
  id: string
  quantity: number
}
```

#### `searchLatestStripeCustomer(string)`

Accepts a [querystring](https://stripe.com/docs/search#search-query-language) and returns the Customer object of the last created Customer that matches the querystring.

```js
import { searchLatestStripeCustomer } from 'redwoodjs-stripe/api'
// ...
const customer = searchLatestStripeCustomer('email: "user@test.com"')
```

### Schemas

Schemas are imported from the plugin. You can view the sdl files [here](https://github.com/chrisvdm/redwoodjs-stripe/tree/main/src/api/schemas). Although I tried to have the sdls match the [Stripe objects](https://stripe.com/docs/api), there may be times you need something more. For that reason my sdl files follow a naming convention so that you can add your own custom Stripe sdl files without there being a conflict. 

The following Stripe API objects have sdl files: 
- [Customers](https://stripe.com/docs/api/customers)
- [Subscriptions](https://stripe.com/docs/api/subscriptions)
- [Customer Portal](https://stripe.com/docs/api/customer_portal)
- [Payment Methods](https://stripe.com/docs/api/payment_methods)
- [Coupons](https://stripe.com/docs/api/coupons)
- [Discounts](https://stripe.com/docs/api/discounts)




## Current progress
 
You can take a look at the [Roadmap](https://github.com/chrisvdm/redwoodjs-stripe/issues/1) for this project for more details and a rough timeline. For a quick status update look below. 

**STATUS:** Documentation 📖 + bug squashing 🪳🔨

**ETA** August 2022 🤞

## How you can help
- Try out this very unstable release and give [feedback](https://github.com/chrisvdm/redwoodjs-stripe/discussions/60)
- Help maintain the [Redwoodjs-stripe-example-store repo](https://github.com/redwoodjs/example-store)
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

## Thank you

The teams from [Stripe](https://stripe.com/) and [RedwoodJS](https://redwoodjs.com/) who have supported this project from day one.


