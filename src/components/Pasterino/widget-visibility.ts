import { $ } from "../../lib/tungsten/domx";



export function toggleWidgetVisibility(force?: boolean): void {
    const widget = $<HTMLElement>(".pasterino-root");

    if (widget === null) {
        return;
    }

    if (force !== undefined) {
        if (force) {
            showWidget(widget);
        } else {
            hideWidget(widget);
        }

        return;
    }

    if (widget.style.display === "none") {
        showWidget(widget);
    } else {
        hideWidget(widget);
    }
}



export function hideWidget(widget: HTMLElement): void {
    widget.style.display = "none";
}



export function showWidget(widget: HTMLElement): void {
    widget.style.display = "flex";
}