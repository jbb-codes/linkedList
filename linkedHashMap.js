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
    this.size = 0;
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

      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    list.size++;
    this.size++;
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
      list.size--;
      this.size--;
      return true;
    }

    while (current.next) {
      previous = current;
      current = current.next;
      if (current.key === key) {
        previous.next = current.next;
        list.size--;
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  keys() {
    const allKeys = [];

    for (const list of this.buckets) {
      if (list) {
        allKeys.push(list.head.key);
        while (list.next) {
          allKeys.push(list.next.key);
        }
      }
    }
    return allKeys;
  }

  values() {
    const allValues = [];

    for (const list of this.buckets) {
      if (list) {
        allValues.push(list.head.value);
        while (list.next) {
          allValues.push(list.next.value);
        }
      }
    }
    return allValues;
  }

  entries() {
    let allPairs = [];

    for (const list of this.buckets) {
      if (list) {
        allPairs.push([list.head.key, list.head.value]);
        while (list.next) {
          allPairs.push(list.next([list.next.key, list.next.value]));
        }
      }
    }
    return allPairs;
  }
}
