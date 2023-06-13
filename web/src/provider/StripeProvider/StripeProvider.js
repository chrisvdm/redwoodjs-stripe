
import {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback
} from 'react'

import { useStripeCustomerFetch } from '../../hooks'

import { createStripeApi } from '../createStripeApi'
import { StripeContext } from '../StripeContext'

export const StripeProvider = ({
  children,
  customer = {
    id : "",
    search : ""
  }
}) => {
  const [cart, setCart] = useState([])
  const [stripeCustomer, setCustomer] = useState(null)
  const { id = '', search = '' } = customer

  // Fetches Stripe Customer object 
  useStripeCustomerFetch(id, search, setCustomer)

  // Returns a fn that returns a promise when stripeCustomer is null
  // else returns resolved stripeCustomer value
  const whenCustomerResolved = useWatcher(stripeCustomer, isNotNull)

  const waitForCustomer = async () => {
    // Check that we have what we need to either fetch(search) for and create a Stripe Customer
    if (search !== '' && Object.keys(create).length > 0) {
      // Wait for stripeCustomer to have a value and return value
      return await whenCustomerResolved()
    } else {
      return null
    }
  }
  
  // onMount fetch cart items from local storage
  useEffect(() => {
    let ignore = false
    const serializedCart = window.localStorage.getItem('stripeCart')
    if (serializedCart) {
      setCart(JSON.parse(serializedCart))
    }
    return () => {
      ignore = true
    }
  }, [])

  // sync Cart with localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.localStorage.setItem('stripeCart', JSON.stringify(cart))
    })

    return () => {
      clearTimeout(timeoutId)
    }
  }, [cart])

  // Only create new api obj when cart and stripeCustomer changes
  const api = useMemo(() => createStripeApi(cart, setCart, stripeCustomer, waitForCustomer), [cart, stripeCustomer])
  return (
    <StripeContext.Provider value={api}>
      {children}
    </StripeContext.Provider>
  )
}

const isNotNull = value => value !== null

const useWatcher = (value, predicateFn) => {
  const isConditionMet = predicateFn(value)
  const deferredRef = useRef(createDeferred())

  useEffect(() => {
    if (isConditionMet) {
      deferredRef.current.resolve(value)
      deferredRef.current = createDeferred()
    }
  }, [value, isConditionMet])

  return useCallback(async () => {
    if (isConditionMet) {
      return value
    } else {
      return await deferredRef.current.promise
    }
  }, [value, isConditionMet])
}

const createDeferred = () => {
  const deferred = {}

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })

  return deferred
}