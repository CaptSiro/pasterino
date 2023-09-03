import Store from "./Store";
import LocalStore from "./LocalStore";



const store = new LocalStore();

export default function getStore(): Store {
    return store;
}