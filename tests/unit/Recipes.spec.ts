import { beforeEach, describe, expect, test, vi } from 'vitest'
import type { Recipe } from '@/models/Recipe'
import RecipesController from '@/controllers/RecipesController'
import axios from 'axios'

vi.mock('axios')

const recipe: Recipe = {
  name: 'Test item',
  img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
  ingredients: ['harina', 'huevos', 'leche', 'agua'],
  steps: ['hervir agua', 'batir huevos', 'mezclar todo'],
  price: 10,
  time: 24,
  servings: 3,
  tags: ['test'],
  id: '3',
  user: '1'
}

describe('Recipes Store', () => {
  describe('getRecipesFromApi', () => {
    test('makes a GET request to get recipes', async () => {
      const recipesMock = [recipe]

      vi.mocked(axios, true).get.mockResolvedValue({
        data: recipesMock
      })

      // const recipes = await RecipesController.getRecipes()
      // console.log('recipes: ', recipes)
      await RecipesController.getRecipes()

      expect(axios.get).toHaveBeenCalledWith(
        'https://64bbec3d7b33a35a4446d087.mockapi.io/v1/recipes'
      )
    })
  })
})
