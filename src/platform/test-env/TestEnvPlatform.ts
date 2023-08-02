import Platform from "../Platform";



export default class TestEnvPlatform implements Platform {
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