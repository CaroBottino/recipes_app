import { type CartItem } from './CartItem'

export interface User {
  id: string
  fullname: string
  email: string
  pass: string
  role: string
  cart: CartItem[]
}
