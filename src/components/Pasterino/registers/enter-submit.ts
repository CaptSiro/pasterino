import { KeyboardRegister } from "../../../lib/Keyboard";
import isVisible from "../widget-visibility";
import Selector from "../../../lib/Selector";
import Platform from "../../../platform/Platform";



export default function enterSubmit(widget: HTMLElement, selector: Selector, platform: Platform): KeyboardRegister["onPress"] {
    return () => {
        if (!isVisible(widget)) {
            return;
        }

        const content = selector.getSelected()
            ?.querySelector(".p-content")
            ?.textContent ?? undefined;

        if (content === undefined) {
            return;
        }

        platform.setChatInput(content);
    };
}