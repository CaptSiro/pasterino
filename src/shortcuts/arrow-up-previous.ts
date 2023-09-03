import Selector from "../lib/Selector";
import { Shortcut } from "../lib/ShortcutRegistry";
import isVisible from "../components/Pasterino/widget-visibility";



export default function arrowUpPrevious(widget: HTMLElement, selector: Selector): Shortcut["onPress"] {
    return (evt) => {
        if (!isVisible(widget)) {
            return;
        }

        evt.preventDefault();
        evt.stopPropagation();

        selector.previous();
    };
}