# Vue Highlightable Input
Highlight and style specific words as you're typing.

# Install

```sh
npm install --save vue-highlightable-input
```

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
```javascript
import HighlightableInput from "vue-highlightable-input"
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

| Name     | Required  | Type     | Default   | Description       |  Reactive
| ---      | ---   | ---      | ---       | ---               |  ---
| highlight | **Yes**     | String or Array   | null       | The string or list of words to highlight. This can be a single string value, a RegExp or you can do an array of strings or RegExp or array of [**Highlight Objects**](https://github.com/SyedWasiHaider/vue-highlightable-input#highlight-object) or array of [**Range Objects**](https://github.com/SyedWasiHaider/vue-highlightable-input#range-object).  | Yes |
| highlightEnabled  | No     |  Boolean   | true        | If true, will highlight the text | Yes |
| defaultClassList  | No | Array  | []     | Applies the specified CSS classes to each highlight, if `classList` is not provided. | Yes
| highlightStyle  | No | String or Object  | background-color:yellow     | If no style is provided for text, this will act as the global styling for the highlight. Can also be a dictionary instead of string. | Yes
| highlightDelay  | No | Number  | 500     | Determines how long in milliseconds to wait before processing the highlights. Setting this to a low value is fine for small text but setting it higher may improve performance significantly for larger text | Yes
| caseSensitive  | No | Boolean  | false     | If true, will treat highlight strings with case sensitivity. Can be overrided per highlight object. | Yes
| value | No | String   | null        | Raw text value. | Yes
| fireOn | No | String   | keydown        | The dom event on which the highlight event should be fired. This can be any event that the div content editable can handle. | No (only because the listener is being added in mounted)
| fireOnEnabled | No | Boolean   | true        | If true, will process the highlights on the specified (or default) event. | No (only because the value is used in the mounted function)

#### Highlight Object
```javascript
{
    text: 'chicken', // Required
    classList: ['animal', 'farm'], // Optional - apply CSS classes to this highlighted token, defaulting to `defaultClassList`
    style: "background-color: #f37373" // Optional
    caseSensitive: true // Optional defaults to False
}
```

#### Range Object
```javascript
{
    start: 1, // Required
    end: 9,  // Required
    classList: ['range'], // Optional
    style: "background-color: #f37373" // Optional
}
```
End must be greater than start. 
The range end is exlusive in other words ==> [start, end)

### Events

| Name       | Description
| ---        | ---      |
| @input     | Just like a regular input html element you can use this to react to input events

Note, that you can also use `v-model`

### Performance
This component is not designed for large scale text highlighting.

## Credits
This project is forked from [SyedWasiHaider/vue-highlightable-input](https://github.com/SyedWasiHaider/vue-highlightable-input).

## License
MIT
