export class HashMap {
  constructor(initCapacity = 16) {
    this.capacity = initCapacity;
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
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];
    const existingEntry = bucket.find((entry) => entry[0] === key);

    if (existingEntry) {
      existingEntry[1] = value;
    } else {
      bucket.push([key, value]);
      this.size++;

      if (this.size / this.capacity > this.loadFactor) {
        this.resize(this.capacity * 2);
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (bucket) {
      const entry = bucket.find((entry) => entry[0] === key);
      return entry ? entry[1] : null;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return bucket
      ? bucket.some((entry) => {
          entry[0] === key;
          return true;
        })
      : false;
  }

  resize(newCapacity) {
    const oldBuckets = this.buckets;
    this.capacity = newCapacity;
    this.buckets = new Array(newCapacity).fill(null);
    this.size = 0;

    for (const bucket of oldBuckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (bucket) {
      const initSize = bucket.length;
      this.buckets[index] = bucket.filter((entry) => entry[0] !== key);
      if (this.buckets[index].length < initSize) {
        this.size--;
        return true;
      }
    }
    return false;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  length() {
    return this.size;
  }

  getCapacity() {
    return this.capacity;
  }

  keys() {
    const allKeys = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key] of bucket) {
          allKeys.push(key);
        }
      }
    }
    return allKeys;
  }

  values() {
    const allValues = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [, value] of bucket) {
          allValues.push(value);
        }
      }
    }
    return allValues;
  }

  entries() {
    let allPairs = [];

    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          allPairs.push([key, value]);
        }
      }
    }
    return allPairs;
  }
}
