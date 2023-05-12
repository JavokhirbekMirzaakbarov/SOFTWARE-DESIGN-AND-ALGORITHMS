---
sidebar_position: 7
---

# 6. 📚 Home Task

The home task should be done using TypeScript.

## Task

You need to implement the task scheduler with prioritisation. Something similar to https://developer.mozilla.org/en-US/docs/Web/API/Scheduler

The main idea is that you have a queue of tasks, and you need to run them in the order of their priority. The task with the highest priority will execute first. Priority is calculated via the numbers. The lower number - the higher the priority.

This task has two parts: the implementation of the Priority Queue and the implementation of the Scheduler.

### Priority Queue

The priority queue suites very well for this task, so you need to implement it first. Try implementing it with the `min heap` to make it more efficient.

### Scheduler

The Scheduler would be pretty primitive and minimalistic. The flow of usage is the following:

1. Create a scheduler instance.
2. Add a bunch of tasks with different priorities.
3. Start the Scheduler via the `run` method. This method returns a promise that resolves when the task pool is empty.

### Testing

To test your implementations, you need to run the following command:

```bash
npm run test
```

If you want to test only the priority queue:

```bash
npm run test:queue
```

If you want to test only the scheduler:

```bash
npm run test:scheduler
```

## Evaluation Criteria

2. Most of the tests are failed.
3. Some tests are failed.
4. All tests are passed. The priority queue is not implemented with the min heap.
5. All tests are passed. Priority queue is implemented with the min heap.
