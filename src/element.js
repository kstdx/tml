import { compile } from './compile.js'
import { html } from './tag.js'

export class TMLElement extends HTMLElement {
    static isClass = true
    static uniqueName = 'x-' + Math.random().toString(16).slice(2)

    #state = {}
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
        const dom = await this.render(this)

        this.root.innerHTML = ''
        this.root.appendChild(compile(dom))
    }

    init(data) {
        if (!this.isInited) {
            this.isInited = true

            for (const key in data) {
                Object.defineProperty(this.state, key, {
                    get: () => {
                        return this.#state[key]
                    },
                    set: async (value) => {
                        this.#state[key] = value
                        await this.assign()
                    }
                })

                this.#state[key] = data[key]
            }
        }
    }

    async effect(func) {
        if (!this.isEffected) {
            this.isEffected = true

            await func()
        }
    }
}

export const compact = (func) => {
    const elementClass = class extends TMLElement {}
    elementClass.prototype.html = html
    elementClass.prototype.render = func

    return elementClass
}
