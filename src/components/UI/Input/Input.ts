import "./Input.css";
import { _, ComponentOptions, Input, InputTypes } from "../../../lib/tungsten/jsml";



export default function UIInput(type: InputTypes, options: ComponentOptions = {}): HTMLInputElement {
    return Input(type, "p-ui-input", options);
}