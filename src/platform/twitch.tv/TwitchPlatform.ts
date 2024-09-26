import Platform from "../Platform";



type ChatInput = {
    onChange(): void;
    children: any[];
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
        const chatInput= this.getChatInputReact();
        if (chatInput === undefined) {
            console.warn('[Pasterino]: Could not find chat input editor');
            return;
        }

        chatInput.children = [{
            type: 'paragraph',
            children: [{
                type: 'text',
                text: data
            }]
        }];

        chatInput.onChange();
    }

    getChatInput(): HTMLElement | undefined {
        return document.querySelector<HTMLElement>('.chat-input__textarea') ?? undefined;
    }

    // source: 7tv
    getChatInputReact(): ChatInput | undefined {
        return this.getAutocompleteHandler();
    }

    getAutocompleteHandler() {
        const node = this.findReactChildren(
            this.getReactInstance(this.getPromptElement()),
            (n: any) => n.props.node !== undefined
        );

        return node?.props.node;
    }

    findReactChildren(node: any, predicate: any, maxDepth = 15, depth = 0): any | null {
        let success = false;
        try { success = predicate(node); } catch (_) {}
        if (success) return node;
        if (!node || depth > maxDepth) return null;

        if (node.children instanceof Array) {
            for (const child of node.children) {
                if (typeof child !== 'object') {
                    continue;
                }

                const reactNode = this.findReactChildren(child, predicate, maxDepth, depth + 1);
                if (reactNode !== null) {
                    return reactNode;
                }
            }
        } else if (typeof node.children === 'object') {
            return this.findReactChildren(node.children, predicate, maxDepth, depth + 1);
        }

        return null;
    }

    getReactInstance(element: HTMLElement | undefined): Record<string, any> | undefined {
        if (element === undefined) {
            return;
        }

        for (const key in element) {
            if (key.startsWith('__reactProps$')) {
                return (element as any)[key] as any;
            }
        }
    }
}