import { _, Div } from "../lib/tungsten/jsml";
import UxButton from "./UX/Button/Button";



export default function SelfPromo(): HTMLElement {
    return (
        Div(_,
            UxButton(redirect, "Pasterino")
        )
    );
}



function redirect() {
    window.open("https://github.com/CaptSiro");
}