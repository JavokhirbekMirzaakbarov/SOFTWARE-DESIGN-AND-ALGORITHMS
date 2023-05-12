import { Scheduler } from "../src/Scheduler";

const task = (fn) => Promise.resolve().then(fn);

const cycle = (numberOfCycles: number, fn: (i: number) => void) => {
  for (let i = 0; i < numberOfCycles; i++) {
    fn(i);
  }
};

describe("Scheduler", () => {
  const PRIORITY_1 = 1;
  const PRIORITY_2 = 2;

  let scheduler: Scheduler;

  let executedTasks: Array<string> = [];
  let p1TaskId = 0;
  let p2TaskId = 0;

  const spawnP1 = () => {
    scheduler.postTask(() => {
      return task(() => {
        executedTasks.push(`P1: ${p1TaskId++}`);
      });
    }, PRIORITY_1);
  };
  const spawnP2 = () => {
    scheduler.postTask(() => {
      return task(() => {
        executedTasks.push(`P2: ${p2TaskId++}`);
      });
    }, PRIORITY_2);
  };

  beforeEach(() => {
    p1TaskId = 0;
    p2TaskId = 0;
    executedTasks = [];
    scheduler = new Scheduler();
  });

  it("Tasks sorted in priority when pushed in bunch", () => {
    cycle(10, spawnP2);
    cycle(5, spawnP1);

    scheduler.run();

    // event-loop tick
    return task(() => {
      // execution of tasks was in order of priority
      expect(executedTasks).toEqual([
        "P1: 0",
        "P1: 1",
        "P1: 2",
        "P1: 3",
        "P1: 4",
        "P2: 0",
        "P2: 1",
        "P2: 2",
        "P2: 3",
        "P2: 4",
        "P2: 5",
        "P2: 6",
        "P2: 7",
        "P2: 8",
        "P2: 9",
      ]);
    });
  });

  it("Tasks sorted in priority when pushed randomly", () => {
    spawnP1(); // P1: 0

    spawnP2(); // P2: 0

    spawnP1(); // P1: 1

    spawnP2(); // P2: 1
    spawnP2(); // P2: 2
    spawnP2(); // P2: 3
    spawnP2(); // P2: 4

    spawnP1(); // P1: 2
    spawnP1(); // P1: 3
    spawnP1(); // P1: 4

    spawnP2(); // P2: 5

    return scheduler.run().then(() => {
      expect(executedTasks).toEqual([
        "P1: 0",
        "P1: 1",
        "P1: 2",
        "P1: 3",
        "P1: 4",
        "P2: 0",
        "P2: 1",
        "P2: 2",
        "P2: 3",
        "P2: 4",
        "P2: 5",
      ]);
    });
  });
});
