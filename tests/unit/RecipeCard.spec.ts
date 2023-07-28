import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import RecipeCard from '@/components/RecipeCard.vue'
import type { Recipe } from '@/models/Recipe'
import { useUserStore } from '@/stores/user'

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

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(RecipeCard, { props: { recipe: recipe } })
    const cardHeader = wrapper.get('[data-test="card-header"]')
    const cardServings = wrapper.get('[data-test="card-servings"]')
    const cardTime = wrapper.get('[data-test="card-time"]')

    expect(cardHeader.text()).toBe('Test item')
    expect(cardServings.text()).toBe('porciones: 4')
    expect(cardTime.text()).toBe('tiempo: 20 minutos')
  })

  it('shows recipe info', () => {
    const wrapper = mount(RecipeCard, { props: { recipe: recipe } })
    wrapper.get('[data-test="info-btn"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('showInfo')
  })

  it('user can add to cart', () => {
    const user = useUserStore()
    const wrapper = mount(RecipeCard, { props: { recipe: recipe } })

    wrapper.get('[data-test="add-to-cart-btn"]').trigger('click')

    expect(user.cartItemsQ).toBe(1)
  })

  it("user can't add to cart because item's already there", async () => {
    const user = useUserStore()
    const wrapper = mount(RecipeCard, { props: { recipe: recipe } })

    await wrapper.get('[data-test="add-to-cart-btn"]').trigger('click')
    const checkBtn = wrapper.get('[data-test="already-in-cart-btn"]')

    expect(user.cartItemsQ).toBe(1)
    expect(checkBtn).toBeTruthy()
  })
})
