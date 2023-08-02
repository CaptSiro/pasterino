import "./KeyCap.css";
import { Div } from "../../lib/tungsten/jsml";



export type KeyCapSize = "letter" | "medium" | "long" | "extra-long"



export default function KeyCap(key: string, size: KeyCapSize = "letter"): HTMLElement {
    return (
        Div("p-key-cap " + size,
            Div("p-key-cap-inner", key)
        )
    );
}