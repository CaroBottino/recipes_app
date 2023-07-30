import { beforeEach, describe, expect, test, vi } from 'vitest'
import type { User } from '@/models/User'
import UsersController from '@/controllers/UsersController'
import axios from 'axios'

vi.mock('axios')

const testUser: User = {
  id: '1',
  fullname: 'Test User',
  avatar: 'https://i.pinimg.com/736x/35/9d/1d/359d1d33ca0cca4e58b7a8113c2977c1--avatar-robots.jpg',
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

describe('Users Store', () => {
  describe('buyItems', () => {
    test('makes a PUT request to update user info', async () => {
      vi.mocked(axios, true).put.mockResolvedValue({
        data: testUser
      })

      const response = await UsersController.updateUser(testUser.id, testUser)
      console.log(response)

      expect(axios.put).toHaveBeenCalledWith(
        'https://64bbec3d7b33a35a4446d087.mockapi.io/v1/user/1',
        testUser
      )
    })
  })
})
