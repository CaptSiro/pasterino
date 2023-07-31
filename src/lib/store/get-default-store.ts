import Store from "./Store";
import TestStore from "./TestStore";



export default function getDefaultStore(): Store {
    return new TestStore();
}