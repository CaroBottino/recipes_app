import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/models/User'
import type { CartItem } from '@/models/CartItem'
import UsersController from '@/controllers/UsersController'

export const useUserStore = defineStore('user', () => {
  const state = reactive({
    user: <User>{
      id: '',
      fullname: '',
      email: '',
      pass: '',
      role: '',
      cart: []
    }
  })
  const logged = ref(false)

  const getUser = computed(() => state.user)
  const getUserCart = computed(() => state.user.cart)

  const cartItemsQ = computed(() => state.user.cart.length)
  const cartPrice = computed(() => {
    let price = 0

    state.user.cart.forEach((item) => {
      price = price + item.price * item.q
    })

    return price
  })

  function createUser(payload: User) {
    UsersController.createUser(payload).then((res) => {
      state.user = res.data
      logged.value = true
    })
  }

  function loggingUser(payload: User) {
    UsersController.updateUser(payload.id, payload).then((res) => {
      state.user = res.data
      logged.value = true
    })
  }

  function logoutUser() {
    const emptyUser: User = {
      fullname: '',
      pass: '',
      role: '',
      email: '',
      id: '',
      cart: []
    }

    setUser(emptyUser)
    logged.value = false
  }

  function editUserInfo(payload: User) {
    UsersController.updateUser(payload.id, payload).then((res) => {
      state.user = res.data
    })
  }

  function updateItemQ(item: CartItem) {
    state.user.cart.forEach((i) => {
      if (i.id === item.id) {
        i.q = i.q + item.q
      }
    })
  }

  // const getItemFromCart = computed((id: string) => state.user.cart.filter((item) => id === item.id))
  function getItemFromCart(id: string) {
    return state.user.cart.filter((item) => id === item.id)
  }

  function addItemToCart(payload: CartItem) {
    if (getItemFromCart(payload.id).length !== 0) {
      updateItemQ(payload)
    } else {
      state.user.cart.push(payload)
    }
  }

  function updateItemAdd(item: CartItem) {
    item.q = 1
    updateItemQ(item)
  }

  function updateItemSubs(item: CartItem) {
    item.q = -1
    updateItemQ(item)
  }

  return {
    logged,
    getUser,
    getUserCart,
    cartItemsQ,
    cartPrice,
    getItemFromCart,
    createUser,
    loggingUser,
    logoutUser,
    editUserInfo,
    addItemToCart,
    updateItemAdd,
    updateItemSubs
  }
})
