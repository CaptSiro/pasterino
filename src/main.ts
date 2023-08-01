import getDefaultStore from "./lib/store/get-default-store";
import Pasterino from "./components/Pasterino/Pasterino";
import { $ } from "./lib/tungsten/domx";
import getPlatform from "./platform/get-platform";
import bindLocationListener from "./lib/location-listener";



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

    bindLocationListener();
}, { once: true });