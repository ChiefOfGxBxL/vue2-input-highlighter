<template>
    <v-app style="margin:30px">
      <v-container fluid>
          <img height="160px" width="250px" src="../assets/logo.png">

          <h3> Highlight and style specific words as you're typing. </h3>
          
          <highlightable-input 
            align="left"
            class="myinput" 
            data-placeholder="Try typing any of the words below like hacker news or @Soup"
            :highlight-style="defaultStyle" 
            :highlight-enabled="highlightEnabled" 
            :highlight="highlight" 
            :caseSensitive="caseEnabled"
            v-model="msg"
          />
          
          <label> Raw Text: </label>
          <br><br>
          <label>{{msg}} </label>
          <br><br>

          <button v-on:click="msg = ''">Clear Text</button>
          <br><br>

          <label>
            <input type="checkbox" v-model="highlightEnabled"> Highlight
          </label>
          
          <label>
            <input type="checkbox" v-model="caseEnabled"> Case Sensitive (Global)
          </label>
          <br><br>

          <label> Add your own highlights (Text only but not RegExp) </label>
          <input v-model="customHighlight"  v-on:keyup.13="handleNewHighlights"/>
          <ul>
              <li v-for="(h,i) in this.highlight" :key="i">
                <span v-if="h.start && h.end">Range: <span :class="h.classList || defaultClassList" :style="h.style || defaultStyle">{{h.text || h}} </span> </span>
                <span v-else>Text: <span :class="h.classList || defaultClassList" :style="h.style || defaultStyle">{{(h.text || h).toString()}}</span> </span>
              </li>
          </ul>

          <h3> Install </h3>
          <p class="npminstall"> npm install --save vue-highlightable-input </p>

          <h3> Source </h3>
          <a class="npminstall" href="https://github.com/SyedWasiHaider/vue-highlightable-input">https://github.com/SyedWasiHaider/vue-highlightable-input</a>

          <h3> Icons </h3>
          <p>Icons provided for free by <a href="https://icons8.com/" target="_blank">Icons8</a></p>
      </v-container>
    </v-app>
</template>

<script>
import HighlightableInput from "../../../src/HighlightableInput"
import Vuetify from 'vuetify'
import Vue from 'vue'
Vue.use(Vuetify)

export default {
  name: 'HelloWorld',
  components : {
    HighlightableInput
  },
  data() {
    return {
      msg: 'When we go out to restaurants together, we like to order tasty food. I order a hamburger, and they order pizza and taccos. Whoops, we made a typo (and typo is always underlined!). I meant to type tacos. Also, the word Hamburger is CASEsensitive, so HAMBURGER will not trigger the styling.',
      defaultClassList: [],
      defaultStyle: { 'background-color' : 'gray', 'color' : 'white' },
      highlight: [
        { text: 'hamburger', classList: ['icon', 'hamburger'], caseSensitive: true },
        { text: 'pizza', classList: ['icon', 'pizza'] },
        { text: 'taco', classList: ['icon', 'taco'] },
        { text: 'typo', style: "border-bottom: 2px SOLID red" },
        {text:'hacker news', style:"background-color:#ff6600"},
        {text:'CASEsensitive', style:"background-color:#fca88f", caseSensitive: true},
        {text:'@Soup', style:"background-color:#bbe4cb"},
        {text:'comic-sans', style:"font-family:comic-sans"},
        {text:'bold', style:"font-weight: bold;"},
        "whatever",
        {start:0, end:1, style:"border: 3px solid #AAAD21;"},
        {start:3, end:5, style:"border: 2px solid #73AD21;"},
        {text: /[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}/img, style:"color: white; background-color:#aa2313"}, // Phone number regex
        { text: /{{\w+}}/gm, style: 'color: green;' },
        { text: /{{.*?}}/gm, style: 'color: red' },
        { text: /{{\w+/gm, style: 'color: green' },
      ],
      highlightEnabled: true,
      caseEnabled: false,
      customHighlight:''
    }
  },
  methods: {
    handleNewHighlights () {
        // Ugly hack because chrome is stupid 
        // https://stackoverflow.com/questions/26962323/what-is-this-insane-space-character-google-chrome
        var h = this.customHighlight.replace(new RegExp(String.fromCharCode(32),"g"),String.fromCharCode(160));
        if (h.length > 0)
          this.highlight.unshift(h)
        this.customHighlight = ""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

li {
  text-align: left;
  margin-top: 5px;
}

a {
  color: #42b983;
}

.myinput {
  height: 40px;
  width: auto;
  margin: 30px;
  background-color: #e2e1ee;
  padding: 20px;
}

.npminstall {
  margin-left: 40px;
  margin-right: 40px;
  background-color: black;
  background-color: #f2f1fe;
  width: auto;
}

[data-placeholder]:empty:before{
  content: attr(data-placeholder);
  color: #888;
  font-style: italic;
}

#container {
    width: 640px;
    height: auto;
    margin: 0 auto;
    padding: 10px;
    position: relative;
}
</style>

<style>
.icon {
  background-size: contain;
  background-repeat: no-repeat;
  padding: 2px 2px 2px 25px;
  border: 1px SOLID #000;
  border-radius: 4px;
}
.hamburger {
  background-image: url('../assets/icons8-hamburger-30.png');
}
.pizza {
  background-image: url('../assets/icons8-pizza-30.png');
}
.taco {
  background-image: url('../assets/icons8-taco-30.png');
}

</style>
