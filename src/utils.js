export function getRegexIndices(regex, str) {
  if (!regex.global) {
    console.error("Expected " + regex + " to be global")
    return []
  }

  regex = RegExp(regex)
  let indices = [];
  let match = null;
  while ((match = regex.exec(str)) != null) {
    indices.push({
      start: match.index,
      end: match.index + match[0].length - 1
    });
  }
  return indices;
}

// https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
export function getIndicesOf(searchStr, str, caseSensitive = false) {
  if (!searchStr || !str) return []
  let searchStrLen = searchStr.length;

  let startIndex = 0,
    index,
    indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}
