import "./CopyPastaViewEmpty.css";
import { _, Div, Span } from "../../lib/tungsten/jsml";
import CopyPastaAdd from "../CopyPastaAdd/CopyPastaAdd";



export default function CopyPastaViewEmpty(): HTMLElement {
    return (
        Div("p-copy-pasta-view-empty", [
            Div(_, [
                Span(_, "No pasta?"),
                CopyPastaAdd(),
                Span(_, "first copy pasta!")
            ])
        ])
    );
}