import { clamp } from "./math";
import { freeToken, generateToken } from "./token";
import { untilElement } from "./domx";



export const _ = undefined;
export type ComponentContent = string | Node | ArrayLike<HTMLElement | Node | string> | HTMLElement[] | HTMLCollection | undefined;
export type ComponentOptions = {
    [key: string]: ((event: Event) => any) | any
} & {
    style?: Partial<CSSStyleDeclaration>
}



type Opt<T> = T | undefined;



export function Component<K extends keyof HTMLElementTagNameMap>(tag: K, className: Opt<string>, content: ComponentContent, options: ComponentOptions): HTMLElementTagNameMap[K];
export function Component(tag: string, className: Opt<string>, content: ComponentContent, options: ComponentOptions): HTMLElement;
export function Component(tag: string, className: Opt<string> = undefined, content: ComponentContent = undefined, options: ComponentOptions = {}): any {
    if (options instanceof HTMLElement) {
        console.error(`Can not use HTMLElement as options. Caught at: ${tag}.${className}`);
        return document.createElement(tag);
    }

    const element = document.createElement(tag);

    if (className !== undefined) {
        element.className = className;
    }

    addComponentContent(element, content);

    addComponentOptions(element, options);

    return element;
}

function camelToKebab(string: string): string {
    let buffer = "";

    for (let i = 0; i < string.length; i++) {
        if (string[i] === string[i].toUpperCase()) {
            buffer += "-" + string[i].toLowerCase();
            continue;
        }

        buffer += string[i];
    }

    return buffer;
}

function addComponentOptions(component: Element, options: ComponentOptions): void {
    if (options === undefined) {
        return;
    }

    if (options.style !== undefined) {
        component.setAttribute("style", createCSSString(options.style));
        delete options.style;
    }

    for (const key in options) {
        if (key[0] === "o" && key[1] === "n") {
            component.addEventListener(key.substring(2).toLowerCase(), options[key]);
            continue;
        }

        component.setAttribute(
            camelToKebab(key[0] === "\\"
                ? key.substring(1)
                : key),
            String(options[key])
        );
    }
}

export function createCSSString(styles: Record<string, any>): string {
    let buffer = "";

    for (const key in styles) {
        buffer += `${camelToKebab(key)}: ${styles[key]};`;
    }

    return buffer;
}

function addComponentContent(component: Element, content: ComponentContent): void {
    if (content === undefined) {
        return;
    }

    if (typeof content === "string") {
        component.textContent = content;
    } else if (content instanceof Node) {
        component.append(content);
    } else if (content instanceof Array) {
        for (const node of content) {
            if (node instanceof Node || typeof node === "string") {
                component.append(node);
            }
        }
    }
}



export function Div(className: Opt<string> = undefined, content: ComponentContent = undefined, options: ComponentOptions = {}): HTMLDivElement {
    return Component("div", className, content, options);
}

export function Span(className: Opt<string> = undefined, content: ComponentContent = undefined, options: ComponentOptions = {}): HTMLSpanElement {
    return Component("span", className, content, options);
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export function Heading(level: HeadingLevel, className: Opt<string> = undefined, content: ComponentContent = undefined, options: ComponentOptions = {}): HTMLElement {
    return Component("h" + clamp(1, 6, level), className, content, options);
}

export function Paragraph(className: Opt<string> = undefined, content: ComponentContent = undefined, options: ComponentOptions = {}): HTMLParagraphElement {
    return Component("p", className, content, options);
}

export function Link(href: string, className: Opt<string> = undefined, content: ComponentContent = undefined, options: ComponentOptions = {}): HTMLAnchorElement {
    options.href ||= href;

    return Component("a", className, content, options);
}

export function Img(src: string, alt: string, className: Opt<string> = undefined, options: ComponentOptions = {}): HTMLImageElement {
    options.src ||= src;
    options.alt ||= alt;

    return Component("img", className, _, options);
}

export function Button(className: Opt<string> = undefined, content: ComponentContent = undefined, action: Opt<(event?: Event) => any> = undefined, options: ComponentOptions = {}): HTMLButtonElement {
    if (action !== undefined) {
        options.onclick ||= action;
        options.onsubmit ||= action;
    }

    return Component("button", className, content, options);
}

export function Label(className: Opt<string> = undefined, content: ComponentContent = undefined, options: ComponentOptions = {}): HTMLLabelElement {
    return Component("label", className, content, options);
}

export type InputTypes = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week" | string
export function Input(type: InputTypes, className: Opt<string> = undefined, options: ComponentOptions = {}): HTMLInputElement {
    options.type ||= type;

    return Component("input", className, _, options);
}

export function Checkbox(label: string = "", className: Opt<string> = undefined, id: Opt<string> = undefined, options: ComponentOptions = {}): HTMLLabelElement {
    if (id === undefined) {
        id = generateToken(true);
    }

    options.id ||= id;

    return (
        Label("checkbox-container" + (className ? (" " + className) : ""), [
            Input("checkbox", _, options),
            Span(_, label)
        ], { for: id })
    );
}

export function Radio(label: string, value: string, name: string, className: Opt<string> = undefined, options: ComponentOptions = {}): HTMLLabelElement {
    options.id ||= generateToken(true);
    options.name ||= name;
    options.value ||= value;

    return (
        Label("radio-container" + (className ? (" " + className) : ""), [
            Input("radio", _, options),
            Span(_, label)
        ], { for: options.id })
    );
}



export function Async<P extends HTMLElement>(asyncFunction: () => Promise<(HTMLElement | Node)[] | HTMLElement | HTMLCollection | Node>, placeholder: P | undefined = undefined): P {
    const id = generateToken(true);

    if (placeholder === undefined) {
        placeholder = Div() as any;
    }

    const p = placeholder as HTMLElement;

    p.classList.add(id);

    untilElement("." + id)
        .then(asyncFunction)
        .then(component => {
            if (component instanceof Node) {
                component = [component];
            }

            for (const c of component as HTMLElement[]) {
                p.parentElement?.insertBefore(c, p);
            }

            p.remove();
            freeToken(id);
        });

    return p as any;
}

export function OptionalComponent<C>(expression: true, content: C): C;
export function OptionalComponent<C>(expression: false, content: C): undefined;
export function OptionalComponent<C>(expression: boolean, content: C): C | undefined {
    return (
        expression
            ? content
            : undefined
    );
}

export function OptionalComponents<C>(expression: true, content: C): C;
export function OptionalComponents<C>(expression: false, content: C): [];
export function OptionalComponents<C>(expression: boolean, content: C): C | [] {
    return (
        expression
            ? content
            : []
    );
}



export function HTML(content: string, isCollection: true): NodeListOf<ChildNode>;
export function HTML(content: string, isCollection: false): ChildNode;
export function HTML(content: string, isCollection: boolean = false): any {
    const template = document.createElement("template");
    template.innerHTML = content.trim();

    return isCollection
        ? template.content.childNodes
        : template.content.firstChild;
}
