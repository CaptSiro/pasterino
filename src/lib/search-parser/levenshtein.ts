export function distance(string1: string, string2: string): number {
    if (string1.length === 0) {
        return string2.length
    }

    if (string2.length === 0) {
        return string1.length
    }

    const bufferSize = string1.length + 1;
    const matrix = new Uint32Array((string2.length + 1) * bufferSize);

    for (let i = 0; i <= string2.length; i++) {
        matrix[i * bufferSize] = i;

        for (let j = 1; j <= string1.length; j++) {
            if (i === 0) {
                matrix[j] = j;
                continue;
            }

            matrix[i * bufferSize + j] = Math.min(
                matrix[(i - 1) * bufferSize + j] + 1,
                matrix[i * bufferSize + j - 1] + 1,
                matrix[(i - 1) * bufferSize + j - 1] + (string1[j - 1] === string2[i - 1] ? 0 : 1)
            );
        }
    }

    return matrix[matrix.length - 1];
}



export function closest(string: string, values: string[]): -1 | number {
    if (values.length === 0) {
        return -1;
    }

    let min = Number.MAX_SAFE_INTEGER;
    let index = -1;

    for (let i = 0; i < values.length; i++) {
        const dist = distance(string, values[i]);

        if (dist > min) {
            continue;
        }

        min = dist;
        index = i;
    }

    return index;
}