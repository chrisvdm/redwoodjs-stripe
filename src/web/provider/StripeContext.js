import { createContext } from 'react'
import { createStripeApi } from './createStripeApi'

export const StripeContext = createContext(createStripeApi([], () => null))