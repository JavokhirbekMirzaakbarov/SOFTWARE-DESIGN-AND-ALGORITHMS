import { Ord } from './ord';

export const map = <A, B>(f: (elem: A, index: number, target: Array<A>) => B) => (list: Array<A>) => (
  list.map(f)
);

export const sort = <A>(ord: Ord<A>) => (list: Array<A>): Array<A> => (
);
