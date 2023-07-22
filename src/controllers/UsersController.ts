import axios from 'axios'
import type { User } from '@/models/User'

export default {
  getUsers(): Promise<any> {
    return axios.get<User[]>(`${import.meta.env.VITE_MOCKAPI_URL}/user`)
  },
  createUser(user: User): Promise<any> {
    return axios.post<User>(`${import.meta.env.VITE_MOCKAPI_URL}/user`, user)
  },
  updateUser(id: string, user: User): Promise<any> {
    return axios.put<User>(`${import.meta.env.VITE_MOCKAPI_URL}/user/${id}`, user)
  }
}
