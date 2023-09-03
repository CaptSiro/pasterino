import "./KeyCap.css";
import { Div } from "../../lib/tungsten/jsml";
import Impulse from "../../lib/Impulse";



export type KeyCapSize = "letter" | "medium" | "long" | "extra-long"



const keyLookUp: Record<string, KeyCapSize> = {
    "backspace": "long",
    "enter": "long",
    "shift": "long",
    "space": "extra-long",
    "caps": "medium",
    "capslock": "medium",
    "tab": "medium",
    "alt": "medium",
}



export default function KeyCap(key: string, press?: Impulse<boolean>, color?: string): HTMLElement {
    const keyCap = (
        Div("p-key-cap " + (keyLookUp[key.toLowerCase()] ?? "letter"), [
            Div("p-key-cap-inner", key)
        ])
    );

    if (color !== undefined) {
        keyCap.style.setProperty("--p-key-cap-color", color);
    }



    press?.listen(isPressed => {
        keyCap.classList.toggle("pressed", isPressed);
    });



    return keyCap;
}