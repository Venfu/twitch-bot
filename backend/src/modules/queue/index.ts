import { EventToDisplay } from "../../../../shared/src";
export * from "../../../../shared/src";

class Queue {
  items: EventToDisplay[];

  constructor(...params: EventToDisplay[]) {
    console.log(params);
    this.items = [...params];
  }
  enqueue(item: EventToDisplay) {
    this.items.push(item);
  }
  dequeue() {
    return this.items.shift();
  }

  getItems() {
    return this.items;
  }
}

let _vQueue = new Queue();

export let vQueue = _vQueue;
