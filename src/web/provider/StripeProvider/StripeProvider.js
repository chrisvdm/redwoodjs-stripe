import {
  useEffect,
  useState,
  useMemo,
} from 'react'

import { useStripeCustomerSearch } from '../../hooks'

import { createStripeApi } from '../createStripeApi'
import { StripeContext } from '../StripeContext'

export const StripeProvider = ({
  children,
  customer: {
    search = ""
  } }) => {
  const [cart, setCart] = useState([])
  const [stripeCustomer, setCustomer] = useState({})
  const { data, refetch } = useStripeCustomerSearch(search)
  
  useEffect(() => {
    if (typeof data !== "undefined" && Object.hasOwn(data, "stripeCustomerSearch")) {
      console.log(data.stripeCustomerSearch)
      setCustomer(data.stripeCustomerSearch)
    }
  }, [data])

  useEffect(() => {
    const { stripeCustomerSearch } = refetch(search)
    setCustomer(stripeCustomerSearch)
  }, [search])
  
  // onMount fetch cart items from local storage
  // onMount fetch customer details from local storage
  useEffect(() => {
    const serializedCart = window.localStorage.getItem('stripeCart')
    if (serializedCart) {
      setCart(JSON.parse(serializedCart))
    }
  }, [])

  // sync with localStorage
  useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem('stripeCart', JSON.stringify(cart))
    })
  }, [cart])

  useEffect(() => {
     setTimeout(() => {
      window.localStorage.setItem('stripeCustomer', JSON.stringify(stripeCustomer))
    })
  }, [stripeCustomer])

  // Only create new api obj when cart changes
  const api = useMemo(() => createStripeApi(cart, setCart, stripeCustomer), [cart, stripeCustomer])
  return (
    <StripeContext.Provider value={api}>
      {children}
    </StripeContext.Provider>
  )
}
