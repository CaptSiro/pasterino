import "./CopyPastaView.css";
import { _, Div } from "../../lib/tungsten/jsml";
import { store } from "../../main";
import For from "../For";
import CopyPasta from "../CopyPasta/CopyPasta";



export default function CopyPastaView(): HTMLElement {
    return (
        Div("p-copy-pasta-view-wrapper", [
            Div("p-copy-pasta-view", For(store.getAll(), CopyPasta))
        ])
    );
}