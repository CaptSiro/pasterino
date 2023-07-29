import Store from "./Store";
import LocalStore from "./LocalStore";



export default function getDefaultStore(): Store {
    return new LocalStore();
}