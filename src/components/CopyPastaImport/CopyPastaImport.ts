import "./CopyPastaImport.css";
import UIDialog from "../UI/Dialog/Dialog";
import UIButton from "../UI/Button/Button";
import { _, Label, Span } from "../../lib/tungsten/jsml";
import Impulse from "../../lib/Impulse";
import { CopyPasta } from "../../@types";
import isValidCopyPasta from "../../lib/is-valid-copy-pasta";
import getStore from "../../store/get-store";
import UIFileInput from "../UI/FileInput/FileInput";
import useDialog from "../../hooks/use-dialog";
import Alert from "../Alert/Alert";



export default function CopyPastaImport(): () => void {
    const openImportAlert = Alert("Imported 0 copy-pastas", "imported_copy_pasta")
    const parsed = new Impulse<CopyPasta[]>();

    const reader = new FileReader();
    reader.addEventListener('load', (evt) => {
        const r = evt.target?.result ?? null;

        if (typeof r !== "string") {
            return alert("Invalid file");
        }

        try {
            const p = JSON.parse(r);

            if (!(p instanceof Array)) {
                return alert("Invalid file");
            }

            const cps = [];
            for (let i = 0; i < p.length; i++) {
                if (isValidCopyPasta(p[i])) {
                    cps.push(p[i]);
                }
            }

            parsed.pulse(cps);
        } catch (e) {
            alert("There is syntax error inside provided .json file");
            console.log(e);
        }
    });

    const file = UIFileInput({ accept: ".json" });



    const clear = () => {
        file.value = "";
    }

    const submit = UIButton(() => {}, "Import", { disabled: true });

    file.addEventListener("change", () => {
        if (file.files === null) {
            return;
        }

        reader.readAsText(file.files[0]);
    });
    parsed.listen(cps => {
        submit.setAttribute("disabled", String(cps.length !== 0));
        submit.textContent = `Import ${cps.length} copy-pasta${cps.length > 1 ? "s" : ""}`;
    });



    const dialog = UIDialog(
        "Import copy-pastas from file",
        [
            Span(_, "Select .json file which contains your copy-pastas"),
            Label("p-dialog-label import-file", [
                "Select file",
                file
            ])
        ],
        [
            UIButton(() => {
                clear();
                dialog.close();
            }, "Cancel"),
            submit
        ]
    );

    useDialog(dialog);



    submit.addEventListener("pointerdown", () => {
        const cps = parsed.value();

        if (cps === undefined) {
            alert("You have not selected file");
            return;
        }

        if (cps.length === 0) {
            alert("File does not contain any copy-pastas");
            return;
        }

        getStore().merge(cps);

        openImportAlert(`Imported ${cps.length} copy-pastas`);

        clear();
        dialog.close();
    });



    return () => {
        dialog.showModal();
    }
}