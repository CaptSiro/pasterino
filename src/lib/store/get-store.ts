import Store from "./Store";
import TestStore from "./TestStore";



export default function getStore(): Store {
    return new TestStore();
}