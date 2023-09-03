import Selector from "../lib/Selector";
import { Shortcut } from "../lib/ShortcutRegistry";
import isVisible from "../components/Pasterino/widget-visibility";
import getStore from "../store/get-store";



export default function shiftDeleteRemove(widget: HTMLElement, selector: Selector): Shortcut["onPress"] {
    return () => {
        if (!isVisible(widget) || selector.current === undefined) {
            return;
        }

        getStore().delete(selector.current.copyPasta.id);
    };
}