// import { createLinkedList } from "./script.js";
import { HashMap } from "./hashmap.js";
// example uses class syntax - adjust as necessary

const test = new HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("moon", "silver");
// console.log(test.has("lions"));
console.log(test.remove("moon"));
console.log(test.get("a"));
console.log(test.length());
console.log(test.getCapacity());
console.log(test.entries());

console.log(test.keys());
console.log(test.values());
