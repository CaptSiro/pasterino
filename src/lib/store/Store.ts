import { CopyPasta } from "../../@types";



export default interface Store {
    getAll(): CopyPasta[],
    save(cp: CopyPasta[]): void,
}