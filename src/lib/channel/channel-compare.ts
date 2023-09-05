import stringCompare from "../string-compare";



export default function channelCompare(globalChannel: string, channelOnItem: string, searchChannel: string): boolean {
    if (searchChannel === "*") {
        return true;
    }

    searchChannel = searchChannel.toLowerCase();

    if ((globalChannel === "")
        || (channelOnItem === "" && searchChannel === "")
        || (channelOnItem === globalChannel && searchChannel === "")) {
        return true;
    }

    if (searchChannel === "" || channelOnItem === "") {
        return false;
    }

    return stringCompare(searchChannel.toLowerCase(), channelOnItem);
}