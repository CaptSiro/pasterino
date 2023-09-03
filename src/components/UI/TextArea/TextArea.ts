import "./TextArea.css";
import { _, Component } from "../../../lib/tungsten/jsml";



export default function UITextArea(): HTMLTextAreaElement {
    return Component("textarea", "p-ui-textarea", _, {
        rows: 8,
        cols: 32
    });
}