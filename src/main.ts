import expBackoff from "./lib/exp-backoff";
import getDefaultStore from "./lib/store/get-default-store";



export let chatInput: HTMLElement;

const store = getDefaultStore();



async function main() {
    const input = await expBackoff(() => {
        return document.querySelector("[data-a-target='chat-input']") ?? undefined;
    });

    if (input === undefined || !(input instanceof HTMLElement)) {
        return;
    }

    chatInput = input as HTMLElement;
}



window.addEventListener("load", main);