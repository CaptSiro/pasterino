import "./Pasterino.css";
import { Div } from "../../lib/tungsten/jsml";
import { Keyboard } from "../../lib/Keyboard";
import Controls from "../Controls/Controls";
import CopyPastaView from "../CopyPastasView/CopyPastaView";
import Platform from "../../platform/Platform";
import { url } from "../../lib/location-listener";
import isVisible, { toggleWidgetVisibility } from "./widget-visibility";



export default function Pasterino(chatInput: HTMLElement, platform: Platform): HTMLElement {
    const { bottom, right } = calculatePosition(chatInput.getBoundingClientRect());

    const widget = Div("pasterino-root", [
        Controls(),
        CopyPastaView()
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
            onPress: () => {
                if (isVisible(widget)) {
                    widget.style.display = "none";
                    return;
                }

                widget.style.display = "flex";
            }
        })
        .register({
            key: "Enter",
            onPress: () => {
                if (!isVisible(widget)) {
                    return;
                }

                // set selected copy pasta
            }
        })
        .register({
            key: "Delete",
            modifiers: ["shift"],
            onPress: () => {
                console.log("remove copy-pasta");
            }
        })
        .register({
            key: "ArrowUp",
            onPress: () => {
                console.log("previous copy-pasta");
            }
        })
        .register({
            key: "ArrowDown",
            onPress: () => {
                console.log("next copy-pasta");
            }
        })

    chatInput.removeEventListener("keydown", middleware.eventHandler, { capture: true });
    chatInput.addEventListener("keydown", middleware.eventHandler, { capture: true });



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
        widget.style.bottom = bottom;
        widget.style.right = right;
    };
}