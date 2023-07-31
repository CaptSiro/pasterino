import { Styles } from "../../@types";



export default function changeStyle(element: HTMLElement, style: Styles): () => any {
    return () => {
        for (const prop in style) {
            element.style[prop] = style[prop] as string;
        }
    };
}