import { KeyboardRegister } from "../../../lib/Keyboard";
import isVisible, { hideWidget } from "../widget-visibility";
import Selector from "../../../lib/Selector";
import Platform from "../../../platform/Platform";



export default function enterSubmit(widget: HTMLElement, selector: Selector, platform: Platform): KeyboardRegister["onPress"] {
    return (evt) => {
        if (!isVisible(widget)) {
            return;
        }

        hideWidget(widget);

        const content = selector.current?.copyPasta.content;

        if (content === undefined) {
            evt.preventDefault();
            evt.stopImmediatePropagation();

            //todo pop error notification "No copypastas o.O"
            return;
        }

        platform.setChatInput(content);
    };
}