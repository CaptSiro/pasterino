import { pasterino } from "../main";



export default function useDialog(dialog: HTMLDialogElement): HTMLDialogElement {
    const widget = pasterino.value();

    if (widget === undefined) {
        pasterino.listen(w => w.append(dialog));
    } else {
        widget.append(dialog);
    }

    return dialog;
}