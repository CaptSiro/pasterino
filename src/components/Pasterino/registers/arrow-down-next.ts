import Selector from "../../../lib/Selector";
import { KeyboardRegister } from "../../../lib/Keyboard";
import isVisible from "../widget-visibility";



export default function arrowDownNext(widget: HTMLElement, selector: Selector): KeyboardRegister["onPress"] {
    return (evt) => {
        if (!isVisible(widget)) {
            return;
        }

        evt.preventDefault();
        evt.stopPropagation();

        selector.next();
    };
}