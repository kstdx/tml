# tml

Tagged markup language

# What's new in v1.4

1. states' name
   Previously `this.$name` becomes `this.state.name`.

# Example

> Counter script

```js
<hello-world text="Hello, world!"></hello-world>

<script type="module">
    import { compact } from 'https://cdn.jsdelivr.net/gh/kstdx/tml@1.4/dist/tml.min.js'

    const HelloWorld = ($) => $.html`<h1>${$.props.text}</h1>`

    const App = ($) => {
        $.init({
            count: 0
        })

        return $.html`
            <${HelloWorld} text="Hello, world!" />
            <button @click=${() => $.state.count++}>increment</button>
            <p>${$.state.count}</p>
        `
    }

    customElements.define('hello-world', compact(App))
</script>

```
