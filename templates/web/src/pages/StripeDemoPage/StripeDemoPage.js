// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import './styles.css'

import {
  useStripeCart,
  useCheckoutHandler,
  StripeCartProvider,
  StripeButton,
} from 'redwoodjs-stripe/web'
import StripeProductsCell from 'src/components/StripeProductsCell/StripeProductsCell'

const StripeDemoPage = () => {
  const [isCartVisible, setCartVisibilty] = useState(true)

  const onCartButtonClick = () => {
    setCartVisibilty(!isCartVisible)
  }

  return (
    <>
      <StripeCartProvider>
        <MetaTags title="StripeCart" description="StripeCart page" />
        <header className="rws-page-header">
          <div className="rws-page-wrapper rws-flex--sb">
            <h1>Stripe Demo</h1>

            <StripeButton onClick={onCartButtonClick}>Cart</StripeButton>
            {isCartVisible && <StripeCart />}
          </div>
        </header>
        <main className="rws-page-wrapper">
          <h2>Products</h2>

          <StripeProductsCell
            params={{
              productParams: { active: true },
              priceParams: { type: 'one_time' },
            }}
          />
        </main>
      </StripeCartProvider>
    </>
  )
}

export default StripeDemoPage

const StripeCart = () => {
  const checkout = useCheckoutHandler()
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

  return (
    <ul className="rws-cart__list">
      {cart.map((item) => (
        <StripeCartItem key={`stripe-cart-item-${item.id}`} {...item} />
      ))}
      <li className="rws-flex--fs rws-cart__actions">
        <StripeButton onClick={onCheckoutButtonClick}>Checkout</StripeButton>
        <StripeButton onClick={onClearCartButtonClick}>Clear Cart</StripeButton>
      </li>
    </ul>
  )
}

const StripeCartItem = ({ name, price, quantity }) => {
  return (
    <li className="rws-cart__list__item">
      {name} {price} {quantity}
    </li>
  )
}
