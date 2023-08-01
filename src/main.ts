import getDefaultStore from "./lib/store/get-default-store";
import Pasterino from "./components/Pasterino/Pasterino";
import { $ } from "./lib/tungsten/domx";
import Impulse from "./lib/Impulse";
import getPlatform from "./platform/get-platform";



export const url = new Impulse<string>();

export const store = getDefaultStore();



async function main(evt: KeyboardEvent) {
    if (!(evt.key === " " && evt.ctrlKey) || $(".pasterino-root") !== null) {
        return;
    }

    const t = evt.target;

    if (!(t instanceof HTMLElement)) {
        return;
    }

    const platform = getPlatform();
    const input = platform.getChatInput();

    if (input === undefined) {
        return;
    }

    document.body.append(
        Pasterino(input, platform)
    );
}



window.addEventListener("load", () => {
    window.addEventListener("keydown", main);

    const observer = new MutationObserver(() => {
        console.log(window.location.href);
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
}, { once: true });