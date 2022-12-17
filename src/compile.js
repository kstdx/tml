const buildProps = (element, props) => {
    for (const attr in props) {
        if (attr[0] === '$') {
            element.addEventListener(attr.slice(1), props[attr])
        } else {
            element.setAttribute(attr, props[attr])
        }
    }

    return element
}

function buildElements(children) {
    return children.map((child) => {
        if (typeof child === 'object') {
            if (Array.isArray(child)) {
                let element = document.createDocumentFragment()
                if (child.length >= 1) {
                    const childElements = buildElements(child)
                    for (const childElement of childElements) {
                        element.appendChild(childElement)
                    }
                }

                return element
            } else {
                let element = document.createElement(child.tag)
                element = buildProps(element, child.props)

                if (child.children.length >= 1) {
                    const childElements = buildElements(child.children)
                    for (const childElement of childElements) {
                        element.appendChild(childElement)
                    }
                }

                return element
            }
        } else {
            const element = document.createDocumentFragment()
            element.textContent = child

            return element
        }
    })
}

export const compile = (root) => {
    let rootElement
    if (root.tag === '') {
        rootElement = document.createDocumentFragment()
    } else {
        rootElement = document.createElement(root.tag)
    }
    rootElement = buildProps(rootElement, root.props)

    for (const child of buildElements(root.children)) {
        rootElement.appendChild(child)
    }

    return rootElement
}
