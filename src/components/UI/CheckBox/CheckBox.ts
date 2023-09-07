import "./CheckBox.css";
import { _, Input, Label } from "../../../lib/tungsten/jsml";
import Impulse from "../../../lib/Impulse";



export default function UICheckBox(label: string, impulse: Impulse<boolean>): HTMLLabelElement {
    const input = Input("checkbox", _, {
        onChange: () => {
            impulse.pulse(input.checked)
        }
    });

    return (
        Label("p-ui-check-box", [
            input,
            label
        ])
    );
}