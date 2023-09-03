import isVisible, { hideWidget, showWidget } from "../components/Pasterino/widget-visibility";
import { Shortcut } from "../lib/ShortcutRegistry";



export default function ctrlSpaceVisibility(widget: HTMLElement): Shortcut["onPress"] {
    return () => {
        if (isVisible(widget)) {
            hideWidget(widget);
            return;
        }

        showWidget(widget);
    }
}