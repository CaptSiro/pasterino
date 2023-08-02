import Impulse from "../lib/Impulse";
import Platform from "../platform/Platform";



const prompt = new Impulse<string>({ pulseOnDuplicate: false });

let boundPromptListener = false;



export default function usePrompt(platform: Platform): Impulse<string> {
    if (boundPromptListener) {
        return prompt;
    }

    const bindTo = platform.getPromptElement();

    if (bindTo !== undefined) {
        bindTo.addEventListener("keyup", () => {
            prompt.pulse(bindTo.textContent?.trim() ?? "");
        });
    }

    return prompt;
}