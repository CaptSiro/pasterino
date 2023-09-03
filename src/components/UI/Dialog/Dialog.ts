import "./Dialog.css";
import { Component, ComponentContent, ComponentOptions, Div, Span } from "../../../lib/tungsten/jsml";



export default function UIDialog(title: string, content: ComponentContent, controls: ComponentContent, options: ComponentOptions = {}): HTMLDialogElement {
    return (
        Component("dialog", "p-dialog", [
            Div("p-dialog-wrapper", [
                Span("p-dialog-legend", title),
                Div("p-dialog-content", content),
                Div("p-dialog-controls", controls)
            ]),
        ], options)
    );
}