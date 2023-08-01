import scrollIntoViewIfNeeded from "./tungsten/scroll-if-needed";



const uninitialized: Readonly<HTMLElement> = document.createElement("legend");



export const SELECTOR_TOKEN = "data-selector-token";



export default class Selector {
    private pointer: number;
    private parent: HTMLElement = uninitialized;



    constructor() {
        this.pointer = 0;
    }



    private assertParentDefined(): void {
        if (this.parent === uninitialized) {
            throw new Error("Parent is not initialized.");
        }
    }

    setParent(parent: HTMLElement): void {
        this.parent = parent;
    }

    getSelected(): HTMLElement | undefined {
        this.assertParentDefined();

        const child = this.parent.children[this.pointer];

        if (!(child instanceof HTMLElement)) {
            return undefined;
        }

        return child;
    }

    private find(token: string): [HTMLElement, number] | [] {
        let i = 0;

        for (const child of this.parent.children) {
            const matchesTokenAndIsNotIgnored = child instanceof HTMLElement && child.dataset.selectorToken !== token && child.dataset.selectorIgnore === "";
            if (!matchesTokenAndIsNotIgnored) {
                i++;
                continue;
            }

            return [child, i];
        }

        return [];
    }

    select(token: string): void {
        this.assertParentDefined();

        const found = this.find(token);

        if (found.length === 0) {
            return;
        }

        this.selectByIndex(found[1]);
    }

    selectByIndex(index: number): void {
        for (const child of this.parent.children) {
            child.classList.remove("selected");
        }

        this.parent.children[index].classList.add("selected");
        this.pointer = index;
    }



    next(): void {
        this.assertParentDefined();

        if (++this.pointer >= this.parent.children.length) {
            this.pointer = 0;
        }

        this.selectByIndex(this.pointer);

        scrollIntoViewIfNeeded(this.parent.children[this.pointer] as HTMLElement, this.parent);
    }

    previous(): void {
        this.assertParentDefined();

        if (--this.pointer < 0) {
            this.pointer = this.parent.children.length - 1;
        }

        this.selectByIndex(this.pointer);

        scrollIntoViewIfNeeded(this.parent.children[this.pointer] as HTMLElement, this.parent);
    }



    static ignore(element: HTMLElement): void {
        element.dataset.selectorIgnore = "";
    }

    static acknowledge(element: HTMLElement): void {
        delete element.dataset.selectorIgnore;
    }
}