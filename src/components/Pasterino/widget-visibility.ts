import { invisibleDisplayValue, visibleDisplayValue } from "./Pasterino.styles";



export function toggleWidgetVisibility(widget: HTMLElement, force?: boolean): void {
    if (force !== undefined) {
        if (force) {
            showWidget(widget);
        } else {
            hideWidget(widget);
        }

        return;
    }

    if (widget.style.display === invisibleDisplayValue) {
        showWidget(widget);
    } else {
        hideWidget(widget);
    }
}



export function hideWidget(widget: HTMLElement): void {
    widget.style.display = invisibleDisplayValue;
}



export function showWidget(widget: HTMLElement): void {
    widget.style.display = visibleDisplayValue;
}



export default function isVisible(widget: HTMLElement): boolean {
    return getComputedStyle(widget).display === visibleDisplayValue;
}