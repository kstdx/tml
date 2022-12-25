import { compile } from './compile.js'

export class TMLElement extends HTMLElement {
    static uniqueName =
        'x-' +
        Math.random().toString(16).slice(2) +
        '-' +
        Math.random().toString(16).slice(2)

    state = {}
    root = this.attachShadow({ mode: 'open' })
    props = {}

    isInited = false
    isEffected = false

    constructor() {
        super()
    }

    async connectedCallback() {
        for (const name of this.getAttributeNames()) {
            this.props[name] = this.getAttribute(name)
        }

        await this.assign()
    }

    async assign() {
        const dom = await this.render(this.props)

        this.root.innerHTML = ''
        this.root.appendChild(compile(dom))
    }

    init(data) {
        if (!this.isInited) {
            this.isInited = true

            for (const key in data) {
                const stateName = '$' + key

                Object.defineProperty(this, stateName, {
                    get: () => {
                        return this.state[stateName]
                    },
                    set: async (value) => {
                        this.state[stateName] = value
                        await this.assign()
                    }
                })

                this[stateName] = data[key]
            }
        }
    }

    async effect(func) {
        if (!this.isEffected) {
            await func()

            this.isEffected = true
        }
    }

    render() {}
}

export const compact = (func) => {
    const elementClass = class extends TMLElement {}
    elementClass.prototype.render = func

    return elementClass
}
