import { Shortcut } from "../lib/ShortcutRegistry";
import { hideWidget } from "../components/Pasterino/widget-visibility";



export default function escapeHide(widget: HTMLElement): Shortcut["onPress"] {
    return () => {
        hideWidget(widget);
    };
}