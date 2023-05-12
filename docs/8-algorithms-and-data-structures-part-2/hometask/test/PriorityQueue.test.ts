import { PriorityQueue } from "../src/PriorityQueue";

describe("PriorityQueue", () => {
  let pq: PriorityQueue<string>;

  beforeEach(() => {
    pq = new PriorityQueue();
  });

  it("should insert values correctly", () => {
    pq.enqueue("a", 1);
    expect(pq.size()).toBe(1);

    pq.enqueue("b", 2);
    expect(pq.size()).toBe(2);

    pq.enqueue("c", 5);
    expect(pq.size()).toBe(3);
  });

  it("should remove values correctly", () => {
    pq.enqueue("a", 1);
    pq.enqueue("b", 3);
    pq.enqueue("c", 2);

    expect(pq.dequeue()).toBe("a");
    expect(pq.size()).toBe(2);
    expect(pq.dequeue()).toBe("c");
    expect(pq.size()).toBe(1);
    expect(pq.dequeue()).toBe("b");
    expect(pq.size()).toBe(0);
  });

  it("should handle removing from an empty queue correctly", () => {
    expect(pq.dequeue()).toBeUndefined();
    expect(pq.size()).toBe(0);
  });
});
