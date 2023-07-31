import { _, Div } from "../../lib/tungsten/jsml";
import { $ } from "../../lib/tungsten/domx";
import { Keyboard } from "../../lib/Keyboard";
import isVisible from "../../lib/isVisible";
import { Styles } from "../../@types";
import mergeStyles from "../../lib/style/mergeStyles";
import { pasterinoStyles } from "./Pasterino.styles";
import Controls from "../Controls/Controls";
import CopyPastaView from "../CopyPastasView/CopyPastaView";



export default function Pasterino(chatInput: HTMLElement): HTMLElement {
    const position = calculatePosition(chatInput.getBoundingClientRect()) as Styles;

    const widget = Div("pasterino-root", [
        Controls(),
        CopyPastaView()
    ], { style: mergeStyles(pasterinoStyles, position) });



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
            onPress: (evt) => {
                if (!isVisible(widget)) {
                    return;
                }


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



function hideOnChannelChange() {
    const widget = $(".pasterino-root");

    if (widget === null) {
        return;
    }

    if (!(widget instanceof HTMLElement)) {
        return;
    }

    widget.style.display = "none";
}



function onResize(widget: HTMLElement, chatInput: HTMLElement) {
    return () => {
        const { bottom, right } = calculatePosition(chatInput.getBoundingClientRect());
        widget.style.bottom = bottom;
        widget.style.right = right;
    };
}



function onKeyUp(widget: HTMLElement, chatInput: HTMLElement) {
    return () => {

    }
}