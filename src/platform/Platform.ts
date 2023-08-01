export default interface Platform {
    setChatInput(data: string): void;
    getChatInput(): HTMLElement | undefined;
}