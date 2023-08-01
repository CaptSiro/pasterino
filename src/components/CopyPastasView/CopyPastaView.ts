import { _, Div } from "../../lib/tungsten/jsml";
import { copyPastaViewStyles, copyPastaViewWrapper } from "./CopyPastaView.styles";
import { store } from "../../main";
import For from "../For";
import CopyPasta from "../CopyPasta/CopyPasta";



export default function CopyPastaView(): HTMLElement {
    return (
        Div(_, [
            Div(_, For(store.getAll(), CopyPasta), { style: copyPastaViewStyles })
        ], { style: copyPastaViewWrapper })
    );
}