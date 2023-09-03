import Platform from "../Platform";



export default class TestEnvPlatform implements Platform {
    getChannel(url: string | undefined): string {
        if (url === undefined) {
            return "";
        }

        return new URL(url).searchParams.get("c") ?? "btmc";
    }

    getPromptElement(): HTMLElement | undefined {
        return this.getChatInput();
    }

    getChatInput(): HTMLElement | undefined {
        return document.querySelector<HTMLElement>(`[data-a-target="chat-input"]`) ?? undefined;
    }

    setChatInput(data: string): void {
        const chatInput = document.querySelector(`[data-a-target="chat-input"]`);

        if (chatInput === null) {
            return;
        }

        chatInput.textContent = data;
    }
}