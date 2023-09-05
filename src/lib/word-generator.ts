export default function* wordGenerator(string: string) {
    let start = 0;

    for (let i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) !== 32 && string.charCodeAt(i) !== 160) {
            if (i === string.length - 1) {
                yield string.substring(start, i + 1);
            }

            continue;
        }

        yield string.substring(start, i);
        start = i + 1;
    }
}