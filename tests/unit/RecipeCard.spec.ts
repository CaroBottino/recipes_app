import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import RecipeCard from '@/components/RecipeCard.vue'
import type { Recipe } from '@/models/Recipe'

describe('RecipeCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
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

    const wrapper = mount(RecipeCard, { props: { recipe: recipe } })
    const cardHeader = wrapper.get('[data-test="card-header"]')
    const cardServings = wrapper.get('[data-test="card-servings"]')
    const cardTime = wrapper.get('[data-test="card-time"]')

    expect(cardHeader.text()).toBe('Test item')
    expect(cardServings.text()).toBe('porciones: 4')
    expect(cardTime.text()).toBe('tiempo: 20 minutos')
  })
})
