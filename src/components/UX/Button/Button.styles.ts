import { Styles } from "../../../@types";
import mergeStyles from "../../../lib/style/mergeStyles";
import { borderRadius } from "../../Root.styles";



export const uxButton: Styles = {
    backgroundColor: "black",
    color: "white",
    border: "unset",
    padding: "8px",
    borderRadius,
    outline: "0 solid transparent"
}



export const uxButtonHover: Styles = mergeStyles(uxButton, {
    outline: "2px solid white",
    cursor: "pointer"
});