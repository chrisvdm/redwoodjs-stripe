import {
  useEffect,
  useState,
  useMemo,
} from 'react'

import { useStripeCustomerSearch, useStripeCustomerCreate } from '../../hooks'

import { createStripeApi } from '../createStripeApi'
import { StripeContext } from '../StripeContext'

export const StripeProvider = ({
  children,
  customer: {
    search = "",
    create = {}
  } }) => {
  const [cart, setCart] = useState([])
  const [user, setCustomer] = useState({})
  const { data, refetch } = useStripeCustomerSearch(search)
  const createStripeCustomer = useStripeCustomerCreate()

  // const customerCheck = (returnedCustomer) => {
  //   if (!returnedCustomer) {
  //     const newCustomer = createStripeCustomer(create)

  //   }
  // }
  
  useEffect(() => {
    if (typeof data !== "undefined" && Object.hasOwn(data, "stripeCustomerSearch")) {
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
    const serializedCustomer = window.localStorage.getItem('stripeCustomer')
    if (serializedCart) {
      setCart(JSON.parse(serializedCart))
      setCustomer(JSON.parse(serializedCustomer))
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
      window.localStorage.setItem('stripeCustomer', JSON.stringify(user))
    })
  }, [user])

  // Only create new api obj when cart changes
  const api = useMemo(() => createStripeApi(cart, setCart, user), [cart])
  return (
    <StripeContext.Provider value={api}>
      {children}
    </StripeContext.Provider>
  )
}
