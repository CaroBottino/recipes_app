import axios from 'axios'
import { type Recipe } from '@/models/Recipe'

export default {
  getRecipes(): Promise<any> {
    return axios.get<Recipe[]>(`${import.meta.env.VITE_MOCKAPI_URL}/recipes`)
  },
  getRecipeById(id: string): Promise<any> {
    return axios.get<Recipe>(`${import.meta.env.VITE_MOCKAPI_URL}/recipes/${id}`)
  },
  createRecipe(recipe: Recipe): Promise<any> {
    return axios.post<Recipe>(`${import.meta.env.VITE_MOCKAPI_URL}/recipes`, recipe)
  },
  updateRecipe(id: string, recipe: Recipe): Promise<any> {
    return axios.put<Recipe>(`${import.meta.env.VITE_MOCKAPI_URL}/recipes/${id}`, recipe)
  },
  deleteRecipe(id: string): Promise<any> {
    return axios.delete<any>(`${import.meta.env.VITE_MOCKAPI_URL}/recipes/${id}`)
  }
}
