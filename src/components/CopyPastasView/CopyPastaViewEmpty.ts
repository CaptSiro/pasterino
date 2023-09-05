import "./CopyPastaViewEmpty.css";
import { _, Div, Span } from "../../lib/tungsten/jsml";
import CopyPastaAdd from "../CopyPastaAdd/CopyPastaAdd";
import UIButton from "../UI/Button/Button";



export default function CopyPastaViewEmpty(): HTMLElement {
    const open = CopyPastaAdd();

    return (
        Div("p-copy-pasta-view-empty", [
            Div(_, [
                Span(_, "No pasta?"),
                UIButton(open, "Add"),
                Span(_, "first copy pasta!")
            ])
        ])
    );
}