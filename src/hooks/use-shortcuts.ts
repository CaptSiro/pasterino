import { ShortcutRegistry } from "../lib/ShortcutRegistry";
import Selector from "../lib/Selector";
import ctrlSpaceVisibility from "../shortcuts/ctrl-space-visibility";
import escapeHide from "../shortcuts/escape-hide";
import enterSubmit from "../shortcuts/enter-submit";
import shiftDeleteRemove from "../shortcuts/shift-delete-remove";
import arrowUpPrevious from "../shortcuts/arrow-up-previous";
import arrowDownNext from "../shortcuts/arrow-down-next";



export default function useShortcuts(widget: HTMLElement, selector: Selector): ShortcutRegistry {
    return new ShortcutRegistry()
        .register({
            key: " ",
            modifiers: ["ctrl"],
            onPress: ctrlSpaceVisibility(widget),
            preventDefault: true,
            stopPropagation: true
        })
        .register({
            key: " ",
            modifiers: ["ctrl", "shift"],
            onPress: ctrlSpaceVisibility(widget),
            preventDefault: true,
            stopPropagation: true
        })
        .register({
            key: "Escape",
            onPress: escapeHide(widget)
        })
        .register({
            key: "Enter",
            onPress: enterSubmit(widget, selector)
        })
        .register({
            key: "Delete",
            modifiers: ["shift"],
            onPress: shiftDeleteRemove(widget, selector),
            preventDefault: true,
            stopPropagation: true
        })
        .register({
            key: "ArrowUp",
            onPress: arrowUpPrevious(widget, selector)
        })
        .register({
            key: "ArrowDown",
            onPress: arrowDownNext(widget, selector)
        });
}