import "./CopyPastaDialog.css";
import { Component, Div, Label, Span } from "../../lib/tungsten/jsml";
import UIButton from "../UI/Button/Button";
import { pasterino } from "../../main";
import getStore from "../../store/get-store";
import UITextArea from "../UI/TextArea/TextArea";
import UIInput from "../UI/Input/Input";
import { ShortcutRegistry } from "../../lib/ShortcutRegistry";



export default function CopyPastaDialog(title: string): HTMLDialogElement {
    const content = UITextArea();
    const tags = UIInput("text", {
        placeholder: "clueless lulw sadge..."
    });
    const channel = UIInput("text", {
        placeholder: "Leave empty to be globally accessible"
    });



    const clear = () => {
        content.value = "";
        tags.value = "";
        channel.value = "";
    }

    const submit = () => {
        if (content.value.trim() === "") {
            return;
        }

        getStore().add({
            id: 0,
            content: content.value.trim(),
            tags: tags.value.trim().split(" ").filter(str => str !== ""),
            channel: channel.value.trim() === ""
                ? undefined
                : channel.value.trim()
        });

        clear();
        dialog.close();
    }



    const shortcuts = new ShortcutRegistry()
        .register({
            key: "Enter",
            onPress: submit,
            preventDefault: true,
        })
        .register({
            key: "Escape",
            onPress: () => {
                clear();
                dialog.close();
            },
            preventDefault: true
        })



    const dialog = (
        Component("dialog", "p-dialog", [
            Div("p-dialog-wrapper", [
                Span("p-dialog-legend", title),
                Div("p-dialog-content", [
                    Label("p-copy-pasta-content", [
                        "Copy-pasta content",
                        content
                    ]),
                    Label("p-copy-pasta-tags", [
                        "Copy-pasta tags (space separated)",
                        tags
                    ]),
                    Label("p-copy-pasta-channel", [
                        "Channel where will copy-pasta be available",
                        channel
                    ]),
                ]),
                Div("p-dialog-controls", [
                    UIButton(() => {
                        clear();
                        dialog.close();
                    }, "Cancel"),
                    UIButton(submit, "Submit"),
                ])
            ]),
        ], {
            onKeyDown: shortcuts.eventHandler,
            onPointerDown: (evt: MouseEvent) => {
                const box = dialog.getBoundingClientRect();
                const x = evt.clientX;
                const y = evt.clientY;

                const isOutsideOfDialog = (x < box.x || box.x + box.width < x) || (y < box.y || box.y + box.height < y);

                if (isOutsideOfDialog) {
                    clear();
                    dialog.close();
                }
            }
        })
    );



    return dialog;
}



export function useCopyPastaDialog(title: string): HTMLDialogElement {
    const dialog = CopyPastaDialog(title);
    const widget = pasterino.value();

    if (widget === undefined) {
        pasterino.listen(w => w.append(dialog));
    } else {
        widget.append(dialog);
    }

    return dialog;
}