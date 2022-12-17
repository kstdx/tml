const buildProps = (element, props) => {
    for (name in props) {
        if (name[0] === ':') {
            element.addEventListener(name.slice(1), props[name])
        } else {
            element.setAttribute(name, props[name])
        }
    }

    return element
}

export const tag = (tag, props, ...children) => {
    if (props === null) {
        props = {}
    }

    return { tag, props, children }
}
