import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RecipeCard from '../RecipeCard.vue'

describe('RecipeCard', () => {
  it('renders properly', () => {
    const wrapper = mount(RecipeCard, {
      props: {
        recipe: {
          id: '1',
          name: 'Test 1',
          img: '',
          ingredients: [],
          steps: [],
          price: 0,
          time: 0,
          servings: 0,
          tags: [],
          user: ''
        }
      }
    })
    expect(wrapper.text()).toContain('Test 1')
  })
})
