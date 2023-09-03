import { _, Component } from "./tungsten/jsml";



export default function download(fileName: string, text: string): void {
    const a = Component("a", _, _, {
        href: 'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
        download: fileName,
        style: {
            display: "none"
        }
    })

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}