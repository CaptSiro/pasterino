import "./CopyPastaAdd.css";
import { Label, Span } from "../../lib/tungsten/jsml";
import UIButton from "../UI/Button/Button";
import getStore from "../../store/get-store";
import UITextArea from "../UI/TextArea/TextArea";
import UIInput from "../UI/Input/Input";
import { ShortcutRegistry } from "../../lib/ShortcutRegistry";
import getPlatform from "../../platform/get-platform";
import UIDialog from "../UI/Dialog/Dialog";
import Impulse from "../../lib/Impulse";
import useDialog from "../../hooks/use-dialog";
import usePrompt from "../../hooks/use-prompt";



export default function CopyPastaAdd(): () => void {
    const prompt = usePrompt();
    const content = UITextArea();
    const tags = UIInput("text", {
        placeholder: "clueless lulw sadge..."
    });
    const channel = UIInput("text", {
        placeholder: "https://www.twitch.tv/btmc"
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

        try {
            const c = channel.value.trim();

            getStore().add({
                id: 0,
                content: content.value.trim(),
                tags: tags.value.trim().split(" ").filter(str => str !== ""),
                channel: c === ""
                    ? undefined
                    : getPlatform().parseChannel(c)
            });

            alert("Added new copy-pasta. You may not see the copy-pasta if you have specified different channel from where you are now");

            clear();
            dialog.close();
        } catch (e) {
            alert("You must provide valid url to the channel where you want to add this copy-pasta.");
        }
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
        UIDialog(
            "Add new copy pasta",
            [
                Label("p-copy-pasta-content", [
                    "Copy-pasta content",
                    content
                ]),
                Label("p-copy-pasta-tags", [
                    "Copy-pasta tags",
                    Span("p-hint", "Separated by space"),
                    tags
                ]),
                Label("p-copy-pasta-channel", [
                    "Copy-pasta channel",
                    Span("p-hint", "Leave empty to make copy-pasta globally accessible"),
                    channel
                ])
            ],
            [
                UIButton(() => {
                    clear();
                    dialog.close();
                }, "Cancel"),
                UIButton(submit, "Submit")
            ],
            {
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
        }
        )
    );

    useDialog(dialog);



    return () => {
        content.value = prompt.value() ?? "";
        dialog.showModal();
    }
}