import { _, Component, ComponentContent, ComponentOptions } from "../../../lib/tungsten/jsml";
import { uxButton, uxButtonHover } from "./Button.styles";
import changeStyle from "../../../lib/style/change-style";



export default function UxButton(action: (evt: MouseEvent) => any, content: ComponentContent, options: ComponentOptions = {}): HTMLElement {
    options.style = uxButton;
    options.onPointerDown = action;

    const button = Component("button", _, content, options);

    button.addEventListener("pointerenter", changeStyle(button, uxButtonHover));
    button.addEventListener("pointerleave", changeStyle(button, uxButton));

    return button;
}