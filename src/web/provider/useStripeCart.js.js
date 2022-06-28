import { useContext } from 'react'
import { StripeContext } from './StripeContext'



export const useStripeCart = () => {
  const api = useContext(StripeContext)
  return api
}