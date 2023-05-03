# Vue 2 Input Highlighter
Highlight and style specific words as you're typing.

# Install
```sh
npm install --save vue2-input-highlighter
```

# Requirements
 * Vue 2 (does not support Vue 3)
 * Node >= 14

# Usage
#### In `<template>`:

```html
<highlightable-input 
  highlight-style="background-color:yellow" 
  :highlight-enabled="highlightEnabled" 
  :highlight="highlight" 
  v-model="text"
/>
```

#### In your component code:
```js
import HighlightableInput from "vue2-input-highlighter"
export default {
  name: 'HelloWorld',
  components : {
    HighlightableInput
  },
  data() {
    return {
      text: '',
      highlight: [
        { text: 'box', classList: ['shape'] },
        { text: 'chicken', style: "background-color: #f37373" },
        { text: 'noodle', style: "background-color: #fca88f" },
        { text: 'soup', style: "background-color: #bbe4cb" },
        { text: 'so', style: "background-color: #fff05e" },
        "whatever",
        { start: 2, end: 5, style: "background-color: #f330ff" }
      ],
      highlightEnabled: true
    }
  },
}
```

### Props

| Name | Type | Default | Description | Reactive |
|---|---|---|---|---|
| highlight (**required**) | String or Array | | The string or list of words to highlight. This can be a single string value, a RegExp or you can do an array of strings or RegExp or array of [**Highlight Objects**](#highlight-object) or array of [**Range Objects**](#range-object). | Yes |
| highlightEnabled | Boolean | true | If `true`, will highlight the text. | Yes |
| defaultClassList | Array | [] | Applies the specified CSS classes to each highlight, if `classList` is not provided. | Yes |
| highlightStyle | String or Object | background-color:yellow | If no style is provided for text, this will act as the global styling for the highlight. Can also be a dictionary instead of string. | Yes |
| highlightDelay | Number | 500 | Determines how long in milliseconds to wait before processing the highlights. Setting this to a low value is fine for small text but setting it higher may improve performance significantly for larger text. | Yes |
| caseSensitive | Boolean | false | If true, will treat highlight strings with case sensitivity. Can be overridden per highlight object. | Yes |
| value (or use `v-model`) | String | null | Raw text value. | Yes |
| fireOn | String | keydown | The dom event on which the highlight event should be fired. This can be any event that the div content editable can handle. | No (`onMount` only) |
| fireOnEnabled | Boolean | true | If true, will process the highlights on the specified (or default) event. | No (`onMount` only) |

#### Highlight Object
```js
{
  text: 'chicken', // Required
  classList: ['animal', 'farm'], // Optional - apply CSS classes to this highlighted token, defaulting to `defaultClassList`
  style: "background-color: #f37373", // Optional
  caseSensitive: true // Optional defaults to False
}
```

#### Range Object
```js
{
  start: 1, // Required
  end: 9,  // Required, end must be greater than start [start, end)
  classList: ['range'], // Optional
  style: "background-color: #f37373" // Optional
}
```

### Events

| Name       | Description | Payload |
| ---        | ---         | ---     |
| @input     | Emits when user types text | `str` |
| @onHighlight | Provides details on which text ranges were stylized | `array` - `[{ start, end, classList, style, text }]`

### Performance
This component is not designed for large scale text highlighting.

## Credits
This project is forked from [SyedWasiHaider/vue-highlightable-input](https://github.com/SyedWasiHaider/vue-highlightable-input).

## License
MIT
