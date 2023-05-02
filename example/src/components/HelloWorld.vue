<template>
  <main class="container">
    <!-- Hero -->
    <section>
      <hgroup>
        <h1>Vue 2 Input Highlighter</h1>
        <h2><mark>Highlight</mark> and style specific words as you're typing.</h2>
      </hgroup>
      <code class='execute'>npm install --save vue2-input-highlighter</code>
      <a href="https://github.com/Vision-Zero-Reporting/vue2-input-highlighter">
        <img src="../assets/github-mark.svg" width="36" height="36" />
        GitHub
      </a>
    </section>

    <!-- Side-by-side highlight component -->
    <div class="grid">
      <div> <!-- Left -->
        <hgroup>
          <h4>Live demo</h4>
          <h5>Begin typing below to see the component live in action!</h5>
        </hgroup>
        <highlightable-input 
          align="left"
          class="highlightable-input"
          spellcheck="false"
          data-placeholder="Try typing some text here with words from the reference sheet"
          :highlight-style="defaultStyle"
          :highlight-enabled="highlightEnabled"
          :highlight="highlight"
          :default-class-list="defaultClassList"
          :caseSensitive="caseEnabled"
          v-model="msg"
        />

        <!-- Controls -->
        <div class="grid">
          <div>
            <label>
              <input type="checkbox" v-model="highlightEnabled"> Highlight
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" v-model="caseEnabled"> Case Sensitive (Global)
            </label>
          </div>
        </div>
      </div>
      <div style="padding-left: 10px;"> <!-- Right -->
        <hgroup>
          <h4>Reference</h4>
          <h5>A reference sheet of some things you can type in this demo</h5>
        </hgroup>

        <h6>Text</h6>
        <ul>
          <li>Food names <code>hamburger <sup title="case-sensitive">(*)</sup></code><code>pizza</code><code>taco</code></li>
          <li>Literal <code>typo</code><code>whatever</code><code>comic-sans</code></li>
          <li>Case-sensitive <code>CASE <sup title="case-sensitive">(*)</sup></code></li>
        </ul>

        <h6>Patterns</h6>
        <ul>
          <li>Phone numbers <code>555-555-1234</code></li>
          <li>Hash tags <code>#example</code></li>
        </ul>

        <hgroup>
          <h6>Ranges</h6>
          <h6>These will highlight based on start and end indices</h6>
        </hgroup>
        <ul>
          <li>Range <code>1-5</code></li>
          <li>Range <code>15-30</code></li>
        </ul>
      </div>
    </div>

    <!-- Footer -->
    <footer>
      <hr />
      Icons provided for free by <a href="https://icons8.com/" target="_blank">Icons8</a>
    </footer>
  </main>
</template>

<script>
import HighlightableInput from "../../../src/HighlightableInput"

export default {
  name: 'HelloWorld',
  components: {
    HighlightableInput
  },
  data() {
    return {
      msg: 'When we go out to restaurants (#restaurant-life) together, we like to order tasty food. I order a hamburger, and they order pizza and taccos. Whoops, we made a typo (and typo is always underlined!). I meant to type tacos in comic-sans. Also, the word Hamburger is CASEsensitive case, so HAMBURGER will not trigger the styling. Pizza is good for parties. We eat whatever we want. RSVP 555-555-5555! #goodfood #parties #latenight',
      defaultClassList: [],
      defaultStyle: { 'font-style': 'italic' },
      highlight: [
        { text: 'hamburger', classList: ['icon', 'hamburger'], caseSensitive: true },
        { text: 'pizza', classList: ['icon', 'pizza'] },
        { text: 'taco', classList: ['icon', 'taco'] },
        { text: 'typo', style: "border-bottom: 2px dotted red" },
        { text:'CASE', style: "background-color: #fca88f", caseSensitive: true },
        { text:'comic-sans', style: "font-family: comic-sans" },
        "whatever",
        { start: 1, end: 5, style: "background-color: #fff2ca;" },
        { start: 15, end: 30, style: "background-color: #60c167;" },
        { text: /[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}/img, style: "font-weight: bold; background-color: #a9d5f2;" }, // Phone number
        { text: /#[\w-]+/ig, style: "font-size: 0.7em; border: 1px SOLID #000; padding:1px; background-color: white;"}, // Hash tag
      ],
      highlightEnabled: true,
      caseEnabled: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h6, li { text-align: left; margin-bottom: 4px; }

a {
  color: #42b983;
  text-decoration: underline;
}

code { margin-right: 20px; }
code.execute::before {
  content: '>';
  padding-right: 8px;
  font-size: 0.8em;
}

footer {
  color: #999;
  text-transform: uppercase;
  font-size: 0.7em;
  margin-top: 60px;
}

.highlightable-input {
  height: auto;
  padding: 20px;
  border: 1px SOLID #ddd;
  border-radius: 4px;
}

[data-placeholder]:empty:before {
  content: attr(data-placeholder);
  color: #888;
  font-style: italic;
}
</style>

<style>
.icon {
  background-size: contain;
  background-repeat: no-repeat;
  padding: 2px 2px 2px 28px;
  border: 1px SOLID #000;
  border-radius: 4px;
}
.hamburger { background-image: url('../assets/icons8-hamburger-30.png'); }
.pizza { background-image: url('../assets/icons8-pizza-30.png'); }
.taco { background-image: url('../assets/icons8-taco-30.png'); }
</style>