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



export default function KeyCap(key: string, press: Impulse<boolean>): HTMLElement {
    const keyCap = (
        Div("p-key-cap " + (keyLookUp[key.toLowerCase()] ?? "letter"),
            Div("p-key-cap-inner", key)
        )
    );



    press.listen(isPressed => {
        keyCap.classList.toggle("pressed", isPressed);
    });



    return keyCap;
}