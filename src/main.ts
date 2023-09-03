import Pasterino from "./components/Pasterino/Pasterino";
import { $ } from "./lib/tungsten/domx";
import getPlatform from "./platform/get-platform";
import bindLocationListener from "./lib/location-listener";
import Impulse from "./lib/Impulse";



export const pasterino = new Impulse<HTMLElement>();



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

    const widget = Pasterino(input);

    document.body.append(widget);
    pasterino.pulse(widget);
}



window.addEventListener("load", async () => {
    window.addEventListener("keydown", main);

    bindLocationListener();
    //
    // const r = await fetch("http://localhost/pasterino-server/auth/set-cookie?s=" + localStorage.getItem("s"), {
    //     method: "get",
    //     credentials: "include"
    // });
    //
    // const cookies = await r.json();
    // console.log("set cookie", cookies);
}, { once: true });