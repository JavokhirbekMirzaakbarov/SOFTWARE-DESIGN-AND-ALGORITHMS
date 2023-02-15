/**
 * Setoid (or sometimes Eq) type class that admit equality
 *
 * can be defined for simple types, like the string
 * or for the complex structures
 *
 * @example
 * type Vector = { from: number; to: number }
 * const setoidVector: Setoid<Vector> = {
 *     equals: (v1, v2) => v1.from === v2.from && v1.to === v2.to
 * }
 */
export interface Setoid<A> {
  equals: (x: A, y: A) => boolean;
}

export const setoidString: Setoid<string> = {
  equals: (x, y) => x === y
};

