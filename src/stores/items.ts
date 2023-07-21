import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { type Item } from '@/models/Item'
import ItemsController from '@/controllers/ItemsController'

export const useItemsStore = defineStore('items', () => {
  const state = reactive({ items: <Item[]>[] })

  const getItems = computed(() => state.items)

  const getItemsByUser = computed((userId: string) =>
    state.items.filter((item) => item.user === userId)
  )
  // function getItemsByUser(userId: string) {
  //   return state.items.filter((item) => item.user === userId)
  // }

  const getItemById = computed((id: string) => state.items.find((item) => item.id === id))
  // function getItemById(id: string) {
  //   return state.items.find((item) => item.id === id)
  // }

  function getItemsFromApi() {
    ItemsController.getItems().then((res) => {
      state.items = res.data
    })
  }

  function createItem(item: Item) {
    ItemsController.createItem(item)
  }

  function updateItem(item: Item) {
    ItemsController.updateItem(item.id, item)
  }

  function deleteItem(id: string) {
    ItemsController.deleteItem(id)
  }

  return {
    getItems,
    getItemById,
    getItemsByUser,
    getItemsFromApi,
    createItem,
    updateItem,
    deleteItem
  }
})
