import Selector from "../lib/Selector";
import { Shortcut } from "../lib/ShortcutRegistry";
import isVisible from "../components/Pasterino/widget-visibility";



export default function shiftDeleteRemove(widget: HTMLElement, selector: Selector): Shortcut["onPress"] {
    return () => {
        if (!isVisible(widget)) {
            return;
        }

        console.log("remove", selector.current?.copyPasta);
    };
}