
import {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback
} from 'react'

import { useStripeCustomerSearch } from '../../hooks'

import { createStripeApi } from '../createStripeApi'
import { StripeContext } from '../StripeContext'

export const StripeProvider = ({
  children,
  customer: {
    search = "",
    create = {}
  }
}) => {
  const [cart, setCart] = useState([])
  const [stripeCustomer, setCustomer] = useState(null)
  useStripeCustomerSearch(search, create, setCustomer)

  const whenCustomerResolved = useWatcher(stripeCustomer, isNotNull)

  const waitForCustomer = async () => {
    if (search !== '' && Object.keys(create).length > 0) {
      return await whenCustomerResolved()
    } else {
      return null
    }
  }
  
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