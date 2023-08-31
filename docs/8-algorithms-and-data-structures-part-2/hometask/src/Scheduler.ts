import { PriorityQueue } from "./PriorityQueue";

export interface SchedulerI {
  postTask(task: () => Promise<any>, priority: number): void;
  run(): Promise<void>;
}

export class Scheduler implements SchedulerI {
  private taskQueue: PriorityQueue<{
    task: () => Promise<any>;
    priority: number;
    order: number;
  }> = new PriorityQueue();
  private taskCounter: number = 0;
  private isRunning: boolean = false;

  postTask(task: () => Promise<any>, priority: number): void {
    this.taskQueue.enqueue(
      { task, priority, order: this.taskCounter },
      priority * 1000 + this.taskCounter
    );
    this.taskCounter++;
  }

  async run(): Promise<void> {
    if (this.isRunning) return;

    this.isRunning = true;

    while (this.taskQueue.size() > 0) {
      const { task } = this.taskQueue.dequeue()!;
      await task();
    }

    this.isRunning = false;
  }
}
