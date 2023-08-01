import isVisible, { hideWidget, showWidget } from "../widget-visibility";
import { KeyboardRegister } from "../../../lib/Keyboard";



export default function ctrlSpaceVisibility(widget: HTMLElement): KeyboardRegister["onPress"] {
    return () => {
        if (isVisible(widget)) {
            hideWidget(widget);
            return;
        }

        showWidget(widget);
    }
}