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

_The following steps won't be needed for much longer_

5. Checkout a subscription item using "user@test.com" as email.

6. Configure Customer Portal in the [Stripe Dashboard](https://dashboard.stripe.com/subscriptions) 

7. Play around!

## API Reference

After setting up your app via the CLI, you'll find a demo page has been added to your app. This is intended as an in-app API reference, though in proper store it might a little different. 

### `<StripeProvider customer/>`

Uses a provider to manage the StripeCart, store customer data and contain the plugin logic on the web side.

**Example 1**

```js
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
```js
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

Hook to redirect to Stripe-hosted Checkout. 

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
    successUrl:
        'http://localhost:8910/stripe-demo?success=true&sessionId={CHECKOUT_SESSION_ID}',
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

When checking out with both recurring and once-off items then `type` needs to be included in the object.

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

Removes an item from the `cart` via the item `id`.

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

Hook for [Stripe's Customer Portal](https://stripe.com/docs/billing/subscriptions/integrating-customer-portal) logic. Requires a customer query string to have been passed to the `<StripeProvider/>`, in other words an authenticated user. 

Returns a `redirectToStripeCustomerPortal` function. 

```js
import { useStripeCustomerPortal } from 'redwoodjs-stripe/web'
// ...
const redirectToStripeCustomerPortal = useStripeCustomerPortal()
```

#### `redirectToStripeCustomerPortal(portalSession)`

Creates a Stripe Customer Portal Session and redirects to Stripe's Customer Portal page.

```js
await redirectToStripeCustomerPortal({
      return_url: 'http://localhost:8910/stripe-demo',
    })
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
  ids?: [string]
  limit?: number
  shippable?: boolean
  starting_after?: string
  url?: string
}
```

The Cell has it's own UI for illustrative purpose. You should replace the UI with your own.

## Current progress
 
You can take a look at the [Roadmap](https://github.com/chrisvdm/redwoodjs-stripe/issues/1) for this project for more details and a rough timeline. For a quick status update look below. 

**STATUS:** Building MVP

**ETA** August 2022 🤞

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




