import "./Pasterino.css";
import { Div } from "../../lib/tungsten/jsml";
import CopyPastaView from "../CopyPastasView/CopyPastaView";
import { url } from "../../lib/location-listener";
import { hideWidget, toggleWidgetVisibility } from "./widget-visibility";
import Selector from "../../lib/Selector";
import usePrompt from "../../hooks/use-prompt";
import SelfPromo from "../SelfPromo/SelfPromo";
import useShortcuts from "../../hooks/use-shortcuts";
import getStore from "../../lib/store/get-store";



export const CLASS_PASTERINO_WIDGET = "pasterino-root";



export default function Pasterino(chatInput: HTMLElement): HTMLElement {
    const prompt = usePrompt();
    const selector = new Selector(getStore().items(), prompt);



    const widget = Div(CLASS_PASTERINO_WIDGET, [
        SelfPromo(),
        CopyPastaView(selector)
    ]);



    const { bottom, right } = calculatePosition(chatInput.getBoundingClientRect());

    widget.style.setProperty("--bottom", bottom);
    widget.style.setProperty("--right", right);



    const onLocationChange = () => toggleWidgetVisibility(widget, true);

    url.removeListener(onLocationChange);
    url.listen(onLocationChange);



    const resize = onResize(widget, chatInput);

    window.removeEventListener("resize", resize);
    window.addEventListener("resize", resize);



    const shortcuts = useShortcuts(widget, selector);

    chatInput.removeEventListener("keydown", shortcuts.eventHandler, { capture: true });
    chatInput.addEventListener("keydown", shortcuts.eventHandler, { capture: true });



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