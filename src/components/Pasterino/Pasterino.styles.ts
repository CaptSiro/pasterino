import { Styles } from "../../@types";
import { borderRadius } from "../Root.styles";



export const visibleDisplayValue = "flex";
export const invisibleDisplayValue = "none";



export const pasterinoStyles: Styles = {
    position: "fixed",
    backgroundColor: "#223",
    color: "white",
    zIndex: "100000",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "16px",
    borderRadius,
    width: "300px",
    height: "50vh"
}