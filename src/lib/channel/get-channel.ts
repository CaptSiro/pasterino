import { SearchQuerySuccess } from "../search-parser/@search-types";



export default function getChannel(result: SearchQuerySuccess): string {
    for (const name in result.properties) {
        if (name !== "channel" || result.properties[name].length < 1) {
            continue;
        }

        return result.properties[name][0].value;
    }

    return "";
}