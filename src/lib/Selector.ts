import scrollIntoViewIfNeeded from "./tungsten/scroll-if-needed";
import { CopyPasta } from "../@types";
import CopyPastaItem, { deselect, select } from "../components/CopyPastaItem/CopyPastaItem";
import Impulse from "./Impulse";
import { SearchParser } from "./search-parser/SearchParser";
import { equalsSymbols, list } from "./search-parser/validators";
import stringCompare from "./string-compare";
import collectTags from "./tags/collect-tags";
import tagsCompare from "./tags/tags-compare";
import wordGenerator from "./word-generator";



const search = new SearchParser({
    tokenDelimiter: " ",
    relationSymbols: equalsSymbols,
    propertyMap: {
        tag: list()
    }
});

const ATTR_SELECTOR_IGNORE = "data-p-selector-ignore";

type SelectorItem = {
    copyPasta: CopyPasta,
    element: HTMLElement
}



export default class Selector {
    private size: number;
    private pointer: number;
    private readonly items: SelectorItem[];
    private selected: SelectorItem | undefined;
    private parent: HTMLElement | undefined;



    get current(): SelectorItem | undefined {
        return this.selected;
    }



    constructor(items: CopyPasta[], private readonly prompt: Impulse<string>) {
        this.items = [];
        this.size = 0;
        this.pointer = 0;

        for (let i = 0; i < items.length; i++) {
            this.items.push({
                copyPasta: items[i],
                element: CopyPastaItem(items[i], this)
            });
        }
    }



    assertParentDefined() {
        if (this.parent === undefined) {
            throw new Error("Can not use this object until parent is defined");
        }
    }

    setParent(parent: HTMLElement) {
        this.parent = parent;

        for (let i = 0; i < this.items.length; i++) {
            this.parent.append(this.items[i].element);
        }

        this.size = this.items.length;
        this.pointer = 0;
        this.selected = this.items[this.pointer];

        if (this.selected !== undefined) {
            select(this.selected.element);
        }

        const listener = this.query.bind(this);
        this.prompt.removeListener(listener);
        this.prompt.listen(this.query.bind(this));
    }



    select(id: number): void {
        this.assertParentDefined();

        const i = this.items.findIndex(i => i.copyPasta.id === id);

        if (i === -1) {
            return;
        }

        this.selectByIndex(i);
    }

    private selectByIndex(i: number): void {
        this.assertParentDefined();

        const item = this.items[i];

        if (item === undefined || item.element.hasAttribute(ATTR_SELECTOR_IGNORE)) {
            return;
        }

        if (this.selected !== undefined) {
            deselect(this.selected.element);
        }

        this.selected = item;
        this.pointer = i;

        select(this.selected.element);
    }



    next(): void {
        this.scroll(() => {
            if (++this.pointer >= this.items.length) {
                this.pointer = 0;
            }
        });
    }

    previous(): void {
        this.scroll(() => {
            if (--this.pointer < 0) {
                this.pointer = this.items.length - 1;
            }
        });
    }

    private scroll(movePointer: () => void): void {
        this.assertParentDefined();

        if (this.size === 0 || this.size === 1) {
            return;
        }

        do {
            movePointer();

            const e = this.items[this.pointer].element;

            if (e.hasAttribute(ATTR_SELECTOR_IGNORE)) {
                continue;
            }

            this.selectByIndex(this.pointer);
            break;
        } while (true);

        scrollIntoViewIfNeeded(this.items[this.pointer].element, this.parent!);
    }



    private query(prompt: string): void {
        const result = search.parse(prompt);

        if (result.type === "error") {
            //todo handle error
            console.log(result);
            return;
        }

        for (const child of this.parent!.children) {
            if (!(child instanceof HTMLElement)) {
                continue;
            }

            deselect(child);
        }

        this.selected = undefined;
        this.pointer = 0;

        let firstToPass = -1;
        this.size = 0;

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            if (!Selector.compareContent(result.unnamed, item.copyPasta.content)) {
                deselect(item.element);
                Selector.ignore(item.element);
                continue;
            }

            const tags = collectTags(result);

            if (!tagsCompare(item.copyPasta.tags, tags)) {
                deselect(item.element);
                Selector.ignore(item.element);
                continue;
            }

            if (firstToPass === -1) {
                firstToPass = i;
            }

            Selector.acknowledge(item.element);
            this.size++;
        }

        if (firstToPass !== -1) {
            select(this.items[firstToPass].element);
            this.pointer = firstToPass;
            this.selected = this.items[this.pointer];
        }
    }



    static compareContent(patterns: string[], content: CopyPasta["content"]): boolean {
        if (patterns.length === 0 || content.length === 0) {
            return true;
        }

        let patternPtr = 0;

        for (const word of wordGenerator(content.toLowerCase())) {
            if (stringCompare(patterns[patternPtr].toLowerCase(), word)) {
                patternPtr++;
            }

            if (patternPtr === patterns.length) {
                return true;
            }
        }

        return false;
    }



    static ignore(element: HTMLElement): void {
        element.setAttribute(ATTR_SELECTOR_IGNORE, "");
    }

    static acknowledge(element: HTMLElement): void {
        element.removeAttribute(ATTR_SELECTOR_IGNORE);
    }
}