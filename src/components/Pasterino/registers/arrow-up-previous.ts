import Selector from "../../../lib/Selector";
import { KeyboardRegister } from "../../../lib/Keyboard";
import isVisible from "../widget-visibility";



export default function arrowUpPrevious(widget: HTMLElement, selector: Selector): KeyboardRegister["onPress"] {
    return () => {
        if (!isVisible(widget)) {
            return;
        }

        selector.previous();
    };
}