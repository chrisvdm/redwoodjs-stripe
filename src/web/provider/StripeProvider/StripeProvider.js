import {
  useEffect,
  useState,
  useMemo,
} from 'react'

import { createStripeApi } from '../createStripeApi'
import { StripeContext } from '../StripeContext'

export const StripeProvider = ({ children, customerRef = '' }) => {
  const [cart, setCart] = useState([])
  const [customer, setCustomer] = useState(customerRef)

  console.log("customerRef", customerRef)
  // onMount fetch cart items from local storage
  useEffect(() => {
    const serializedCart = window.localStorage.getItem('stripeCart')
    if (serializedCart) {
      setCart(JSON.parse(serializedCart))
    }
  }, [])

  // syncs state's cart with localStorage's cart
  useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem('stripeCart', JSON.stringify(cart))
    })
  }, [cart])

  // Only create new api obj when cart changes
  const api = useMemo(() => createStripeApi(cart, setCart, customer, setCustomer), [cart])

  return (
    <StripeContext.Provider value={api}>
      {children}
    </StripeContext.Provider>
  )
}
