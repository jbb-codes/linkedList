# HashMap Implementations

This project provides two different HashMap implementations in JavaScript: a basic HashMap using array-based collision resolution and a LinkedHashMap using linked list chaining.

## Project Overview

- `hashmap.js`: Implements a basic HashMap where collisions are handled by storing multiple key-value pairs in an array at each bucket.
- `linkedHashMap.js`: Implements a HashMap that uses linked list chaining to handle collisions, where each bucket contains a linked list of nodes.

The main difference between these implementations is how they handle hash collisions. The basic HashMap stores colliding entries in an array within the bucket, while the LinkedHashMap creates a chain of linked nodes.

## Implementation Details

### Common Features
Both implementations share the following characteristics:
- Initial capacity of 16 buckets
- Load factor of 0.75 (triggers resize when 75% full)
- Dynamic resizing (doubles capacity when load factor is exceeded)
- Common operations: set, get, remove, has, clear, keys, values, entries

### HashMap (hashmap.js)
- Uses arrays to store multiple key-value pairs in each bucket
- Each bucket contains an array of [key, value] pairs
- Collision resolution by linear probing within the bucket's array

### LinkedHashMap (linkedHashMap.js)
- Uses a linked list to chain entries in each bucket
- Each node contains a key, value, and reference to the next node
- Collision resolution by appending new nodes to the chain

## Testing Instructions

### Prerequisites
- Node.js installed on your machine

### Running the Tests
1. Clone the repository
2. Open a terminal in the project directory
3. Run the test file:
```bash
node main.js
```

### Example Usage

```javascript
// Import the desired implementation
import { HashMap } from './hashmap.js';
// OR
import { LinkedHashMap } from './linkedHashMap.js';

// Create a new instance
const map = new LinkedHashMap(16);

// Add key-value pairs
map.set("apple", "red");
map.set("banana", "yellow");
map.set("carrot", "orange");

// Retrieve values
console.log(map.get("apple"));  // Output: "red"

// Check if key exists
console.log(map.has("banana")); // Output: true

// Remove an entry
map.remove("carrot");

// Get all keys
console.log(map.keys());        // Output: ["apple", "banana"]

// Get all values
console.log(map.values());      // Output: ["red", "yellow"]

// Get all entries
console.log(map.entries());     // Output: [["apple", "red"], ["banana", "yellow"]]
```

### Testing Collision Handling
To test collision handling, you can add keys that hash to the same bucket. The hash function uses a multiplicative hash with a prime number (31) and the string character codes.

For example:
```javascript
// These keys might hash to the same bucket
map.set("cat", "meow");
map.set("tac", "reverse");
```

### Testing Capacity Management
The HashMap automatically resizes when the number of entries exceeds 75% of the capacity:
```javascript
// Create a small HashMap
const map = new HashMap(4);

// Add items until resize triggers
map.set("a", 1);
map.set("b", 2);
map.set("c", 3);
map.set("d", 4); // This will trigger a resize

console.log(map.getCapacity()); // Output: 8
```

## Performance Considerations

### Time Complexity
Both implementations achieve O(1) average case time complexity for basic operations:
- set: O(1) average, O(n) worst case
- get: O(1) average, O(n) worst case
- remove: O(1) average, O(n) worst case
- has: O(1) average, O(n) worst case

### When to Use Each Implementation

#### Use HashMap when:
- Memory efficiency is a priority
- You expect few collisions
- Your keys have a good distribution

#### Use LinkedHashMap when:
- You expect many collisions
- Memory usage is less critical
- You need predictable worst-case performance

The LinkedHashMap implementation may use more memory due to the overhead of storing node references, but it can handle collisions more gracefully as the chains can grow indefinitely without affecting other buckets.

