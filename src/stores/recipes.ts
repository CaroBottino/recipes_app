import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { AxiosError } from 'axios'
import type { Recipe } from '@/models/Recipe'
import RecipesController from '@/controllers/RecipesController'

export const useRecipesStore = defineStore('recipes', () => {
  const state = reactive({ recipes: <Recipe[]>[] })

  const getRecipes = computed(() => state.recipes)

  function getRecipesByUser(userId: string) {
    return state.recipes.filter((recipe) => recipe.user === userId)
  }

  function getRecipeById(id: string) {
    return state.recipes.find((recipe) => recipe.id === id)
  }

  const getRecipesFromApi = (): Promise<boolean | AxiosError> => {
    return RecipesController.getRecipes()
      .then((res) => {
        state.recipes = res.data
        return true
      })
      .catch((err: AxiosError) => {
        return err
      })
  }

  const createRecipe = (recipe: Recipe): Promise<Recipe | AxiosError> => {
    return RecipesController.createRecipe(recipe)
      .then((res) => {
        return res.data
      })
      .catch((err: AxiosError) => {
        return err
      })
  }

  const updateRecipe = (recipe: Recipe): Promise<Recipe | AxiosError> => {
    return RecipesController.updateRecipe(recipe.id, recipe)
      .then((res) => {
        return res.data
      })
      .catch((err: AxiosError) => {
        return err
      })
  }

  const deleteRecipe = (id: string): Promise<boolean | AxiosError> => {
    return RecipesController.deleteRecipe(id)
      .then(() => {
        return true
      })
      .catch((err: AxiosError) => {
        return err
      })
  }

  return {
    getRecipes,
    getRecipeById,
    getRecipesByUser,
    getRecipesFromApi,
    createRecipe,
    updateRecipe,
    deleteRecipe
  }
})
