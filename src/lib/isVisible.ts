export default function isVisible(element: HTMLElement): boolean {
    return getComputedStyle(element).display !== "none";
}