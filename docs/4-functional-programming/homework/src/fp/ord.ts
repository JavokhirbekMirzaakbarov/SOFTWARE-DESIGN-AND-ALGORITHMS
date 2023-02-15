import { Setoid } from './setoid';

export enum Ordering {
  less = -1,
  equal,
  greater,
}

/**
 * Ord is an extension of Setoid that also provides the possibility to "compare" two values
 * When compare returns -1 - the first parameter is less
 * When compare returns 0 - parameters are equals
 * When compare returns 1 - the first parameter is greater
 */
export interface Ord<A> extends Setoid<A> {
  compare: (x: A, y: A) => Ordering;
}

/**
 * Ord instance for numbers
 */
export const ordNumber: Ord<number> = {
  equals: (x: number, y: number) => x === y,
  compare: (x: number, y: number) => x < y
    ? Ordering.less
    : x > y
      ? Ordering.greater
      : Ordering.equal,
};

/**
 * Creates instance of Ord based on passed the predicate
 * See examples in the tests
 */
export const fromCompare = <A>(predicate: (x: A, y: A) => Ordering): Ord<A> => ({
  equals: (x: A, y: A) => predicate(x, y) === Ordering.equal,
  compare: (x: A, y: A) => predicate(x, y)
});

/**
 * Returns reverted Ord (-1 if the first parameter is greater)
 */
export const revert = <A>(ord: Ord<A>): Ord<A> => ({
  equals: ord.equals,
  compare: (x: A, y: A) => ord.compare(y, x)
});
