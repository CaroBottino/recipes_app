import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import RecipesList from '@/components/RecipesList.vue'
import type { Recipe } from '@/models/Recipe'

describe('RecipesList', () => {
  const recipe: Recipe = {
    id: '1',
    name: 'Test item',
    img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
    ingredients: ['ing 1', 'ing 2', 'ing 3'],
    steps: ['step 1', 'step 2', 'step 3'],
    price: 40,
    time: 20,
    servings: 4,
    tags: ['test'],
    user: '1'
  }

  const recipe2: Recipe = {
    id: '2',
    name: 'Test item 2',
    img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
    ingredients: ['harina', 'huevos', 'leche', 'agua'],
    steps: ['hervir agua', 'batir huevos', 'mezclar todo'],
    price: 10,
    time: 24,
    servings: 3,
    tags: ['test'],
    user: '2'
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(RecipesList, { props: { recipes: [recipe, recipe2] } })

    const recipeCards = wrapper.get('[data-test="recipe-cards"]')

    expect(recipeCards).toBeTruthy()
  })

  it('shows spinner when no recipes', () => {
    const wrapper = mount(RecipesList, { props: { recipes: [] } })

    const loadingSpinner = wrapper.get('[data-test="loading-spinner"]')

    expect(loadingSpinner).toBeTruthy()
    expect(wrapper.find('[data-test="recipe-cards"]').exists()).toBe(false)
  })
})
