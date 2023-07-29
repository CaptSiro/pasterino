import sleep from "./sleep";

export default async function expBackoff<T>(fn: () => undefined | T, retries = 5): Promise<undefined | T> {
    let v;
    let retry = 0;

    do {
        v = fn();
        await sleep(2 ^ retry * 1_000);
    } while (v === undefined && retry < retries);

    return v;
}