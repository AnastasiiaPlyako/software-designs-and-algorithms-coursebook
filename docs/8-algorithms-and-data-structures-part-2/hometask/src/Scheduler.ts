import { PriorityQueue } from "./PriorityQueue";

export interface SchedulerI {
  postTask(task: () => Promise<any>, priority: number): void;
  run(): Promise<void>;
}

export class Scheduler implements SchedulerI {
  private queue;
  constructor() {
    this.queue = new PriorityQueue();
  }
  postTask(task: () => Promise<any>, priority: number): void {
    this.queue.enqueue(task, priority);
  }

  async run(): Promise<void> {
    return new Promise((resolve) => {
      while(this.queue.size()) {
        const task = this.queue.dequeue();
        task();
      }

      resolve();
    })
  }
}
