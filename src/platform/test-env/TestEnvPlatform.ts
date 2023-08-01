import Platform from "../Platform";



export default class TestEnvPlatform implements Platform {
    setChatInput(data: string): void {
        const chatInput = document.querySelector(`[data-a-target="chat-input"]`);

        if (chatInput === null) {
            return;
        }

        chatInput.textContent = data;
    }
}