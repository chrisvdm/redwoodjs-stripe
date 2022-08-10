import {
  useEffect,
  useState,
  useMemo
} from 'react'

import { useStripeCustomerSearch } from '../../hooks'

import { createStripeApi } from '../createStripeApi'
import { StripeContext } from '../StripeContext'

export const StripeProvider = ({
  children,
  customer: {
    search = "",
    create = {}
  } }) => {
  const [cart, setCart] = useState([])
  const [stripeCustomer, setCustomer] = useState() 
  const { customerData, refetch } = useStripeCustomerSearch(search)
  
  useEffect(() => {
    if (typeof customerData !== "undefined" && Object.hasOwn(customerData, "stripeCustomerSearch")) {
      setCustomer(customerData.stripeCustomerSearch)
    }
  }, [customerData])

  useEffect(async () => {
    const results = await refetch(search, create)
    console.log(results)
    // setCustomer(stripeCustomerSearch)
  }, [search])
  
  // onMount fetch cart items from local storage
  // onMount fetch customer details from local storage
  useEffect(() => {
    const serializedCart = window.localStorage.getItem('stripeCart')
    if (serializedCart) {
      setCart(JSON.parse(serializedCart))
    }
  }, [])

  // sync Cart with localStorage
  useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem('stripeCart', JSON.stringify(cart))
    })
  }, [cart])

  // Only create new api obj when cart and stripeCustomer changes
  const api = useMemo(() => createStripeApi(cart, setCart, stripeCustomer), [cart, stripeCustomer])
  return (
    <StripeContext.Provider value={api}>
      {children}
    </StripeContext.Provider>
  )
}
