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
                set: (value) => {
                    this.state[key] = value
                    this.assign()
                }
            })

            this[key] = initial[key]
        }

        this.assign()
    }

    assign() {
        this.root.innerHTML = ''
        this.root.appendChild(compile(this.render()))
    }

    init() {
        return {}
    }

    render() {}
}
