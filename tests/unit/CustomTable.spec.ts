import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import CustomTable from '@/components/CustomTable.vue'
import type { Recipe } from '@/models/Recipe'
import { useUserStore } from '@/stores/user'

describe('CustomTable', () => {
  const headers = ['id', 'name', 'img', 'time', 'servings', 'tags', 'price']
  const actions = ['view', 'edit']

  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Test item',
      img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
      ingredients: ['ing 1', 'ing 2', 'ing 3'],
      steps: ['step 1', 'step 2', 'step 3'],
      price: 40,
      time: 20,
      servings: 4,
      tags: ['test'],
      user: '1'
    },
    {
      id: '2',
      name: 'Test item 2',
      img: 'https://img.freepik.com/vector-gratis/ilustracion-icono-dibujos-animados-pastel-taza-concepto-icono-pasteleria-alimentos-aislado-estilo-dibujos-animados-plana_138676-2571.jpg?w=2000',
      ingredients: ['ing 1', 'ing 2', 'ing 3'],
      steps: ['step 1', 'step 2', 'step 3'],
      price: 40,
      time: 20,
      servings: 4,
      tags: ['test'],
      user: '1'
    }
  ]

  it('renders properly', () => {
    const wrapper = mount(CustomTable, {
      props: { headers: headers, items: recipes, actions: actions }
    })

    const itemHeader = wrapper.get('[data-test="table-header"]')
    const itemImg = wrapper.get('[data-test="item-img"]')
    const itemTag = wrapper.get('[data-test="item-tag"]')
    const actionView = wrapper.get('[data-test="item-action-view"]')
    const actionEdit = wrapper.get('[data-test="item-action-edit"]')

    expect(itemHeader.text()).toContain('id')
    expect(itemImg).toBeTruthy()
    expect(itemTag.text()).toContain('test')
    expect(actionView).toBeTruthy()
    expect(actionEdit).toBeTruthy()
    expect(wrapper.find('[data-test="item-action-delete"]').exists()).toBeFalsy()
  })

  it('emits viewItem when item-action-view clicked', async () => {
    const wrapper = mount(CustomTable, {
      props: { headers: headers, items: recipes, actions: actions }
    })

    const actionView = wrapper.get('[data-test="item-action-view"]')
    await actionView.trigger('click')

    expect(wrapper.emitted('viewItem')).toHaveLength(1)
    expect(wrapper.emitted('viewItem')[0]).toContain('1')
  })

  it('emits editItem when item-action-edit clicked', async () => {
    const wrapper = mount(CustomTable, {
      props: { headers: headers, items: recipes, actions: actions }
    })

    const actionEdit = wrapper.get('[data-test="item-action-edit"]')
    await actionEdit.trigger('click')

    expect(wrapper.emitted('editItem')).toHaveLength(1)
    expect(wrapper.emitted('editItem')[0]).toContain('1')
  })

  it('emits deleteItem when item-action-delete clicked', async () => {
    const wrapper = mount(CustomTable, {
      props: { headers: headers, items: recipes, actions: [ ...actions, 'delete'] }
    })

    const actionDelete = wrapper.get('[data-test="item-action-delete"]')
    await actionDelete.trigger('click')

    expect(wrapper.emitted('deleteItem')).toHaveLength(1)
    expect(wrapper.emitted('deleteItem')[0]).toContain('1')
  })
})
