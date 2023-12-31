import { SearchQuerySuccess } from "./lib/search-parser/@search-types";



export type CopyPasta = {
    id: number,
    content: string,
    tags: string[],
    channel?: string
}

export type Tag = {
    name: string,
    exclude: boolean
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