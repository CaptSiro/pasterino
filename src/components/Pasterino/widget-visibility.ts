import { $ } from "../../lib/tungsten/domx";



export function toggleWidgetVisibility(widget: HTMLElement, force?: boolean): void {
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