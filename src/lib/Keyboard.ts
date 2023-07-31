type Modifiers = "ctrl" | "shift" | "alt";



export type KeyboardRegister = {
    onPress: (event: KeyboardEvent) => any,
    key: KeyboardEvent["key"],
    modifiers?: Modifiers[],
    preventDefault?: boolean,
    stopPropagation?: boolean,
}



export class Keyboard {
    private readonly registers: KeyboardRegister[] = [];

    register(r: KeyboardRegister): Keyboard {
        this.registers.push(r);
        return this;
    }

    private handler(event: KeyboardEvent): void {
        for (let i = 0; i < this.registers.length; i++) {
            const r = this.registers[i];

            if (r.key.toLowerCase() !== event.key.toLowerCase()) {
                continue;
            }

            if (r.modifiers?.includes("ctrl") && !event.ctrlKey) {
                continue;
            }

            if (r.modifiers?.includes("shift") && !event.shiftKey) {
                continue;
            }

            if (r.modifiers?.includes("alt") && !event.altKey) {
                continue;
            }

            const rModCount = r.modifiers !== undefined
                ? r.modifiers.length
                : 0;

            const eventModCount = Number(event.altKey) + Number(event.shiftKey) + Number(event.ctrlKey);

            if (rModCount !== eventModCount) {
                continue;
            }

            r.onPress(event);

            if (r.preventDefault) {
                event.preventDefault();
            }

            if (r.stopPropagation) {
                event.stopPropagation();
                return;
            }
        }
    }

    get eventHandler() {
        return this.handler.bind(this);
    }
}