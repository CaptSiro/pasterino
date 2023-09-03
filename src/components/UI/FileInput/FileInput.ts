import "./FileInput.css";
import { ComponentOptions, Input } from "../../../lib/tungsten/jsml";



export default function UIFileInput(options: ComponentOptions = {}): HTMLInputElement {
    return Input("file", "p-ui-file-input", options);
}