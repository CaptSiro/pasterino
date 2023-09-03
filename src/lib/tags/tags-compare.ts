import { Tag } from "../../@types";
import stringCompare from "../string-compare";



export default function tagsCompare(tagsOnItem: string[], tags: Tag[]): boolean {
    if (tagsOnItem.length === 0 || tags.length === 0) {
        return true;
    }

    let mustHaveCount = 0;
    let actuallyHasCount = 0;

    for (let i = 0; i < tags.length; i++) {
        let includesTag = false;

        for (let j = 0; j < tagsOnItem.length; j++) {
            if (stringCompare(tags[i].name.toLowerCase(), tagsOnItem[j].toLowerCase())) {
                includesTag = true;
                break;
            }
        }

        if (tags[i].exclude) {
            if (includesTag) {
                return false;
            }

            continue;
        }

        mustHaveCount++;

        if (includesTag) {
            actuallyHasCount++;
        }
    }

    return mustHaveCount === actuallyHasCount;
}