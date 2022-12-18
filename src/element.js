import { compile } from './compile.js'

export class TMLElement extends HTMLElement {
    state = {}
    root = this.attachShadow({ mode: 'open' })
    props = {}

    constructor() {
        super()

        for (const name of this.getAttributeNames()) {
            this.props[name] = this.getAttribute(name)
        }

        const initial = this.init()
        for (const key in initial) {
            Object.defineProperty(this, key, {
                get: () => {
                    return this.state[key]
                },
                set: async (value) => {
                    this.state[key] = value
                    await this.assign()
                }
            })

            this[key] = initial[key]
        }
    }

    async connectedCallback() {
        await this.effect()
        await this.assign()
    }

    async assign() {
        const dom = await this.render()

        this.root.innerHTML = ''
        this.root.appendChild(compile(dom))
    }

    init() {
        return {}
    }

    effect() {}

    render() {}
}
