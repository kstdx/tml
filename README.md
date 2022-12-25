# tml

Tagged markup language

> Updated to v1.0!

# What's new in v1.0

Increment button in new style element:

```js
const App = compact(function () {
    this.init({ count: 0 })

    return $`
    <button @click=${() => this.$count++}>increment</button>
    <p>${this.$count}</p>
    `
})
```

Helloworld:

```js
const HelloWorld = compact(() => $`<h1>Hello, world!</h1>`)

const App = compact(() => $`<${HelloWorld} />`)
```

1. **Function elements**

Function elements allow for more concise code descriptions than traditional class elements. Also, `init()` and `effect()` have been reworked to be function element-first. Now you can use arrow functions only when you do not use state or effect in function elements. If you use them, please use the traditional functions.

2. **Easy elements**

Previously, you had to register each element as a Web Component with `customElements.define()` to define a component, but now you can define components using the htm notation(like `<${Element}>`)! How nifty is this!

3. **states' name**

Until now, if you created a state named `count` with `this.init({ count: 0 })`, you could access it with `this.count`, but with this format, there was a danger of name collisions when the number of properties in the class increased, so from now on you can use this However, this format was in danger of causing name conflicts when the number of class properties increased, so from now on, names can be accessed with a leading `$` symbol, such as `this.$count`.

4. The root element is no longer needed

Until now, when you wanted to describe multiple elements, you had to use `<>` like in JSX, but now you can enumerate as many elements as you want without `<>`.

## Use in large projects

To be honest, the performance is not yet perfect, but it is lightweight and simple, making it suitable for large-scale projects. However, it is not well suited for form creation as bidirectional bindings have not yet been developed.

# Example

```js
<hello-world text="Hello, world!"></hello-world>

<script type="module">
    import { $, compact, TMLElement } from '/src/mod.js'

    const HelloWorld = (props) => $`<h1>${props.text}</h1>`

    const App = function () {
        this.init({
            count: 0
        })

        return $`
        <${HelloWorld} text="Hello, world!" />
        <button @click=${() => this.$count++}>increment</button>
        <p>${this.$count}</p>
        `
    }

    customElements.define('hello-world', compact(App))
</script>
```

or `/tests/` dir
