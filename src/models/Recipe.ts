import { type User } from './User'

export interface Recipe {
  id: string
  name: string
  img: string
  ingredients: string[]
  steps: string[]
  price: number
  time: number
  servings: number
  tags: string[]
  user: User['id']
}
