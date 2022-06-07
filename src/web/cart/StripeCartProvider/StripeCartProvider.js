import {
  useEffect,
  useState,
  useMemo,
} from 'react'

import { createStripeCartApi } from '../createStripeCartApi'
import { StripeCartContext } from '../StripeCartContext'

export const StripeCartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

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
  const api = useMemo(() => createStripeCartApi(cart, setCart), [cart])

  return (
    <StripeCartContext.Provider value={api}>
      {children}
    </StripeCartContext.Provider>
  )
}
