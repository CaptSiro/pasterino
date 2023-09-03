import Impulse from "../lib/Impulse";
import Platform from "../platform/Platform";
import getPlatform from "../platform/get-platform";



const prompt = new Impulse<string>({ pulseOnDuplicate: false });

let boundPromptListener = false;



export default function usePrompt(): Impulse<string> {
    if (boundPromptListener) {
        return prompt;
    }

    const bindTo = getPlatform().getPromptElement();

    if (bindTo !== undefined) {
        bindTo.addEventListener("keyup", () => {
            prompt.pulse(bindTo.textContent?.trim() ?? "");
        });
    }

    return prompt;
}