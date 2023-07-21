import { type User } from './User'

export interface Item {
  id: string
  name: string
  img: string
  price: number
  desc: string
  stock: number
  user: User['id']
}
