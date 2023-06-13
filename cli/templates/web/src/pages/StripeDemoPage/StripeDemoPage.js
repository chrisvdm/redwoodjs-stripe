// import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'

import './styles.css'

import {
  useStripeCart,
  useStripeCheckout,
  useStripeCustomerPortal,
  StripeProvider,
} from '@redwoodjs-stripe/web'

import { MetaTags } from '@redwoodjs/web'

import StripeItemsCell from 'src/components/StripeItemsCell/StripeItemsCell'

import { Icon } from './Icon'

const StripeDemoPage = () => {
  const [isCartVisible, setCartVisibilty] = useState(false)

  // This is a stub, unrelated to plugin, just to demo
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const onCartButtonClick = () => {
    setCartVisibilty(!isCartVisible)
  }

  const onLoggedInCheckboxChange = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  // Details for logged in User
  const authUser = {
    email: 'john@domain.com',
    name: 'John Smith',
  }

  return (
    <>
      {/* search uses a query string to search for a customer on Stripe */}
      <StripeProvider
        customer={{
          search: isLoggedIn ? `email: "${authUser.email}"` : '',
        }}
      >
        <MetaTags
          title="Stripe Demo"
          description="A demo page for the redwoodjs-stripe integration"
        />
        <div className="rws-page">
          <header className="rws-page__header">
            <div className="rws-page-wrapper rws-flex--sb">
              <div className="rws-header__text">
                <h1 className="rws-bg--pink">a Store</h1>
                <p>a redwoodjs-stripe demo</p>
              </div>
              <div className="rws-header__actions">
                <input
                  checked={isLoggedIn}
                  type="checkbox"
                  onChange={onLoggedInCheckboxChange}
                />
                {/* Redirects to Stripe Customer Portal */}
                <StripeCustomerPortalButton isLoggedIn={isLoggedIn} />
                {/* Toggles cart visibility */}
                <StripeCartButton
                  isCartVisible={isCartVisible}
                  onCartButtonClick={onCartButtonClick}
                />
              </div>

              {isCartVisible && <StripeCart />}
            </div>
          </header>
          <main className="rws-page-wrapper rws-page__main">
            <h3>Once-off Items</h3>
            <StripeItemsCell
              params={{
                productParams: { active: true },
                priceParams: { type: 'one_time' },
              }}
            />
            <h3>Subscriptions</h3>
            <StripeItemsCell
              params={{
                productParams: { active: true },
                priceParams: { type: 'recurring' },
              }}
            />
          </main>
          <PageFooter />
        </div>
      </StripeProvider>
    </>
  )
}

export default StripeDemoPage

const StripeCustomerPortalButton = ({ isLoggedIn }) => {
  const {
    redirectToStripeCustomerPortal,
    createStripeCustomerPortalConfig,
    defaultConfig,
  } = useStripeCustomerPortal()

  const onButtonClick = async () => {
    // Ideally you would have a default customer portal already set up on the Stripe Dashboard
    // This is here purely for the demo
    if (defaultConfig) {
      await redirectToStripeCustomerPortal(
        {
          return_url: 'http://localhost:8910/stripe-demo',
        },
        true
      )
    } else {
      // Best to create a new Customer Portal configuration this via Stripe Dashboard
      const config = await createStripeCustomerPortalConfig({
        business_profile: {
          headline: 'a Store is a demo store',
        },
        features: {
          customer_update: {
            enabled: true,
            allowed_updates: ['shipping', 'email', 'address', 'phone'],
          },
          invoice_history: {
            enabled: true,
          },
          subscription_cancel: {
            enabled: true,
            mode: 'immediately',
          },
          subscription_pause: {
            enabled: true,
          },
        },
      })
      await redirectToStripeCustomerPortal(
        {
          return_url: 'http://localhost:8910/stripe-demo',
          configuration: config.id,
        },
        true
      )
    }
  }
  return (
    isLoggedIn && (
      <button className="rws-button" onClick={onButtonClick}>
        <Icon name="user" />
      </button>
    )
  )
}

const StripeCartButton = ({ isCartVisible, onCartButtonClick }) => {
  return (
    <button
      className="rws-button"
      onClick={onCartButtonClick}
      data-active={isCartVisible}
    >
      <Icon name="cart" />
      <CartCounter />
    </button>
  )
}

const CartCounter = () => {
  const { cart } = useStripeCart()
  const count = cart.reduce((prev, cur) => prev + cur.quantity, 0)
  return count > 0 ? <span className="rws-cart-counter">{count}</span> : null
}

const StripeCart = () => {
  const { checkout } = useStripeCheckout()
  const { cart, clearCart } = useStripeCart()

  const onCheckoutButtonClick = async () => {
    await checkout({
      cart: cart,
      successUrl:
        'http://localhost:8910/stripe-demo?success=true&sessionId={CHECKOUT_SESSION_ID}',
      cancelUrl: 'http://localhost:8910/stripe-demo?success=false',
    })
  }

  const onClearCartButtonClick = () => {
    clearCart()
  }

  const totalPrice = cart.reduce(
    (prev, cur) => prev + cur.price * cur.quantity,
    0
  )

  return (
    <ul className="rws-cart__list">
      {cart.length === 0 && (
        <li className="rws-cart__list__item">
          <p>looks like you need to add things to your cart</p>
        </li>
      )}
      {cart.map((item) => (
        <StripeCartItem key={`stripe-cart-item-${item.id}`} {...item} />
      ))}
      {cart.length > 0 && (
        <>
          <li className="rws-cart__list__item--border">
            <p>
              total:{' '}
              {(totalPrice / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </li>

          <li className="rws-cart__actions ">
            <button
              className="rws-button--bordered"
              onClick={onCheckoutButtonClick}
            >
              Checkout
            </button>
            <button
              className="rws-button--bordered"
              onClick={onClearCartButtonClick}
            >
              Clear Cart
            </button>
          </li>
        </>
      )}
    </ul>
  )
}

const StripeCartItem = ({ name, price, quantity }) => {
  return (
    <li className="rws-cart__list__item">
      <p>{name}</p>
      <p>
        {(price / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </p>
      <p>qty: {quantity}</p>
    </li>
  )
}

const PageFooter = () => {
  return (
    <footer className="rws-page__footer">
      <p className="rws-page__footer__text">
        This demo is powered by{' '}
        <a
          alt="Learn more about Redwoodjs"
          href="http://redwoodjs.com/"
          target="_blank"
          rel="noreferrer"
        >
          Redwoodjs
        </a>{' '}
        and{' '}
        <a
          alt="Learn more about Stripe"
          target="_blank"
          href="https://stripe.com/"
          rel="noreferrer"
        >
          Stripe{' '}
        </a>
        | View the redwoodjs-stripe repository on{' '}
        <a
          alt="View repo on Github"
          target="_blank"
          href="https://github.com/chrisvdm/redwoodjs-stripe"
          rel="noreferrer"
        >
          Github
        </a>
      </p>
    </footer>
  )
}
