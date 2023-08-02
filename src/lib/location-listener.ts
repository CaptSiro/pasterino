import Impulse from "./Impulse";



export const url = new Impulse<string>({
    pulseOnDuplicate: false
});



export default function bindLocationListener(): void {
    const observer = new MutationObserver(() => {
        url.pulse(window.location.href);
    });

    const title = document.head.querySelector("title");
    if (title === null) {
        return;
    }

    observer.observe(title, {
        childList: true,
        subtree: true,
        characterData: true
    });

    window.addEventListener('beforeunload', () => {
        observer.disconnect();
    });
}