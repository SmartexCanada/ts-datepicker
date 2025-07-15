/**
 * Parse html string
 */
export function parseHTML(html: string): DocumentFragment {
    const template = document.createElement('template');
    template.innerHTML = html;

    return template.content;
}

/**
 * Conditionally join class names together.
 */
export function classNames(...classes: (string | Record<string, boolean> | undefined)[]) {
    let classNames: string[] = [];

    classes.forEach(className => {
        if (typeof className === 'object') {
            for (let name in className) {
                if (className[name]) {
                    classNames.push(name);
                }
            }
        }
        else if (className) {
            classNames.push(className);
        }
    });

    return classNames;
}

/**
 * Find parent element with scrollable overflow
 */
export function findScrollParents(element: HTMLElement): HTMLElement | null {
    const parent = getParent(element);

    if (!parent || parent === document.body) {
        return null;
    }

    return window.getComputedStyle(parent).overflow === 'visible'
        ? findScrollParents(parent)
        : parent;
}

/**
 * Get parent element for given element
 */
export function getParent(element: HTMLElement): HTMLElement | null {
    return element.parentElement
        || (element.parentNode instanceof ShadowRoot ? element.parentNode.host as HTMLElement : null);
}

/**
 * Return computed text direction of given element
 */
export function getTextDirection(element: Element) {
    return window.getComputedStyle(element).direction;
}
