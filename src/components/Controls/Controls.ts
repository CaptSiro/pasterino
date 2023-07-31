import { _, Button, Div } from "../../lib/tungsten/jsml";
import { controls } from "./Controls.styles";
import UxButton from "../UX/Button/Button";



export default function Controls(): HTMLElement {
    return Div(_, [
        UxButton(() => {}, "Add"),
        UxButton(() => {}, "Import"),
        UxButton(() => {}, "Export"),
    ], { style: controls });
}