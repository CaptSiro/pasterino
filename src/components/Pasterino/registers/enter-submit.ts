import { KeyboardRegister } from "../../../lib/Keyboard";
import isVisible, { hideWidget } from "../widget-visibility";
import Selector from "../../../lib/Selector";
import getPlatform from "../../../platform/get-platform";



export default function enterSubmit(widget: HTMLElement, selector: Selector): KeyboardRegister["onPress"] {
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

        getPlatform().setChatInput(content);
    };
}