import { SearchQuerySuccess } from "../search-parser/@search-types";
import { Tag } from "../../@types";



export default function collectTags(result: SearchQuerySuccess): Tag[] {
    const tags: Tag[] = [];

    for (const name in result.properties) {
        for (let j = 0; j < result.properties[name].length; j++) {
            const prop = result.properties[name][j];

            if (!(prop.value instanceof Array)) {
                continue;
            }

            for (let k = 0; k < prop.value.length; k++) {
                tags.push({
                    name: prop.value[k],
                    exclude: prop.symbol === "!="
                });
            }
        }
    }

    return tags;
}