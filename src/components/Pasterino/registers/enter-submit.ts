import { KeyboardRegister } from "../../../lib/Keyboard";
import isVisible, { hideWidget } from "../widget-visibility";
import Selector from "../../../lib/Selector";
import Platform from "../../../platform/Platform";



export default function enterSubmit(widget: HTMLElement, selector: Selector, platform: Platform): KeyboardRegister["onPress"] {
    return () => {
        if (!isVisible(widget)) {
            return;
        }

        hideWidget(widget);

        const content = selector.getSelected()
            ?.querySelector(".p-content")
            ?.textContent ?? undefined;

        if (content === undefined) {
            return;
        }

        platform.setChatInput(content);
    };
}