import { compact } from './element.js'

const buildProps = (element, props) => {
    for (const propName in props) {
        if (propName[0] === '@') {
            element.addEventListener(propName.slice(1), props[propName])
        } else {
            element.setAttribute(propName, props[propName])
        }
    }

    return element
}

function buildElements(children) {
    return children.map((child) => {
        if (typeof child === 'object') {
            let element

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
                let tagName
                if (typeof child.tag === 'string') {
                    element = document.createElement(child.tag)
                } else {
                    if (child.tag.isClass) {
                        if (
                            customElements.get(child.tag.uniqueName) ===
                            undefined
                        ) {
                            customElements.define(
                                child.tag.uniqueName,
                                child.tag
                            )
                        }
                        tagName = child.tag.uniqueName
                    } else {
                        const elementClass = compact(child.tag)
                        if (
                            customElements.get(elementClass.uniqueName) ===
                            undefined
                        ) {
                            customElements.define(
                                elementClass.uniqueName,
                                elementClass
                            )
                        }

                        tagName = elementClass.uniqueName
                    }

                    element = document.createElement(tagName)
                }
            }
            element = buildProps(element, child.props)

            if (child.children.length >= 1) {
                const childElements = buildElements(child.children)
                for (const childElement of childElements) {
                    element.appendChild(childElement)
                }
            }

            return element
        } else {
            const element = document.createDocumentFragment()
            element.textContent = child

            return element
        }
    })
}

export const compile = (elements) => {
    let root = document.createDocumentFragment()

    if (!Array.isArray(elements)) {
        elements = [elements]
    }

    for (const child of buildElements(elements)) {
        root.appendChild(child)
    }

    return root
}
