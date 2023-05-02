export function getRegexIndices(regex, str) {
  regex = RegExp(regex)
  if (!regex.global) return []

  const indices = []
  let match = null
  while ((match = regex.exec(str)) != null) {
    indices.push({
      start: match.index,
      end: match.index + match[0].length - 1
    })
  }
  return indices
}

export function getIndicesOf(searchStr, str, caseSensitive = false) {
  // Source: https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
  if (!searchStr || !str) return []
  const searchStrLen = searchStr.length

  let startIndex = 0
  let index = 0
  const indices = []

  if (!caseSensitive) {
    str = str.toLowerCase()
    searchStr = searchStr.toLowerCase()
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index)
    startIndex = index + searchStrLen
  }
  return indices
}

export function safeTagsReplace(str) {
  // Source: https://stackoverflow.com/questions/5499078/fastest-method-to-escape-html-tags-as-html-entities
  const tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  }
  const replaceTag = (tag) => tagsToReplace[tag] || tag
  return str.replace(/[&<>]/g, replaceTag)
}

export function isRegExp(obj) {
  return obj && Object.prototype.toString.call(obj) === '[object RegExp]'
}

export function saveSelection(containerEl) {
  // Copied but modifed slightly from: https://stackoverflow.com/questions/14636218/jquery-convert-text-url-to-link-as-typing/14637351#14637351
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
    preSelectionTextRange.setEndPoint('EndToStart', selectedTextRange)
    start = preSelectionTextRange.text.length

    return {
      start: start,
      end: start + selectedTextRange.text.length
    }
  }
}

// Copied but modifed slightly from: https://stackoverflow.com/questions/14636218/jquery-convert-text-url-to-link-as-typing/14637351#14637351
export function restoreSelection(containerEl, savedSel) {
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
    textRange.moveEnd('character', savedSel.end)
    textRange.moveStart('character', savedSel.start)
    textRange.select()
  }
}
