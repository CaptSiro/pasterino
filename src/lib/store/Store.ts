import { CopyPasta } from "../../@types";
import Impulse from "../Impulse";



export default interface Store {
    getAll(): CopyPasta[],
    items(): Impulse<CopyPasta[]>,
    save(cp: CopyPasta[]): void,
    add(cp: CopyPasta): void;
}