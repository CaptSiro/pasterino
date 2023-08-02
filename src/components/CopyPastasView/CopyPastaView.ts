import "./CopyPastaView.css";
import { _, Div } from "../../lib/tungsten/jsml";
import Selector from "../../lib/Selector";



export default function CopyPastaView(selector: Selector): HTMLElement {
    const view = Div("p-copy-pasta-view");

    selector.setParent(view);

    return (
        Div("p-copy-pasta-view-wrapper", view)
    );
}