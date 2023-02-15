export type None = {
  _tag: 'None'
};

export type Some<T> = {
  readonly _tag: 'Some',
  readonly value: T;
}

/**
 * Maybe is represents an optional value, which might, or might not be.
 * It either a Some<Value>, or None
 */
export type Maybe<T> = Some<T> | None

export const isSome = <T>(optional: Maybe<T>): optional is Some<T> => optional._tag === 'Some';
export const isNone = <T>(optional: Maybe<T>): optional is None => optional._tag === 'None';

export const some = <T>(value: T): Some<T> => ({
  _tag: 'Some',
  value,
});
export const none: Readonly<None> = {
  _tag: 'None',
};

/**
 * Create a Maybe instance form the value. If value(T) is nullable(null or undefined), returns None, otherwise it returns Some<T>
 */
export const fromNullable = <T>(value: T) => ();

/**
 * Get the value from Some, or returns the result of onNone
 */
export const getOrElse = <T>(onNone: () => T) => (val: Maybe<T>): T => isSome(val) ? val.value : onNone();

/**
 * Fold (or reduce, accumulate) is a function that build up some result based on the internal values
 * Both onNone and onSome function return the same "B" value
 * How it can be connected to the Array's reduce? Just check this
 *
 * fold Maybe<A> => B
 * reduce Array<A> => B
 */
export const fold = <T, R>(
  onNone: () => R,
  onSome: (v: T) => R,
) => (optional: Maybe<T>): R => (
);
