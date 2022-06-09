import { useContext } from 'react'
import { StripeCartContext } from './StripeCartContext'



export const useStripeCart = () => {
  const api = useContext(StripeCartContext)
  return api
}