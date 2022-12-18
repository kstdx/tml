> WIP

```html
<hello-world text="Hello, world!"></hello-world>
<script type="module">
    import { $, TMLElement } from '/src/mod.js'

    class HelloWorld extends TMLElement {
        init() {
            return {
                count: 0
            }
        }

        render() {
            return $`
            <>
                <h1>${this.props.text}</h1>
                <button :click=${() => this.count++}>increment</button>
                <p>${this.count}</p>
            </>
            `
        }
    }

    customElements.define('hello-world', HelloWorld)
</script>

```

# tml
tagged markup language