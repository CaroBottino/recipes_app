import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { type Recipe } from '@/models/Recipe'
import RecipesController from '@/controllers/RecipesController'
import type { AxiosError } from 'axios'

export const useRecipesStore = defineStore('recipes', () => {
  const state = reactive({ recipes: <Recipe[]>[] })

  const getRecipes = computed(() => state.recipes)

  function getRecipesByUser(userId: string) {
    return state.recipes.filter((recipe) => recipe.user === userId)
  }

  function getRecipeById(id: string) {
    return state.recipes.find((recipe) => recipe.id === id)
  }

  function getRecipesFromApi() {
    RecipesController.getRecipes().then((res) => {
      state.recipes = res.data
    })
  }

  function createRecipe(recipe: Recipe) {
    RecipesController.createRecipe(recipe)
  }

  // const getCategories = async (): Promise<Category[]> => {
  //   return await CategoriesController.getCategories()
  //     .then((response: any) => {
  //       return response.data;
  //     })
  //     .catch((e: AxiosError) => {
  //       throw e.response;
  //     });
  // };

  const updateRecipe = (recipe: Recipe): Promise<Recipe | AxiosError> => {
    return RecipesController.updateRecipe(recipe.id, recipe)
      .then((res) => {
        return res.data
      })
      .catch((err: AxiosError) => {
        return err
      })
  }

  function deleteRecipe(id: string) {
    RecipesController.deleteRecipe(id)
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
