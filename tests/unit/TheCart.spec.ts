import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import router from '@/router'
import TheCart from '@/components/TheCart.vue'
import type { User } from '@/models/User'
import type { Recipe } from '@/models/Recipe'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

vi.mock('axios')

describe('TheCart', () => {
  const testUser: User = {
    id: '11',
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
        name: 'Test item 4',
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

  const testUser2: User = {
    id: '11',
    fullname: 'Test User',
    avatar:
      'https://i.pinimg.com/736x/35/9d/1d/359d1d33ca0cca4e58b7a8113c2977c1--avatar-robots.jpg',
    email: 'test@mail.com',
    pass: 'test1234',
    role: 'admin',
    cart: [],
    bought: [
      {
        id: '11',
        createdAt: '2023-07-23T23:52:01.544Z',
        name: 'Test item 4',
        img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
        ingredients: ['harina', 'huevos', 'leche', 'agua'],
        steps: ['hervir agua', 'batir huevos', 'mezclar todo'],
        price: 10,
        time: 24,
        servings: 3,
        tags: ['test'],
        user: '3'
      },
      {
        id: '12',
        createdAt: '2023-07-23T23:52:01.544Z',
        name: 'Test item 12',
        img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
        ingredients: ['harina', 'huevos', 'leche', 'agua'],
        steps: ['hervir agua', 'batir huevos', 'mezclar todo'],
        price: 10,
        time: 24,
        servings: 3,
        tags: ['test'],
        user: '4'
      }
    ]
  }

  const recipe: Recipe = {
    id: '12',
    name: 'Test item 12',
    img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
    ingredients: ['harina', 'huevos', 'leche', 'agua'],
    steps: ['hervir agua', 'batir huevos', 'mezclar todo'],
    price: 10,
    time: 24,
    servings: 3,
    tags: ['test'],
    user: '4'
  }

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  function mountTheCart() {
    const wrapper = mount(TheCart, {
      global: {
        plugins: [router]
      }
    })
    return wrapper
  }

  it('renders properly', () => {
    const wrapper = mountTheCart()

    expect(wrapper.get('[data-test="cart-label"]')).toBeTruthy()
  })

  it('cart is empty', () => {
    const wrapper = mountTheCart()

    expect(wrapper.get('[data-test="no-cart-items"]')).toBeTruthy()
  })

  it('cart has items', async () => {
    const userStore = useUserStore()
    userStore.loginUser(testUser)
    const wrapper = mountTheCart()

    const cartItem = wrapper.get('[data-test="cart-item"]')

    expect(cartItem).toBeTruthy()
  })

  it('delete item from cart', async () => {
    const userStore = useUserStore()
    userStore.loginUser(testUser)
    const wrapper = mountTheCart()

    // mock axios put when update user after deleting item :)
    vi.mocked(axios, true).put.mockResolvedValue({
      data: testUser2
    })

    await wrapper.get('[data-test="cart-delete-item"]').trigger('click')

    expect(wrapper.find('[data-test="cart-delete-item"]').exists()).toBe(false)
  })

  it('go to registration from cart', async () => {
    const wrapper = mountTheCart()
    const push = vi.spyOn(router, 'push')

    const registerBtn = wrapper.get('[data-test="cart-register"]')
    expect(registerBtn).toBeTruthy()

    await registerBtn.trigger('click')

    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith({ name: 'login' })
  })

  it('buy cart items', async () => {
    const userStore = useUserStore()
    userStore.loginUser(testUser)
    userStore.addItemToCart({
      id: '12',
      name: 'Test item 12',
      img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
      price: 10,
      user: '4'
    })

    // mock axios response for getting recipe to buy
    vi.mocked(axios, true).get.mockResolvedValue({
      data: recipe
    })
    // mock axios response for update user at last step of buying
    vi.mocked(axios, true).put.mockResolvedValue({
      data: testUser2
    })

    const wrapper = mountTheCart()
    const push = vi.spyOn(router, 'push')

    const buyBtn = wrapper.get('[data-test="cart-buy"]')
    expect(buyBtn).toBeTruthy()
    expect(buyBtn.attributes().disabled).toBeUndefined()

    await buyBtn.trigger('click')

    expect(userStore.cartItemsQ).toBe(0)
    expect(userStore.getRecipesBought).toContain(recipe)
    // expect(push).toHaveBeenCalledOnce()
    // expect(push).toHaveBeenCalledWith({ name: 'bought' })
  })
})
