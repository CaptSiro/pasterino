export default function stringCompare(pattern: string, string: string): boolean {
    if (pattern.length === 0) {
        return true;
    }

    let patternPtr = 0;

    for (let i = 0; i < string.length; i++) {
        if (string[i] === pattern[patternPtr]) {
            patternPtr++;
        }

        if (patternPtr === pattern.length) {
            return true;
        }
    }

    return false;
}