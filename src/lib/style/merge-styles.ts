import { Styles } from "../../@types";



export default function mergeStyles(base: Styles, ...styles: Styles[]): Styles {
    const copy: Styles = { ...base };

    for (let i = 0; i < styles.length; i++) {
        const s = styles[i];

        for (const prop in s) {
            copy[prop] = s[prop];
        }
    }

    return copy;
}