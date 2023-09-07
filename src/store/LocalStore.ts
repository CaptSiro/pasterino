import Store from "./Store";
import { CopyPasta } from "../@types";
import Impulse from "../lib/Impulse";



export const STORAGE_KEY = "pasterino::copypastas";



export default class LocalStore implements Store {
    private readonly impulse: Impulse<CopyPasta[]>;



    constructor() {
        this.impulse = new Impulse<CopyPasta[]>({
            pulseOnDuplicate: true
        });
    }



    getAll(): CopyPasta[] {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    }

    items(): Impulse<CopyPasta[]> {
        if (this.impulse.value() === undefined) {
            this.impulse.pulse(this.getAll());
        }

        return this.impulse;
    }

    add(cp: CopyPasta) {
        const items = this.impulse.value() ?? [];

        cp.id = 1 + items.reduce((max, current) => Math.max(max, current.id), -1);
        items.push(cp);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        this.impulse.pulse(items);
    }

    delete(id: number) {
        const items = this.impulse.value() ?? [];

        const i = items.findIndex(cp => cp.id === id);

        if (i === -1) {
            return;
        }

        items.splice(i, 1);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        this.impulse.pulse(items);
    }

    save(cp: CopyPasta[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cp));
        this.impulse.pulse(cp);
    }

    merge(cps: CopyPasta[]): void {
        const items = this.getAll();

        for (let i = 0; i < cps.length; i++) {
            const index = items.findIndex(cp => cp.id === cps[i].id);

            if (index === -1) {
                items.push(cps[i]);
                continue;
            }

            cps[i].id = 1 + items.reduce((max, current) => Math.max(max, current.id), -1);
            items.push(cps[i]);
        }

        this.save(items);
    }
}