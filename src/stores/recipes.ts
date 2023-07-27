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

  function filterRecipeByCriteria(criteria: string) {
    return state.recipes.filter((recipe) => {
      console.log(
        recipe.name,
        recipe.ingredients.find((ingredient) => ingredient === criteria)
      )
      return (
        recipe.name.toLowerCase().indexOf(criteria.toLowerCase()) != -1 ||
        recipe.tags.find((tag) => tag === criteria) ||
        recipe.ingredients.find(
          (ingredient) => ingredient.toLowerCase().indexOf(criteria.toLowerCase()) != -1
        )
      )
    })
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
    filterRecipeByCriteria,
    createRecipe,
    updateRecipe,
    deleteRecipe
  }
})
