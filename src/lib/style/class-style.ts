import { Styles } from "../../@types";
import mergeStyles from "./merge-styles";
import { createCSSString } from "../tungsten/jsml";



const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.attributeName !== "class") {
            continue;
        }

        const t = mutation.target;

        if (!(t instanceof HTMLElement) || t.dataset.csClass === undefined) {
            continue;
        }

        const cssClass = t.dataset.csClass!;

        if (t.classList.contains(cssClass)) {
            t.setAttribute("style", t.dataset.csStyle!);
            continue;
        }

        t.setAttribute("style", t.dataset.csBase!);
    }
});

const observerOptions: MutationObserverInit = {
    attributes: true
};



export default function classStyle(cssClass: string, base: Styles, classStyle: Styles): (e: HTMLElement) => void {
    const compBase = createCSSString(base);
    const compStyle = createCSSString(mergeStyles(base, classStyle));

    return e => {
        e.dataset.csClass = cssClass;
        e.dataset.csBase = compBase;
        e.dataset.csStyle = compStyle;

        observer.observe(e, observerOptions);
    }
}