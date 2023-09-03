import { Shortcut } from "../lib/ShortcutRegistry";
import isVisible, { hideWidget } from "../components/Pasterino/widget-visibility";
import Selector from "../lib/Selector";
import getPlatform from "../platform/get-platform";



export default function enterSubmit(widget: HTMLElement, selector: Selector): Shortcut["onPress"] {
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