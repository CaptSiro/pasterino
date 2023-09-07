import UIDialog from "../UI/Dialog/Dialog";
import { Div } from "../../lib/tungsten/jsml";
import UICheckBox from "../UI/CheckBox/CheckBox";
import Impulse from "../../lib/Impulse";
import UIButton from "../UI/Button/Button";
import useDialog from "../../hooks/use-dialog";



const SETTINGS_KEY = "pasterino::settings";



export default function Alert(message: string, key: string): (message?: string) => void {
    const checked = new Impulse<boolean>();
    checked.listen(v => {
        const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "{}");

        settings.alert ??= {};
        settings.alert[key] = v;

        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    });



    const div = Div("p-message", message);

    const dialog = (
        UIDialog(
            "",
            [
                div,
                UICheckBox("Do not show this again", checked)
            ],
            UIButton(() => dialog.close(), "Ok")
        )
    )

    useDialog(dialog);



    return (msg?: string) => {
        const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "{}");

        if (settings.alert !== undefined && settings.alert[key] === true) {
            return
        }

        if (msg !== undefined) {
            div.textContent = msg;
        }

        dialog.showModal();
    }
}