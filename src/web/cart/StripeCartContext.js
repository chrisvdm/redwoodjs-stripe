import { createContext } from 'react'
import { createStripeCartApi } from './createStripeCartApi'

export const StripeCartContext = createContext(createStripeCartApi([], () => null))