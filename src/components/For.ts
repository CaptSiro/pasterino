/**
 * Does **in-memory** mapping of array
 * @param array
 * @param component
 */
export default function For<T>(array: T[], component: (arg: T) => HTMLElement): HTMLElement[] {
    for (let i = 0; i < array.length; i++) {
        //@ts-ignore
        array[i] = component(array[i]);
    }

    return array as HTMLElement[];
}