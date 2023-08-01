import { KeyboardRegister } from "../../../lib/Keyboard";
import { hideWidget } from "../widget-visibility";



export default function escapeHide(widget: HTMLElement): KeyboardRegister["onPress"] {
    return () => {
        hideWidget(widget);
    };
}