function createNode(value) {
  return { value, nextNode: null };
}

export function createLinkedList() {
  let head = null;
  let length = 0;

  // adds a new node containing value to the end of the list
  function append(value) {
    const newNode = createNode(value);
    if (head === null) {
      head = newNode;
    } else {
      let currentNode = head;

      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = newNode;
    }
    length++;
  }

  // adds a new node containing value to the start of the list
  function prepend(value) {
    const newNode = createNode(value);
    newNode.nextNode = head;
    head = newNode;
    length++;
  }

  // returns the total number of nodes in the list
  function size() {
    return length;
  }

  // returns the first node in the list
  function getHead() {
    return head;
  }

  // returns the last node in the list
  function getTail() {
    let currentNode = head;
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  // returns the node at the given index
  function at(index) {
    let nodeIndex = 0;
    let currentNode = head;
    let isIndexInRange = index > -1 && index <= length;

    if (isIndexInRange) {
      while (nodeIndex++ < index) {
        currentNode = currentNode.nextNode;
      }
      return currentNode;
    }
    return null;
  }

  // removes the last element from the list
  function pop() {
    if (length === 0) {
      head = null;
      length--;
      return;
    }

    let currentNode = head;
    let secondToLastNode = head;
    if (head !== null) {
      while (currentNode.nextNode) {
        secondToLastNode = currentNode;
        currentNode = currentNode.nextNode;
      }
      secondToLastNode.nextNode = null;
      length--;
    }
  }

  // returns true if the passed in value is in the list and otherwise returns false
  function contains(value) {
    let currentNode = head;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      } else {
        currentNode = currentNode.nextNode;
      }
    }
    return false;
  }

  // returns the index of the node containing value, or null if not found.
  function find(value) {
    let nodeIndex = 0;
    let currentNode = head;

    while (currentNode) {
      if (currentNode.value === value) {
        return nodeIndex;
      } else {
        nodeIndex++;
        currentNode = currentNode.nextNode;
      }
    }
    return null;
  }

  // represents your LinkedList objects as strings, so you can print them out
  function toString() {
    let result = "";
    let currentNode = head;

    while (currentNode) {
      result += `${currentNode.value}${currentNode.nextNode ? ", " : ""}`;
      currentNode = currentNode.nextNode;
    }
    return result;
  }

  // inserts a new node with the provided value at the given index
  function insertAt(value, index) {
    const isIndexInRange = index > -1 && index <= length;

    if (!isIndexInRange) {
      return false;
    }

    const newNode = createNode(value);
    let currentNode = head;

    if (index === 0) {
      newNode.nextNode = currentNode;
      head = newNode;
    } else {
      let previousNode = null;
      let positionInList = 0;

      while (positionInList++ < index) {
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
      previousNode.nextNode = newNode;
      newNode.nextNode = currentNode;
    }
    length++;
    return true;
  }

  // removes the node at the given index
  function removeAt(index) {
    const isIndexInRange = index > -1 && index < length;

    if (!isIndexInRange) {
      return null;
    }

    let currentNode = head;

    if (index === 0) {
      head = currentNode.nextNode;
    } else {
      let currentNode = head;
      let positionInList = 0;
      let previousNode = null;

      while (positionInList++ < index) {
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
      previousNode.nextNode = currentNode.nextNode;
    }
    length--;
  }

  return {
    append,
    prepend,
    size,
    getHead,
    getTail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}
