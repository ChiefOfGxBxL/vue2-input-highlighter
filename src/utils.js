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
