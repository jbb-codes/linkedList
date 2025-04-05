import { createLinkedList } from "./script.js";

// example uses class syntax - adjust as necessary
const list = createLinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

list.insertAt("fish", 3);

console.log(list.toString());
