import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createUser, fetchUsers } from './users.service'
import axios from 'axios'

vi.mock('axios')

describe('User Store', () => {
  describe('fetchUsers', () => {
    test('makes a GET request to fetch users', async () => {
      const usersMock = [{ id: 1 }, { id: 2 }]

      axios.get.mockResolvedValue({
        data: usersMock
      })
    })
  })
})
