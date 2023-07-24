import { type User } from './User'

export interface CartItem {
  id: string
  name: string
  img: string
  price: number
  user: User['id']
}
