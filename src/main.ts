import Pasterino from "./components/Pasterino/Pasterino";
import { $ } from "./lib/tungsten/domx";
import getPlatform from "./platform/get-platform";
import bindLocationListener from "./lib/location-listener";
import Impulse from "./lib/Impulse";



export const pasterino = new Impulse<HTMLElement>();



async function main(evt: KeyboardEvent) {
    if (!(evt.key === " " && evt.ctrlKey && !evt.altKey) || $(".pasterino-root") !== null) {
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

    const widget = Pasterino(input);

    document.body.append(widget);
    pasterino.pulse(widget);
}



window.addEventListener("load", async () => {
    window.addEventListener("keydown", main);

    bindLocationListener();
}, { once: true });