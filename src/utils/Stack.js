class Node {
  constructor(value) {
    this.id = `Tile-${value}`;
    this.value = value;
    this.width = 2 * value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  push(value) {
    let node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.length++;
  }

  peek() {
    return this.head;
  }

  pop() {
    let node = this.head;
    this.head = node.next;
    this.length--;
    return node;
  }

  traverse() {
    let list = [];
    let node = this.head;
    while (node) {
      list.push(node);
      node = node.next;
    }
    return list;
  }
}

export default Stack;