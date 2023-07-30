export function $(css: string): Element | null {
    return document.querySelector(css);
}

export function $$(css: string): NodeListOf<Element> {
    return document.querySelectorAll(css);
}

export function untilElement(selector: string): Promise<Element | null> {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}