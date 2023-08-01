export function $<T extends Element = Element>(css: string): T | null {
    return document.querySelector<T>(css);
}

export function $$<T extends Element = Element>(css: string): NodeListOf<T> {
    return document.querySelectorAll<T>(css);
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