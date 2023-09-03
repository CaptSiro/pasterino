import "./SelfPromo.css";
import { Div } from "../../lib/tungsten/jsml";
import UIButton from "../UI/Button/Button";
import CopyPastaAdd from "../CopyPastaAdd/CopyPastaAdd";



export default function SelfPromo(): HTMLElement {
    return (
        Div("p-self-promo", [
            UIButton(redirect, "Pasterino"),
            Div("p-controls", [
                CopyPastaAdd(),
            ])
        ])
    );
}



function redirect() {
    window.open("https://github.com/CaptSiro");
}