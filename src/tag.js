import htm from 'https://unpkg.com/htm?module'

export const tag = (tag, props, ...children) => {
    if (props === null) {
        props = {}
    }

    return { tag, props, children }
}

export const $ = htm.bind(tag)
