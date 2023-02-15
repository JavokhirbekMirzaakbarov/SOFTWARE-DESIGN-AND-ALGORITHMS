export type Left<E> = {
  _tag: 'Left',
  left: E,
}
export type Right<A> = {
  _tag: 'Right',
  right: A,
}

/**
 * Either represents a value of one of two possible types (a disjoint union).https://en.wikipedia.org/wiki/Disjoint_union
 * An instance of Either is either an instance of Left or Right
 * A common use of Either is as an error handler or as an alternative to Maybe when the payload of empty value are required
 * In simple terms, Either is just a union L | R
 */
export type Either<E, A> = Left<E> | Right<A>

/**
 * Creates Right (correct) instance
 */
export const right = <E = never, A = never>(val: A): Either<E, A> => ({
  _tag: 'Right',
  right: val,
});

/**
 * Creates Left (error) instance
 */
export const left = <E = never, A = never>(val: E): Either<E, A> => ({
  _tag: 'Left',
  left: val,
});

export const isRight = <E, A>(val: Either<E, A>): val is Right<A> => val._tag === 'Right';
export const isLeft = <E, A>(val: Either<E, A>): val is Left<E> => val._tag === 'Left';

/**
 * Add possibility to act as a Functor https://en.wikipedia.org/wiki/Functor
 * Maps the right value of the Either instance from A to B
 * Just like with arrays, when we maps Array<A> to Array<B>
 */
export const map = <E, A, B>(fn: (a: A) => B) => (fa: Either<E, A>): Either<E, B> => (
);

/**
 * Add possibility to act as an Apply
 * "ap" allows you to use n-ary (in this example 2-ary) functions for mapping
 * Generally speaking: ap(Either<E, A>)   ap(Either<E, B>) => Either<E, C>
 (x: A)          => (y: B)           => C
 */
export const ap = <E, A>(fa: Either<E, A>) => <B>(fab: Either<E, (a: A) => B>): Either<E, B> => (
  isLeft(fab)
    ? fab
    : isLeft(fa)
      ? fa
      : right(fab.right(fa.right))
);

/**
 * For flatting nested instances
 */
export const flatten = <E, A>(a: Either<E, Either<E, A>>): Either<E, A> => (
  isRight(a) ? a.right : a
);

/**
 * Create Either instance from promise
 * Either the Promise is resolved - should return Right
 * Or the Promise is rejected - should return Left
 */
export const fromPromise = <E, A>(promise: Promise<A>): Promise<Either<E, A>> => ();
/**
 * Get the value from the Right, or call onLeft function
 * See examples in the tests
 */
export const getOrElse = <E, A>(onLeft: (e: E) => A) => (ma: Either<E, A>): A => (
  isRight(ma) ? ma.right : onLeft(ma.left)
);

/**
 * Fold (or reduce, accumulate) is a function that build up some result based on the internal values
 * Both onLeft and onRight function return the same "B" value
 * How it can be connected to the Array's reduce? Just check this
 *
 * fold Either<E, A> => B
 * reduce Array<A> => B
 */
export const fold = <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (ma: Either<E, A>): B => (
);

