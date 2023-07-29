import Store from "./Store";
import { CopyPasta } from "../../@types";



export const STORAGE_KEY = "pasterino::copypastas";



export default class LocalStore implements Store {
    getAll(): CopyPasta[] {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    }

    save(cp: CopyPasta[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cp));
    }
}