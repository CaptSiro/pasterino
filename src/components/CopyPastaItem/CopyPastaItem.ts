import "./CopyPastaItem.css";
import { CopyPasta } from "../../@types";
import { _, Div, Span } from "../../lib/tungsten/jsml";
import Selector from "../../lib/Selector";



export const ATTR_COPY_PASTA_ID = "data-copy-pasta-id";



export default function CopyPastaItem(copyPasta: CopyPasta, selector: Selector): HTMLElement {
    const container = Div("p-copy-pasta", [
        Span("p-content", copyPasta.content),
        Span("p-tags", copyPasta.tags.join(", "))
    ], {
        [ATTR_COPY_PASTA_ID]: String(copyPasta.id)
    });



    container.addEventListener("pointerenter", () => {
        selector.select(copyPasta.id);
    });



    return container;
}



export function select(element: HTMLElement): void {
    element.classList.add("selected");
}



export function deselect(element: HTMLElement): void {
    element.classList.remove("selected");
}



export function isSelected(element: HTMLElement): boolean {
    return element.classList.contains("selected");
}