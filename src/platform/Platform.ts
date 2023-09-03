export default interface Platform {
    setChatInput(data: string): void;

    getChatInput(): HTMLElement | undefined;

    getPromptElement(): HTMLElement | undefined;

    // ui(): PlatformUI interface which includes common ui components for specific platform

    getChannel(url: string | undefined): string;
}