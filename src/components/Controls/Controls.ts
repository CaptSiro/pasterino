import "./Controls.css";
import { Div } from "../../lib/tungsten/jsml";
import UxButton from "../UX/Button/Button";



export default function Controls(): HTMLElement {
    return Div("p-controls", [
        UxButton(() => {}, "Add"),
        UxButton(() => {}, "Import"),
        UxButton(() => {}, "Export"),
    ]);
}