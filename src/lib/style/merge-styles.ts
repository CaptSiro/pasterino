import { Styles } from "../../@types";



export default function mergeStyles(base: Styles, ...styles: Styles[]) {
    const copy = { ...base };

    for (let i = 0; i < styles.length; i++) {
        const s = styles[i];

        for (const prop in s) {
            copy[prop] = s[prop];
        }
    }

    return copy;
}