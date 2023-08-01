import { $ } from "../../lib/tungsten/domx";



export default function getWidget(): HTMLElement | null {
    return $<HTMLElement>(".pasterino-root");
}