import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import RecipeInfo from '@/components/RecipeInfo.vue'
import type { Recipe } from '@/models/Recipe'
import type { User } from '@/models/User'
import { useUserStore } from '@/stores/user'
import { useRecipesStore } from '@/stores/recipes'

describe('RecipeCard', () => {
  const recipe: Recipe = {
    id: '1',
    name: 'Test item',
    img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
    ingredients: ['ing 1', 'ing 2', 'ing 3'],
    steps: ['step 1', 'step 2', 'step 3'],
    price: 40,
    time: 20,
    servings: 4,
    tags: [],
    user: '1'
  }

  const recipe3: Recipe = {
    name: 'Test item 3',
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

  const testUser: User = {
    id: '1',
    fullname: 'Test User',
    avatar:
      'https://i.pinimg.com/736x/35/9d/1d/359d1d33ca0cca4e58b7a8113c2977c1--avatar-robots.jpg',
    email: 'test@mail.com',
    pass: 'test1234',
    role: 'admin',
    cart: [
      {
        id: '11',
        name: 'Test item 11',
        img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
        price: 10,
        user: '3'
      }
    ],
    bought: [
      {
        createdAt: '2023-07-23T23:52:01.544Z',
        name: 'Test item 2',
        img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
        ingredients: ['harina', 'huevos', 'leche', 'agua'],
        steps: ['hervir agua', 'batir huevos', 'mezclar todo'],
        price: 10,
        time: 24,
        servings: 3,
        tags: ['test'],
        id: '11',
        user: '3'
      }
    ]
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(RecipeInfo, { props: { recipe: recipe } })
    const recipeName = wrapper.get('[data-test="recipe-name"]')
    const recipeTime = wrapper.get('[data-test="recipe-time"]')
    const recipeServings = wrapper.get('[data-test="recipe-servings"]')

    expect(recipeName.text()).toBe('Test item')
    expect(recipeTime.text()).toContain('20 minutos')
    expect(recipeServings.text()).toContain('4')
  })

  it("user can't see full info", () => {
    const user = useUserStore()
    user.loginUser(testUser)
    const wrapper = mount(RecipeInfo, { props: { recipe: recipe } })

    const ingredients = wrapper.get('[data-test="recipe-ingredients"]')

    expect(ingredients.classes()).toContain('blur')
  })

  it('user can see full info, recipe owner', () => {
    const user = useUserStore()
    user.loginUser(testUser)
    const recipesStore = useRecipesStore()
    recipesStore.recipes.push(recipe3)

    const wrapper = mount(RecipeInfo, { props: { recipe: recipe3 } })

    const steps = wrapper.get('[data-test="recipe-steps"]')

    expect(steps).toBeTruthy()
  })
})
