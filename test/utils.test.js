import assert from 'assert'
import { getRegexIndices, getIndicesOf } from '../src/utils.js'

describe('Utils', () => {
  describe('#getRegexIndices()', () => {
    it('should return empty array if regex is not global', () => {
      assert.equal(getRegexIndices(new RegExp('red', 'i'), 'Text to search against').length, 0)
    })
    it('should match regex against a string', () => {
      assert.equal(getRegexIndices(new RegExp('red', 'gi'), 'Red string is colored red').length, 3)
    })
  })

  describe('#getIndicesOf()', () => {
    it('should return empty array if search string or full string is empty or invalid', () => {
      assert.equal(getIndicesOf('', 'Text to search against', false).length, 0)
      assert.equal(getIndicesOf('cat', '', false).length, 0)
      assert.equal(getIndicesOf('test', null, false).length, 0)
      assert.equal(getIndicesOf(null, 'Text to search against', false).length, 0)
    })
    it('should handle case-insensitive search', () => {
      const result = getIndicesOf('red', 'Red string is colored red', false)
      assert.equal(result.length, 3)
      assert.deepStrictEqual(result, [0, 18, 22])
    })
    it('should handle case-sensitive search', () => {
      const result = getIndicesOf('red', 'Red string is colored red', true)
      assert.equal(result.length, 2)
      assert.deepStrictEqual(result, [18, 22])
    })
  })
})