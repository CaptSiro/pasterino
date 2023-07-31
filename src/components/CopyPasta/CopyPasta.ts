import { CopyPasta } from "../../@types";
import { _, Div, Span } from "../../lib/tungsten/jsml";
import { copyPastaContent, copyPastaSearch, copyPastaStyles } from "./CopyPasta.styles";



export default function CopyPasta(cp: CopyPasta): HTMLElement {
    return (
        Div(_, [
            Span(_, cp.content, { style: copyPastaContent }),
            Span(_, cp.keywords.join(", "), { style: copyPastaSearch })
        ], { style: copyPastaStyles })
    );
}