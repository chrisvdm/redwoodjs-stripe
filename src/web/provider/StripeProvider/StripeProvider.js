import {
  useEffect,
  useState,
  useMemo,
} from 'react'

import { useStripeCustomerSearch } from '../../hooks'

import { createStripeApi } from '../createStripeApi'
import { StripeContext } from '../StripeContext'

export const StripeProvider = ({ children, customerQS = "" }) => {
  const [cart, setCart] = useState([])
  // const [qs, setQS] = useState(customerQS)
  const [customer, setCustomer] = useState()
  const { data: { stripeCustomerSearch }, refetch } = useStripeCustomerSearch(customerQS)
  // setCustomer(data.id)

  useEffect(() => {
    const { stripeCustomerSearch } = refetch(customerQS)
    setCustomer(stripeCustomerSearch)
  }, [customerQS])

  console.log("PROVIDER", customer)
  
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
