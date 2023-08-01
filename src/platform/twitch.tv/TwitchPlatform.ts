import Platform from "../Platform";



type ChatInput = {
    props: {
        onChange(t: {
            target: { value: string }
        }): void;
    }
}



export default class TwitchPlatform implements Platform {
    setChatInput(data: string): void {
        this.getChatInputReact().props.onChange({
            target: { value: data }
        });
    }

    getChatInput(): HTMLElement | undefined {
        return document.querySelector<HTMLElement>('.chat-input__textarea') ?? undefined;
    }

    // source 7tv
    getChatInputReact(): ChatInput {
        return this.getAutocompleteHandler()?.componentRef;
    }

    getAutocompleteHandler() {
        const node = this.findReactChildren(
            this.getReactInstance(document.querySelector('.chat-input__textarea')),
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

    getReactInstance(el: Element | null): { [x: string]: any; } | undefined {
        for (const k in el) {
            if (k.startsWith('__reactInternalInstance$')) {
                return (el as any)[k] as any;
            }
        }
    }
}