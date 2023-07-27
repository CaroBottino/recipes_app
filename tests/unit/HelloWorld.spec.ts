import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

function mountHelloWorld() {
  const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
  return wrapper
}

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })

    expect(wrapper.text()).toContain('Hello Vitest')
  })

  it('click the submit button', async () => {
    const form = mountHelloWorld().find('form')
    // The spyOn function will report if the element
    // has been clicked.
    const spyOnForm = vi.spyOn(form, 'trigger')
    await form.trigger('click')

    // ❌wrong
    // expect(spyOnForm).toHaveBeenCalledTimes(2)

    // ✅ good
    expect(spyOnForm).toHaveBeenCalledOnce()
  })

  it('Renders the input value', async () => {
    const input = mountHelloWorld().find('input')
    // input renders with an empty value
    expect(input.text()).toContain('')
    // fill the input
    await input.setValue('jane@doe.com')
    // Check the input has a value
    expect(input.element.value).toEqual('jane@doe.com')
  })
})
