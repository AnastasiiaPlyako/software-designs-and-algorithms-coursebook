interface PriorityQueueI<T> {
  enqueue(value: T, priority: number): void;
  dequeue(): T | undefined;
  size(): number;
}

class Task {
  value: number;
  priority: number;

  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}
export class PriorityQueue<T> implements PriorityQueueI<T> {
  queue;
  constructor() {
    this.queue = [];
  }

  enqueue(value: T, priority: number): void {
    const task = new Task(value, priority);
    this.queue.push(task);
    let index = this.queue.length - 1;

    while(index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.queue[parentIndex];
      if (parent.priority >= task.priority) {
        this.queue[parentIndex] = task;
        this.queue[index] = parent;
        index = parentIndex;
      } else {
        return;
      }
    }
  }

  dequeue(): T | undefined {
    let maxIndex = 0;
    const maxTask = this.queue[maxIndex];
    const current = this.queue.pop();
    const isLastTask = current === maxTask;
    if (!isLastTask) {
      this.queue[maxIndex] = current;
    }
    while(true) {
      const leftChildIndex = 2 * maxIndex + 1;
      const rightChildIndex = 2 * maxIndex + 2;
      let leftChild;
      let swapIndex = null;
      if (leftChildIndex < this.size()) {
         leftChild = this.queue[leftChildIndex];
        if (leftChild.priority < maxTask.priority) {
          swapIndex = leftChildIndex;
        }
      }
      if (rightChildIndex < this.size()) {
        const rightChild = this.queue[rightChildIndex];
        if (swapIndex === null && rightChild.priority < maxTask.priority ||
        swapIndex !== null && rightChild.priority < leftChild.priority) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) {
        break;
      }
      this.queue[maxIndex] = this.queue[swapIndex];
      this.queue[swapIndex] = maxTask;
      maxIndex = swapIndex;
    }
    console.log(this.queue);
    return maxTask?.value;
  }

  size(): number {
    return this.queue.length;
  }
}
