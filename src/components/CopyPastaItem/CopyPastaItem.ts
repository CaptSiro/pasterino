import "./CopyPastaItem.css";
import { CopyPasta } from "../../@types";
import { _, Div, Span } from "../../lib/tungsten/jsml";
import Selector from "../../lib/Selector";
import KeyCap from "../KeyCap/KeyCap";
import { CLASS_PASTERINO_WIDGET } from "../Pasterino/Pasterino";
import isVisible from "../Pasterino/widget-visibility";
import Platform from "../../platform/Platform";
import getPlatform from "../../platform/get-platform";
import Impulse from "../../lib/Impulse";



export const ATTR_COPY_PASTA_ID = "data-copy-pasta-id";



export default function CopyPastaItem(copyPasta: CopyPasta, selector: Selector): HTMLElement {
    const press = new Impulse<boolean>();
    const onClick = (evt: MouseEvent) => {
        const t = evt.target;

        if (!(t instanceof HTMLElement)) {
            return;
        }

        const widget = t.closest<HTMLElement>("." + CLASS_PASTERINO_WIDGET);

        if (widget === null || !isVisible(widget)) {
            return;
        }

        getPlatform().setChatInput(copyPasta.content);
    }



    const container = Div("p-copy-pasta", [
        Div("p-copy-pasta-content", [
            Span("p-content", copyPasta.content),
            Span("p-tags", copyPasta.tags.join(", ")),
        ]),
        Div("p-abs",
            KeyCap("Enter", press)
        )
    ], {
        [ATTR_COPY_PASTA_ID]: String(copyPasta.id),
        onClick,
        onPointerDown: () => press.pulse(true),
        onPointerUp: () => press.pulse(false),
        onPointerLeave: () => press.pulse(false),
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