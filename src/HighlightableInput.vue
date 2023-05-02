<template>
  <div contenteditable="true" />
</template>

<script>
import IntervalTree from 'node-interval-tree'
import debounce from 'lodash/debounce'
import isUndefined from 'lodash/isUndefined'

import {
  getRegexIndices,
  getIndicesOf,
  safeTagsReplace,
  isRegExp
} from './utils'

export default {
  name: 'HighlightableInput',

  props: {
    highlight: {
      type: Array,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    defaultClassList: {
      type: Array,
      default: () => []
    },
    highlightStyle: {
      type: [String, Object],
      default: 'background-color: yellow'
    },
    highlightEnabled: {
      type: Boolean,
      default: true
    },
    highlightDelay: {
      type: Number,
      default: 500 // This is milliseconds
    },
    caseSensitive: {
      type: Boolean,
      default: false
    },
    fireOn: {
      type: String,
      default: 'keydown'
    },
    fireOnEnabled: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      internalValue: '',
      htmlOutput: '',
      debouncedHandler: null
    }
  },

  watch: {
    highlightStyle() {
      this.processHighlights()
    },

    highlight() {
      this.processHighlights()
    },

    value() {
      if (this.internalValue !== this.value) {
        this.internalValue = this.value
        this.processHighlights()
      }
    },

    highlightEnabled () {
      this.processHighlights()
    },

    caseSensitive () {
      this.processHighlights()
    },

    htmlOutput() {
      const selection = this.saveSelection(this.$el)
      this.$el.innerHTML = this.htmlOutput
      this.restoreSelection(this.$el, selection)
    }
  },

  mounted () {
    if (this.fireOnEnabled) {
      this.$el.addEventListener(this.fireOn, this.handleChange)
    }
    this.internalValue = this.value
    this.processHighlights()
  },

  methods: {

    handleChange() {
      this.debouncedHandler = debounce(() => {
        if (this.internalValue !== this.$el.textContent) {
          this.internalValue = this.$el.textContent
          this.processHighlights()
        }
      }, this.highlightDelay)
      this.debouncedHandler()
    },

    processHighlights() {
      if (!this.highlightEnabled) {
        this.htmlOutput = this.internalValue
        this.$emit('input', this.internalValue)
        return
      }

      const intervalTree = new IntervalTree()

      // Find the position ranges of the text to highlight
      let sortedHighlights = this.normalizedHighlights()
      if (!sortedHighlights) return

      for (const highlightObj of sortedHighlights) {
        if (highlightObj.text) {
          if (typeof highlightObj.text === "string") {
            getIndicesOf(
              highlightObj.text,
              this.internalValue,
              isUndefined(highlightObj.caseSensitive) ? this.caseSensitive : highlightObj.caseSensitive
            ).forEach(start => {
              const end = start + highlightObj.text.length - 1
              this.insertRange(start, end, highlightObj, intervalTree)
            })
          } else if (isRegExp(highlightObj.text)) {
            getRegexIndices(highlightObj.text, this.internalValue).forEach(pair => {
              this.insertRange(pair.start, pair.end, highlightObj, intervalTree)
            })
          }
        } else if (highlightObj.start != undefined && highlightObj.end != undefined && highlightObj.start < highlightObj.end) {
          this.insertRange(highlightObj.start, highlightObj.end - 1, highlightObj, intervalTree)
        }
      }

      const highlightPositions = intervalTree.search(0, this.internalValue.length).sort((a, b) => a.start - b.start)

      // Construct the output with styled spans around the highlight text
      let result = ''
      let startingPosition = 0
      for (const position of highlightPositions) {
        result += safeTagsReplace(this.internalValue.substring(startingPosition, position.start))
        result += `<span class='${position.classList.join(' ')}' style='${position.style}'>${safeTagsReplace(this.internalValue.substring(position.start, position.end + 1))}</span>`
        startingPosition = position.end + 1
      }

      // In case we exited the loop early
      if (startingPosition < this.internalValue.length) {
        result += safeTagsReplace(this.internalValue.substring(startingPosition, this.internalValue.length))
      }

      // Firefox bug
      if (result[result.length - 1] === ' ') {
        result = result.substring(0, result.length - 1)
        result += '&nbsp;'
      }

      this.htmlOutput = result
      this.$emit('input', this.internalValue)
    },

    insertRange(start, end, highlightObj, intervalTree) {
      const overlap = intervalTree.search(start, end)
      const maxLengthOverlap = overlap.reduce((max, o) => Math.max(o.end - o.start, max), 0)

      if (overlap.length === 0) {
        intervalTree.insert(start, end, { start: start, end: end, style: highlightObj.style, classList: highlightObj.classList } )
      } else if ((end - start) > maxLengthOverlap) {
        overlap.forEach(o => intervalTree.remove(o.start, o.end, o))
        intervalTree.insert(start, end, { start: start, end: end, style: highlightObj.style, classList: highlightObj.classList } )
      }
    },

    normalizedHighlights () {
      if (this.highlight == null) return null

      if (isRegExp(this.highlight) || typeof this.highlight === "string") {
        return [{ text: this.highlight }]
      }

      if (Array.isArray(this.highlight) && this.highlight.length > 0) {
        const globalDefaultStyle = typeof this.highlightStyle === 'string' ? this.highlightStyle : (Object.keys(this.highlightStyle).map(key => key + ':' + this.highlightStyle[key]).join(';') + ';')
        const globalDefaultClassList = this.defaultClassList

        const regExpHighlights = this.highlight.filter(isRegExp)
        const nonRegExpHighlights = this.highlight.filter(x => !isRegExp(x))
        return nonRegExpHighlights.map(h => {
          if (h.text || typeof h === "string") {
            return {
              text: h.text || h,
              style: h.style || globalDefaultStyle,
              classList: h.classList || globalDefaultClassList,
              caseSensitive: h.caseSensitive
            }
          } else if (h.start != undefined && h.end != undefined) {
            return {
              style: h.style || globalDefaultStyle,
              classList: h.classList || globalDefaultClassList,
              start: h.start,
              end: h.end,
              caseSensitive: h.caseSensitive
            }
          }
        }).sort((a, b) => (a.text && b.text) ? a.text > b.text : ((a.start === b.start ? (a.end < b.end) : (a.start < b.start)))).concat(regExpHighlights)
        // We sort here in ascending order because we want to find highlights for the smaller strings first
        // and then override them later with any overlapping larger strings. So for example:
        // if we have highlights: g and gg and the string "sup gg" should have only "gg" highlighted.
        // RegExp highlights are not sorted and simply concated (this could be done better  in the future)
      }

      return null
    },

    // Copied but modifed slightly from: https://stackoverflow.com/questions/14636218/jquery-convert-text-url-to-link-as-typing/14637351#14637351
    saveSelection(containerEl) {
      let start
      if (window.getSelection && document.createRange) {
        let selection = window.getSelection()
        if (!selection || selection.rangeCount == 0) return

        let range = selection.getRangeAt(0)
        let preSelectionRange = range.cloneRange()
        preSelectionRange.selectNodeContents(containerEl)
        preSelectionRange.setEnd(range.startContainer, range.startOffset)
        start = preSelectionRange.toString().length

        return {
          start: start,
          end: start + range.toString().length
        }
      } else if (document.selection) {
        let selectedTextRange = document.selection.createRange()
        let preSelectionTextRange = document.body.createTextRange()
        preSelectionTextRange.moveToElementText(containerEl)
        preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange)
        start = preSelectionTextRange.text.length

        return {
          start: start,
          end: start + selectedTextRange.text.length
        }
      }
    },

    // Copied but modifed slightly from: https://stackoverflow.com/questions/14636218/jquery-convert-text-url-to-link-as-typing/14637351#14637351
    restoreSelection(containerEl, savedSel) {
      if (!savedSel) return

      if (window.getSelection && document.createRange) {
        let charIndex = 0
        let range = document.createRange()
        range.setStart(containerEl, 0)
        range.collapse(true)

        let nodeStack = [containerEl]
        let node = null
        let foundStart = false
        let stop = false

        while (!stop && (node = nodeStack.pop())) {
          if (node.nodeType == 3) {
            let nextCharIndex = charIndex + node.length
            if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
              range.setStart(node, savedSel.start - charIndex)
              foundStart = true
            }
            if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
              range.setEnd(node, savedSel.end - charIndex)
              stop = true
            }
            charIndex = nextCharIndex
          } else {
            let i = node.childNodes.length
            while (i--) {
              nodeStack.push(node.childNodes[i])
            }
          }
        }

        let sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      } else if (document.selection) {
        let textRange = document.body.createTextRange()
        textRange.moveToElementText(containerEl)
        textRange.collapse(true)
        textRange.moveEnd("character", savedSel.end)
        textRange.moveStart("character", savedSel.start)
        textRange.select()
      }
    }
  }
}
</script>

<style scoped>
div {
  height: 50px;
  cursor: text;
}
</style>
