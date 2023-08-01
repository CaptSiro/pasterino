import "./CopyPasta.css";
import { CopyPasta } from "../../@types";
import { _, Div, Span } from "../../lib/tungsten/jsml";
import { $$ } from "../../lib/tungsten/domx";



export default function CopyPasta(cp: CopyPasta): HTMLElement {
    const container = Div("p-copy-pasta", [
        Span("p-content", cp.content),
        Span("p-keywords", cp.keywords.join(", "))
    ]);



    container.addEventListener("pointerenter", () => {
        const selected = $$<HTMLElement>(".p-copy-pasta.selected");

        for (let i = 0; i < selected.length; i++) {
            selected[i].classList.remove("selected");
        }

        container.classList.add("selected");
    });



    return container;
}