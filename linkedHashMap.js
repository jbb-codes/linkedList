class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(node) {
    this.head = node;
  }
}

export class LinkedHashMap {
  constructor(capacity) {
    this.capacity = capacity || 16;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;
    const keyString = String(key);
    let primeNumber = 31;

    for (let i = 0; i < keyString.length; i++) {
      hashCode =
        (hashCode * primeNumber + keyString.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);
    let list = this.buckets[index];
    let node = new Node(key, value);

    if (this.buckets[index] === null) {
      list = new LinkedList(node);
      this.buckets[index] = list;
    } else {
      let current = list.head;
      let currentHash = this.hash(list.head.key);
      // console.log(currentHash);
      // if (currentHash === index) {
      // }

      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize(this.capacity * 2);
    }
  }

  resize(newCapacity) {
    const oldBuckets = this.buckets;
    this.capacity = newCapacity;
    this.buckets = new Array(newCapacity).fill(null);
    this.size = 0;

    for (const list of oldBuckets) {
      if (list) {
        let current = list.head;
        this.set(current.key, current.value);
        while (current.next) {
          this.set(current.next.key, current.next.value);
          current = current.next;
        }
      }
    }
  }

  get(key) {
    let index = this.hash(key);
    let list = this.buckets[index];

    if (this.buckets[index] === null) {
      return null;
    }

    let current = list.head;

    if (current.key === key) {
      return current.value;
    }

    while (current.next) {
      current = current.next;
      if (current.key === key) {
        return current.value;
      }
    }
    return null;
  }

  has(key) {
    let index = this.hash(key);
    let list = this.buckets[index];

    if (this.buckets[index] === null) {
      return false;
    }

    let current = list.head;

    if (current.key === key) {
      return true;
    }

    while (current.next) {
      current = current.next;
      if (current.key === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    let index = this.hash(key);
    let list = this.buckets[index];

    if (this.buckets[index] === null) {
      return false;
    }

    let current = list.head;
    let previous;

    if (current.key === key) {
      if (current.next === null) {
        this.buckets[index] = null; // test list.head = null
      } else {
        current = current.next;
        this.buckets[index] = current;
      }
      this.size--;
      return true;
    }

    while (current.next) {
      previous = current;
      current = current.next;
      if (current.key === key) {
        previous.next = current.next;
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  getCapacity() {
    return this.capacity;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  keys() {
    const allKeys = [];

    for (const list of this.buckets) {
      if (list) {
        let current = list.head;
        allKeys.push(current.key);
        while (current.next) {
          allKeys.push(current.next.key);
          current = current.next;
        }
      }
    }
    return allKeys;
  }

  values() {
    const allValues = [];

    for (const list of this.buckets) {
      if (list) {
        let current = list.head;
        allValues.push(current.value);
        while (current.next) {
          allValues.push(current.next.value);
          current = current.next;
        }
      }
    }
    return allValues;
  }

  entries() {
    let allPairs = [];

    for (const list of this.buckets) {
      if (list) {
        let current = list.head;
        allPairs.push([current.key, current.value]);
        while (current.next) {
          allPairs.push([current.next.key, current.next.value]);
          current = current.next;
        }
      }
    }
    return allPairs;
  }
}
