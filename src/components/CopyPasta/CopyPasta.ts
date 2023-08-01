import "./CopyPasta.css";
import { CopyPasta } from "../../@types";
import { _, Div, Span } from "../../lib/tungsten/jsml";
import { $$ } from "../../lib/tungsten/domx";
import Selector, { SELECTOR_TOKEN } from "../../lib/Selector";
import { TokenNamespace } from "../../lib/tungsten/token";



const namespace = new TokenNamespace();



export default function CopyPasta(copyPasta: CopyPasta, selector: Selector): HTMLElement {
    const container = Div("p-copy-pasta", [
        Span("p-content", copyPasta.content),
        Span("p-keywords", copyPasta.keywords.join(", "))
    ], {
        [SELECTOR_TOKEN]: namespace.create(),
    });



    container.addEventListener("pointerenter", () => {
        const token = container.dataset.token;

        if (token === undefined) {
            return;
        }

        selector.select(token);
    });



    return container;
}