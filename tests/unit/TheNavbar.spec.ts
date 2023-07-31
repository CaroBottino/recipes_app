import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import router from '@/router'
import TheNavbar from '@/components/TheNavbar.vue'
import type { User } from '@/models/User'
import { useUserStore } from '@/stores/user'
vi.mock('axios')

describe('TheNavbar', () => {
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

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  function mountTheNavbar() {
    const wrapper = mount(TheNavbar, {
      global: {
        plugins: [router]
      }
    })
    return wrapper
  }

  it('renders properly', () => {
    const wrapper = mountTheNavbar()

    expect(wrapper.get('[data-test="navbar-brand"]')).toBeTruthy()
  })

  it('goes home when clicking brand', async () => {
    const wrapper = mountTheNavbar()
    const push = vi.spyOn(router, 'push')

    expect(wrapper.get('[data-test="navbar-brand"]')).toBeTruthy()
    await wrapper.get('[data-test="navbar-brand"]').trigger('click')

    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith({ name: 'home' })
  })

  it('searches if criteria in input', async () => {
    const wrapper = mountTheNavbar()
    const push = vi.spyOn(router, 'push')

    await wrapper.find('[data-test="search-criteria"]').setValue('harina')
    await wrapper.get('[data-test="search-form"]').trigger('submit')

    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith({ name: 'search', params: { search: 'harina' } })
  })

  it('shows login btn if no user logged', async () => {
    const wrapper = mountTheNavbar()
    const push = vi.spyOn(router, 'push')

    expect(wrapper.get('[data-test="login-btn"]')).toBeTruthy()
    await wrapper.get('[data-test="login-btn"]').trigger('click')

    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith({ name: 'login' })
  })

  it('shows avatar btn if user logged', async () => {
    const userStore = useUserStore()
    userStore.loginUser(testUser)
    const wrapper = mountTheNavbar()

    expect(wrapper.get('[data-test="user-avatar"]')).toBeTruthy()
  })

  it('goes to user profile', async () => {
    const userStore = useUserStore()
    userStore.loginUser(testUser)
    const wrapper = mountTheNavbar()
    const push = vi.spyOn(router, 'push')

    await wrapper.get('[data-test="profile-btn"]').trigger('click')

    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith({ name: 'user' })
  })

  it('logs out user', async () => {
    const userStore = useUserStore()
    userStore.loginUser(testUser)
    const wrapper = mountTheNavbar()
    const push = vi.spyOn(router, 'push')

    await wrapper.find('[data-test="sign-out"]').trigger('click')

    expect(push).toHaveBeenCalledOnce()
    expect(push).toHaveBeenCalledWith({ name: 'home' })
    expect(userStore.getUser.id).toBe('')
  })

  it('shows cart info when user logged', async () => {
    const userStore = useUserStore()
    userStore.loginUser(testUser)
    const wrapper = mountTheNavbar()

    expect(wrapper.get('[data-test="cart-items-q"]').text()).toBe('1')
  })
})
