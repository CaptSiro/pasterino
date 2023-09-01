import "./Button.css";
import { Component, ComponentContent, ComponentOptions } from "../../../lib/tungsten/jsml";



export default function UIButton(action: (evt: MouseEvent) => any, content: ComponentContent, options: ComponentOptions = {}): HTMLElement {
    options.onPointerDown = action;
    return Component("button", "p-ux-button", content, options);
}