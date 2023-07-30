import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import router from '@/router'
import TheLogin from '@/components/TheLogin.vue'
import type { User } from '@/models/User'
import type { Recipe } from '@/models/Recipe'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { wrap } from 'module'

vi.mock('axios')

describe('TheLogin', () => {
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

  it('renders properly', () => {
    const wrapper = mount(TheLogin)

    expect(wrapper.get('[data-test="login-form"]')).toBeTruthy()
    expect(wrapper.find('[data-test="register-form"]').exists()).toBe(false)
  })

  it('shows registration form', async () => {
    const wrapper = mount(TheLogin)

    await wrapper.get('[data-test="go-to-register"]').trigger('click')

    expect(wrapper.get('[data-test="register-form"]')).toBeTruthy()
    expect(wrapper.find('[data-test="login-form"]').exists()).toBe(false)
  })

  it("doesn't emmit submit if form is empty", () => {
    const wrapper = mount(TheLogin)

    wrapper.get('[data-test="login-submit"]').trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('login')
  })

  it('emmits submit if form is complete', async () => {
    const wrapper = mount(TheLogin)

    await wrapper.find('[data-test="login-email"]').setValue('test@mail.com')
    await wrapper.find('[data-test="login-pass"]').setValue('test1234')

    wrapper.get('[data-test="login-form"]').trigger('submit')

    // await wrapper.vm.$nextTick() // Wait until $emits have been handled

    expect(wrapper.emitted('submit')).toHaveLength(1)

    // wanted to do this like in Jest... couldn't :(
    // expect(wrapper.emitted('submit')[0]).toEqual([{
    //   email: 'test@mail.com',
    //   pass: 'test1234'
    // }])
  })

  it('emmits register if form is correct', async () => {
    const wrapper = mount(TheLogin)
    await wrapper.get('[data-test="go-to-register"]').trigger('click')

    await wrapper.find('[data-test="register-fullname"]').setValue('Test User')
    await wrapper
      .find('[data-test="register-avatar"]')
      .setValue(
        'https://i.pinimg.com/736x/35/9d/1d/359d1d33ca0cca4e58b7a8113c2977c1--avatar-robots.jpg'
      )
    await wrapper.find('[data-test="register-email"]').setValue('test@mail.com')
    await wrapper.find('[data-test="register-pass"]').setValue('testUser1234!')
    await wrapper.find('[data-test="register-conf"]').setValue('testUser1234!')
    await wrapper.find('[data-test="register-code"]').setValue('holis')
    // await wrapper.get('[data-test="register-form"]').trigger('submit')
    await wrapper.get('[data-test="register-submit"]').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="register-fullname"]').element.value).toEqual('Test User')

    // should emit register... but doesn't
    console.log(wrapper.emitted())
    expect(wrapper.emitted('register')).toBeTruthy()
  })

  it('shows error if form filling is incorrect', async () => {
    const wrapper = mount(TheLogin)
    await wrapper.get('[data-test="go-to-register"]').trigger('click')

    await wrapper.find('[data-test="register-fullname"]').setValue('Test User')
    await wrapper
      .find('[data-test="register-avatar"]')
      .setValue(
        'https://i.pinimg.com/736x/35/9d/1d/359d1d33ca0cca4e58b7a8113c2977c1--avatar-robots.jpg'
      )
    await wrapper.find('[data-test="register-email"]').setValue('test@mail.com')
    await wrapper.find('[data-test="register-pass"]').setValue('test1234')
    // await wrapper.find('[data-test="register-conf"]').setValue('testUser1234!')
    // await wrapper.find('[data-test="register-code"]').setValue('holis')
    await wrapper.get('[data-test="register-form"]').trigger('submit')

    expect(wrapper.emitted('register')).toBe(undefined)
  })
})
