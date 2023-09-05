import "./SelfPromo.css";
import { Div } from "../../lib/tungsten/jsml";
import UIButton from "../UI/Button/Button";
import download from "../../lib/download";
import getStore from "../../store/get-store";
import useDialog from "../../hooks/use-dialog";
import CopyPastaAdd from "../CopyPastaAdd/CopyPastaAdd";
import CopyPastaImport from "../CopyPastaImport/CopyPastaImport";



export default function SelfPromo(): HTMLElement {
    const openAdd = CopyPastaAdd();
    const openImport = CopyPastaImport();

    return (
        Div("p-self-promo", [
            UIButton(redirect, "Pasterino"),
            Div("p-controls", [
                UIButton(openAdd, "Add"),
                UIButton(openImport, "Import"),
                UIButton(() => download("pasterino-copy-pastas.json", JSON.stringify(getStore().getAll())), "Export"),
            ])
        ])
    );
}



function redirect() {
    window.open("https://github.com/CaptSiro");
}