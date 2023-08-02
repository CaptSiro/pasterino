import "./Pasterino.css";
import { Div } from "../../lib/tungsten/jsml";
import { Keyboard } from "../../lib/Keyboard";
import Controls from "../Controls/Controls";
import CopyPastaView from "../CopyPastasView/CopyPastaView";
import Platform from "../../platform/Platform";
import { url } from "../../lib/location-listener";
import { hideWidget, toggleWidgetVisibility } from "./widget-visibility";
import Selector from "../../lib/Selector";
import ctrlSpaceVisibility from "./registers/ctrl-space-visibility";
import enterSubmit from "./registers/enter-submit";
import shiftDeleteRemove from "./registers/shift-delete-remove";
import arrowUpPrevious from "./registers/arrow-up-previous";
import arrowDownNext from "./registers/arrow-down-next";
import escapeHide from "./registers/escape-hide";
import { store } from "../../main";
import usePrompt from "../../hooks/use-prompt";



export default function Pasterino(chatInput: HTMLElement, platform: Platform): HTMLElement {
    const prompt = usePrompt(platform);

    const selector = new Selector(store.getAll(), Div("p-copy-pasta-view"), prompt);

    const { bottom, right } = calculatePosition(chatInput.getBoundingClientRect());

    const widget = Div("pasterino-root", [
        Controls(),
        CopyPastaView(selector)
    ]);



    widget.style.setProperty("--bottom", bottom);
    widget.style.setProperty("--right", right);



    const onLocationChange = () => toggleWidgetVisibility(widget, true);

    url.removeListener(onLocationChange);
    url.listen(onLocationChange);



    const resize = onResize(widget, chatInput);

    window.removeEventListener("resize", resize);
    window.addEventListener("resize", resize);



    const middleware = new Keyboard()
        .register({
            key: " ",
            modifiers: ["ctrl"],
            onPress: ctrlSpaceVisibility(widget)
        })
        .register({
            key: "Escape",
            onPress: escapeHide(widget)
        })
        .register({
            key: "Enter",
            onPress: enterSubmit(widget, selector, platform)
        })
        .register({
            key: "Delete",
            modifiers: ["shift"],
            onPress: shiftDeleteRemove(widget, selector)
        })
        .register({
            key: "ArrowUp",
            onPress: arrowUpPrevious(widget, selector)
        })
        .register({
            key: "ArrowDown",
            onPress: arrowDownNext(widget, selector)
        });

    chatInput.removeEventListener("keydown", middleware.eventHandler, { capture: true });
    chatInput.addEventListener("keydown", middleware.eventHandler, { capture: true });



    const outsideEventHandler = hideOnOutsideEvent(widget, chatInput);

    window.removeEventListener("pointerdown", outsideEventHandler);
    window.addEventListener("pointerdown", outsideEventHandler);

    window.removeEventListener("keydown", outsideEventHandler);
    window.addEventListener("keydown", outsideEventHandler);



    return widget;
}



function calculatePosition(rect: DOMRect): { readonly bottom: string, readonly right: string } {
    return {
        bottom: Math.round(window.innerHeight - rect.bottom) + "px",
        right: Math.round((window.innerWidth - rect.right) + rect.width + 20) + "px",
    };
}



function onResize(widget: HTMLElement, chatInput: HTMLElement) {
    return () => {
        const { bottom, right } = calculatePosition(chatInput.getBoundingClientRect());

        widget.style.setProperty("--bottom", bottom);
        widget.style.setProperty("--right", right);
    };
}



function hideOnOutsideEvent(widget: HTMLElement, chatInput: HTMLElement): (event: Event) => any {
    return evt => {
        const t = evt.target;

        if (!(t instanceof HTMLElement)) {
            return;
        }

        if (widget.contains(t) || chatInput.contains(t)) {
            return;
        }

        hideWidget(widget);
    };
}