import Store from "./Store";
import { CopyPasta } from "../../@types";
import Impulse from "../Impulse";



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

        cp.id = items.length;
        items.push(cp);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        this.impulse.pulse(items);
    }

    save(cp: CopyPasta[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cp));
    }
}