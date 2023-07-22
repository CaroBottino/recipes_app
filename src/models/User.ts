import type { CartItem } from './CartItem'
import type { Recipe } from './Recipe'

export interface User {
  id: string
  fullname: string
  avatar: string
  email: string
  pass: string
  role: string
  cart: CartItem[]
  bought: Recipe[]
}
