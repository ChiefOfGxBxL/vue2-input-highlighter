import assert from 'assert'
import { shallowMount } from '@vue/test-utils'
import HighlightableInput from '../../src/HighlightableInput.vue'

// Reference: https://v1.test-utils.vuejs.org/guides/
// Reference: https://v2.vuejs.org/v2/cookbook/unit-testing-vue-components.html
// Key things to know when developing Vue unit tests:
//   - Use `wrapper.setData({...})` to set the state of the component, or `wrapper.setProps({...})` to set properties
//   - Use `wrapper.find(__SELECTOR__)` to search the component of child elements
describe('HighlightableInput', () => {
  test('should render tokens with a classList', async () => {
    const wrapper = shallowMount(HighlightableInput)
    await wrapper.setProps({
      highlight: [
        { text: 'cow', classList: ['animal', 'fourlegs'] },
        { text: 'pig', classList: ['animal', 'fourlegs'] },
        { text: 'chicken', classList: ['animal', 'twolegs'] }
      ],
      value: 'Our farm houses cows, pigs, and chickens.'
    })

    assert.ok(wrapper.html().indexOf('class="animal fourlegs"'))
    assert.ok(wrapper.html().indexOf('class="animal twolegs"'))
  })
})
