export const tag = (tag, props, ...children) => {
    if (props === null) {
        props = {}
    }

    return { tag, props, children }
}
