import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosError } from 'axios'
import type { User } from '@/models/User'
import type { CartItem } from '@/models/CartItem'
import UsersController from '@/controllers/UsersController'

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    user: <User>{
      id: '',
      fullname: '',
      avatar: '',
      email: '',
      pass: '',
      role: '',
      cart: [],
      bought: []
    }
  })
  const logged = ref(false)

  const getUser = computed(() => state.user)
  const getUserCart = computed(() => state.user.cart)
  const getRecipesBought = computed(() => state.user.bought)

  const cartItemsQ = computed(() => state.user.cart.length)
  const cartPrice = computed(() => {
    let price = 0

    state.user.cart.forEach((item) => {
      price = price + item.price
    })

    return price
  })

  function loginUser(payload: User) {
    state.user = payload
    logged.value = true
  }

  function logoutUser() {
    const emptyUser: User = {
      fullname: '',
      pass: '',
      role: '',
      email: '',
      id: '',
      avatar: '',
      cart: [],
      bought: []
    }

    state.user = emptyUser
    logged.value = false
  }

  const registerUser = (payload: User): Promise<boolean | AxiosError> => {
    return UsersController.createUser(payload)
      .then((res) => {
        state.user = res.data
        logged.value = true

        return true
      })
      .catch((err: AxiosError) => {
        return err
      })
  }

  const editUserInfo = (payload: User): Promise<boolean | AxiosError> => {
    return UsersController.updateUser(payload.id, payload)
      .then((res) => {
        state.user = res.data
        return true
      })
      .catch((err: AxiosError) => {
        return err
      })
  }

  // const getItemFromCart = computed((id: string) => state.user.cart.filter((item) => id === item.id))
  function getItemFromCart(id: string) {
    return state.user.cart.filter((item) => id === item.id)
  }

  function addItemToCart(payload: CartItem) {
    state.user.cart.push(payload)
  }

  function deleteItemFromCart(id: string) {
    const aux = state.user.cart.filter((item) => id !== item.id)
    state.user.cart = aux
  }

  return {
    logged,
    getUser,
    getUserCart,
    getRecipesBought,
    cartItemsQ,
    cartPrice,
    getItemFromCart,
    loginUser,
    logoutUser,
    registerUser,
    editUserInfo,
    addItemToCart,
    deleteItemFromCart
  }
})
