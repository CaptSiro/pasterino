import Selector from "../../../lib/Selector";
import { KeyboardRegister } from "../../../lib/Keyboard";
import isVisible from "../widget-visibility";



export default function shiftDeleteRemove(widget: HTMLElement, selector: Selector): KeyboardRegister["onPress"] {
    return () => {
        if (!isVisible(widget)) {
            return;
        }

        console.log("remove", selector.getSelected());
    };
}