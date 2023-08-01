import "./CopyPastaView.css";
import { _, Div } from "../../lib/tungsten/jsml";
import { store } from "../../main";
import For from "../For";
import CopyPasta from "../CopyPasta/CopyPasta";
import Selector from "../../lib/Selector";



export default function CopyPastaView(selector: Selector): HTMLElement {
    const view = (
        Div("p-copy-pasta-view", For(store.getAll(), (cp) => CopyPasta(cp, selector)))
    );

    selector.setParent(view);

    return (
        Div("p-copy-pasta-view-wrapper", view)
    );
}