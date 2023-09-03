import Platform from "../Platform";



type ChatInput = {
    props: {
        onChange(t: {
            target: { value: string }
        }): void;
    }
}



export default class TwitchPlatform implements Platform {
    parseChannel(channel: string): string {
        return this.getChannel(channel);
    }

    getChannelHint(): string {
        return "https://www.twitch.tv/btmc";
    }

    getChannel(url: string | undefined): string {
        if (url === undefined) {
            return "";
        }

        const path = new URL(url).pathname.split("/");

        for (let i = path.length - 1; i >= 0; i--) {
            if (path[i] === "") {
                continue;
            }

            return path[i];
        }

        return "";
    }

    getPromptElement(): HTMLElement | undefined {
        return document.querySelector<HTMLElement>('[data-a-target="chat-input"][contenteditable=true]') ?? undefined;
    }

    setChatInput(data: string): void {
        this.getChatInputReact()?.props.onChange({
            target: { value: data }
        });
    }

    getChatInput(): HTMLElement | undefined {
        return document.querySelector<HTMLElement>('.chat-input__textarea') ?? undefined;
    }

    // source: 7tv
    getChatInputReact(): ChatInput {
        return this.getAutocompleteHandler()?.componentRef;
    }

    getAutocompleteHandler() {
        const node = this.findReactChildren(
            this.getReactInstance(this.getChatInput()),
            (n: any) => n.stateNode.providers
        );

        return node?.stateNode;
    }

    findReactChildren(node: any, predicate: any, maxDepth = 15, depth = 0): any | null {
        let success = false;
        try { success = predicate(node); } catch (_) {}
        if (success) return node;
        if (!node || depth > maxDepth) return null;

        const { child, sibling } = node;
        if (child || sibling) {
            return this.findReactChildren(child, predicate, maxDepth, depth + 1) || this.findReactChildren(sibling, predicate, maxDepth, depth + 1);
        }

        return null;
    }

    getReactInstance(element: HTMLElement | undefined): Record<string, any> | undefined {
        if (element === undefined) {
            return;
        }

        for (const key in element) {
            if (key.startsWith('__reactInternalInstance$')) {
                return (element as any)[key] as any;
            }
        }
    }
}