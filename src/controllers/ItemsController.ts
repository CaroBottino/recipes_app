import axios from 'axios'
import { type Item } from '@/models/Item'

export default {
  getItems(): Promise<any> {
    return axios.get<Item[]>(`${import.meta.env.VITE_MOCKAPI_URL}/items`)
  },
  getItemById(id: string): Promise<any> {
    return axios.get<Item>(`${import.meta.env.VITE_MOCKAPI_URL}/items/${id}`)
  },
  createItem(item: Item): Promise<any> {
    return axios.post<Item>(`${import.meta.env.VITE_MOCKAPI_URL}/items`, item)
  },
  updateItem(id: string, item: Item): Promise<any> {
    return axios.put<Item>(`${import.meta.env.VITE_MOCKAPI_URL}/items/${id}`, item)
  },
  deleteItem(id: string): Promise<any> {
    return axios.delete<any>(`${import.meta.env.VITE_MOCKAPI_URL}/items/${id}`)
  }
}
