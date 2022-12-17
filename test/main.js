import htm from 'https://unpkg.com/htm?module'
import { tag, compile } from '/src/mod.js'

const t = htm.bind(tag)

const items = ['Apple', 'Orange', 'Melon', 'Lemon']

const app = t`
    <>
        <button $click=${() => console.log(items)}>Click to log</button>
        <ul>
            ${items.map((item) => t`<li>${item}</li>`)}
        </ul>
        <div></div>
    </>
`

console.log(app)

document.querySelector('#root').appendChild(compile(app))
