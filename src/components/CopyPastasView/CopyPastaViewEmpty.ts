import "./CopyPastaViewEmpty.css";
import { _, Div, Span } from "../../lib/tungsten/jsml";
import useDialog from "../../hooks/use-dialog";
import CopyPastaAdd from "../CopyPastaAdd/CopyPastaAdd";
import UIButton from "../UI/Button/Button";



export default function CopyPastaViewEmpty(): HTMLElement {
    const add = useDialog(CopyPastaAdd());



    return (
        Div("p-copy-pasta-view-empty", [
            Div(_, [
                Span(_, "No pasta?"),
                UIButton(() => add.showModal(), "Add"),
                Span(_, "first copy pasta!")
            ])
        ])
    );
}