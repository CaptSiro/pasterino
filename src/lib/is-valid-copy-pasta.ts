export default function isValidCopyPasta(object: unknown): boolean {
    if (typeof object !== "object" || object === null) {
        return false;
    }

    if (!("id" in object) || typeof object.id !== "number") {
        return false;
    }

    if (!("content" in object) || typeof object.content !== "string") {
        return false;
    }

    if (!("tags" in object) || !(object.tags instanceof Array)) {
        return false;
    }

    return !("channel" in object && typeof object.channel !== "string");
}