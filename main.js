// import { createLinkedList } from "./script.js";
// import { HashMap } from "./hashmap.js";
import { LinkedHashMap } from "./linkedHashMap.js";
// example uses class syntax - adjust as necessary

const test = new LinkedHashMap(16); // or HashMap() if using a factory

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
test.set(-134, "negative");
test.set("mouslkhkhkhkjhkhjhjkhe", "grey");
test.set("bat", "black");
test.set("moon", "silver");

// console.log(test.get("cat"));

// console.log(test.has("lions"));

// console.log(test.remove("carrot"));

// console.log(test.getCapacity());
// console.log(test.length());

// console.log(test.getCapacity());

// console.log(test.keys());
// console.log(test.values());
console.log(test.entries());
