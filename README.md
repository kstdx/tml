# tml

Tagged markup language

# What's new in v1.3

Full-support for arrow functions
The first argument is now registered as `this` of the component itself!
What used to be written as `function(){ this.init() }` can now be rewritten as `(me) => me.init()`.
Also, htm that used to be written as
`` $`<html code />` ``
will now have to be written as
`` me.html`<html code />` ``
Thanks to this, you don't have to import`$` every time you create an external library.

# Example

> Counter script

```js
<hello-world text="Hello, world!"></hello-world>

<script type="module">
    import { compact } from 'https://cdn.jsdelivr.net/gh/kstdx/tml@1.3/dist/tml.min.js'

    const HelloWorld = (me) => me.html`<h1>${me.props.text}</h1>`

    const App = (me) => {
        me.init({
            count: 0
        })

        return me.html`
        <${HelloWorld} text="Hello, world!" />
        <button @click=${() => me.$count++}>increment</button>
        <p>${me.$count}</p>
        `
    }

    customElements.define('hello-world', compact(App))
</script>
```
