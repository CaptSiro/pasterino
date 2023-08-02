import { SearchQuerySuccess } from "./lib/search-parser/@search-types";



export type CopyPasta = {
    id: number,
    content: string,
    tags: string[],
}

export type Styles = Partial<CSSStyleDeclaration>

export type Component<T> = (props: T) => HTMLElement



export type RankerResponse = {
    satisfies: true,
    points: number
} & {
    satisfies: false
}

export type Ranker<T> = (props: T, prompt: SearchQuerySuccess) => RankerResponse