import { Styles } from "../../@types";
import { createCSSString } from "../tungsten/jsml";



export default function changeStyle(element: HTMLElement, style: Styles): () => any {
    return () => {
        for (const prop in style) {
            element.style[prop] = style[prop] as string;
        }
    };
}