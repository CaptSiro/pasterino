import UIButton from "../UI/Button/Button";
import { useCopyPastaDialog } from "../CopyPastaDialog/CopyPastaDialog";



export default function CopyPastaAdd(): HTMLElement {
    const dialog = useCopyPastaDialog("Add new copy pasta");

    return (
        UIButton(() => dialog.showModal(), "Add")
    );
}