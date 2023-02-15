---
sidebar_position: 4
---

# 4. Type classes and ADTs

Another important thing in functional programming is type-classes and algebraic data types. This is what makes functional programming so flexible and abstract by providing a convenient way of using ad-hoc polymorphism. Actually, we already deal with it in the previous article when talked about the `functors`.

## 4.1 Type classes

Type class is a pattern used to achieve ad-hoc polymorphism. In general, it allows you to create some generic type for some list of operations, associated with a particular type, and this type is determined by parametric polymorphism.

Sounds complex, but let's see with examples. Here's an example of a function that compares two strings:

```ts title="Listing 4.1.1 - Equal function"
const eqString = (a: string, b: string) => a === b;
```

Okay, that's work. But what if I want to create comparing for not such a trivial type?

```ts title="Listing 4.1.2 - Equal function for more complex type"
type Student = { name: string, score: number };
const eqStudents = (a: Student, b: Student) => a.score === b.score && a.name === b.name;
const eqStudentsScore = (a: Student, b: Student) => a.score === b.score;
```

How can I generalize such an operation? I can create a type for it!

```ts title="Listing 4.1.3 - Equal function template"
type Equals = <T>(a: T, b: T) => boolean;
```

Seems okay. But, what if I want not just to compare whether is it equal, but to determine if is it greater, less or equal? So, we would need to have two functions: `equals` and `compare`.

```ts title="4.1.5 - Equal and compare functions for complex type"
const eqStudentsScore = (a: Student, b: Student) => a.score === b.score;
const compareStudentsScore = (a: Student, b: Student) => a.score === b.score
  ? 0
  : a.score > b.score
    ? 1
    : -1;
```

These two functions are interconnected, but in the current implementation, they are separate, which in some cases is not so convenient.

And here are the type-classes that come in the game! We can create a type constructor for such operations. Let's start with equality:

```ts title="Listing 4.1.6 - Setoid type-class"
// In some languages and mathematics it's called setoid
interface Eq<T> {
  equals(a: T, b: T): boolean;
}

const eqNumber: Eq<number> = {
  equals: (a, b) => a === b,
};
```

For now, the benefits are not so obvious, but now let's build comparing:

```ts title="Listing 4.1.7 - Ord type-class"
enum Ordering {
  LESS = -1,
  EQUALS = 0,
  GREATER = 1,
}

interface Ord<T> extends Eq<T> {
  compare: (a: T, b: T) => Ordering,
}

const byStudentScore: Ord<Student> = {
  compare: (a, b) => a.score === b.score
    ? Ordering.EQUALS
    : a.score > b.score
      ? Ordering.GREATER
      : Ordering.LESS,
  equals: (a, b) => a.score === b.score,
};
```

Great! But such a way of creating new instances of `Ord` is exhausting, and thanks to a such simple abstraction of `Ord`, we can handle it. Let's create a `contramap` utility  (_Contravariant Functor_: https://ncatlab.org/nlab/show/contravariant+functor).

```ts title="Listing 4.1.8 - Creating Ord with contramap constructor"
const ordNumber: Ord<number> = {
  compare: (a, b) => a === b
    ? Ordering.EQUALS
    : a > b
      ? Ordering.GREATER
      : Ordering.LESS,
  equals: (a, b) => a === b,
};

// You pass the function for transforming A to B, and then Ord<B>. Now you have Ord<A>
const contramap = <A, B>(f: (a: A) => B) => (ord: Ord<B>): Ord<A> => ({
  equals: (a, b) => f(a) === f(b),
  compare: (a, b) => {
    // The most important part
    const [fa, fb] = [f(a), f(b)];
    return fa === fb
      ? Ordering.EQUALS
      : fa > fb
        ? Ordering.GREATER
        : Ordering.LESS;
  }
});

const byStudentScore: Ord<Student> = contramap(
  (student) => student.score // function to map Student -> number
)(ordNumber); // Ord for comparing two numbers
```

And this is only a small part of the huge number of possibilities that these abstractions provide.

We already worked with another type-class in the previous chapter  - `Functors`, it has only one operator: `map`, but you can create from it more complex abstractions, like Monad.

You can check the full list of type-classes: https://github.com/fantasyland/fantasy-land (it's called there an algebraic structure, it's another concept from math, just a non-empty set with some operations and axioms).
:::info
Do not be afraid if you don't understand it, this is a specification for library creators, not educational purposes
:::

Type classes are pretty similar to the `Strategy` pattern from OOP. Some algorithms are put inside one class and form a family, where distinct instances of different classes of the same strategy are interchangeable.

## 4.2 Algebraic data types

By definition, an algebraic data type is a composite data type formed by combining the other types using `sum` or `product` techniques.

The `product` type is just a bounded combination of types, for example, `Record` or `Tuple`. The `sum` type is also called `disjoin union`, some combination of different types, like `type DisjoinUnion = A | B`

```ts title="Listing 4.2.1 - ADTs"
type Product = { a: string; b: number };
type Sum = string | number;
type ADTs = Product & Sum;
```

It's pretty simple. And from here, we might want to combine polymorphism of type-classes and ADTs to achieve huge flexibility. For example, let's take the `disjoin union` of `Value | null`, and transform it into `Functor`. How can we do that?

```ts title="Listing 4.2.2 - Maybe ADT"
type None = {
  _type: 'None',
}
type Some<A> = {
  _type: 'Some',
  value: A,
}
const isSome = <T>(optional: Maybe<T>): optional is Some<T> => optional._type === 'Some';
const some = <T>(value: T): Some<T> => ({
  _type: 'Some',
  value,
});
const none = {
  _type: 'None'
};

type Maybe<A> = Some<A> | None;

// @type Functor<Maybe>
const maybeFunctor = {
  map: <A, B>(fa: (a: A) => B) => (m: Maybe<A>): Maybe<B> => (
    isSome(m) ? some(fa(m)) : none
  )
} 
```

Yeah, we have already seen this before, and now let's look deeply into it. Here, the `Maybe` functor is just a casual `value | null` which we often use but is transformed into such a shape, so we can apply it to different type-classes. We can transform it into the `Monad`, `Foldable`, `Traversable`, `Apply`, `Applicative` and a lot else different interesting concepts. You might have a question: "So, is `Maybe` a type-class or an ADT?" - the answer is "Both". Type class is a type system, or roughly saying in OOP terms - a pattern. ADT is a composite type, which is formed by combining other types. And we can combine them together to achieve huge flexibility.

## 4.3 Further reading

Type classes and Algebraic data types are essential, but complex aspects of functional programming and an explanation above can give you only a blurry understanding of them. If you are interested to learn more - I recommend you to read [this series of articles](https://jrsinclair.com/articles/2019/what-i-wish-someone-had-explained-about-functional-programming/)

Also, you are ready to learn about another technique for handling side effects. It's an `Effect` functor! In simple terms, it's an ADT for eventually computed values.

Try in on sandbox: [Listing 4.3.1 - Effect ADT](https://codesandbox.io/s/effect-functor-kcriyr?file=/src/index.ts)

```ts title="Listing 4.3.1 - Effect ADT and a usage example with fp-ts library"
import { contramap } from 'fp-ts/Ord';
import { Ord as ordNumber } from 'fp-ts/number';
import { pipe } from 'fp-ts/function';
import { sort, tail, filter } from 'fp-ts/Array';

type Effect<A> = {
  run: () => A;
};

// @type Functor<Effect>
const effectFunctor = {
  map: <A, B>(fa: (a: A) => B) => (m: Effect<A>): Effect<B> => ({
    run: () => fa(m.run()),
  })  
}

type DatabaseResponse<V> = { response: V };
type User = { name: string; age: number };
const getUsers = (): Effect<DatabaseResponse<Array<User>>> => ({
  run: () => {
    console.log('performing database request...');
    return {
      response: [
        { name: 'James', age: 23 },
        { name: 'Jhone', age: 14 },
      ]
    };
  },
});

// pipe is just like compose, but left to right and the first argument is an _argument_ which would be passed to the first _function_
const users = pipe(
  getUsers(), // _argument_
  effectFunctor.map((query) => query.response), // _function_
);

const byAge = pipe(
  ordNumber,
  contramap((user: User) => user.age),
);
const oldestUser = pipe(
  users,
  effectFunctor.map(sort(byAge)), // sort array by age
  effectFunctor.map(tail), // get first element
);

const onlyAbove18 = pipe(users, effectFunctor.map(filter((user) => user.age >= 18)));
```

So, what is it all about? The trick is that we already have a list of `users`, an `oldestUser`, and a list of all users above 18, BUT! No one side effect was called! If you run this code and look at the console, there would be no output. Database call would be called only when `.run` would be called. With this Functor, we can do whatever we want with impure values without even having them. Our code is pure until the moment when we call `run`.

This is a hard topic as well, so if you are interested, I recommend you to read [this article](https://jrsinclair.com/articles/2018/how-to-deal-with-dirty-side-effects-in-your-pure-functional-javascript/).

## 4.4 New version of the initial example

Now, when we know all the basics of functional programming, let's rewrite our `Listing 1.2` to something more _functional_, using functors and ADTs. I will use the fp-ts library.

Try in sandbox: [Listing 4.4.1 - Rework of Listing 1.2](https://codesandbox.io/s/serene-gauss-0r4qvn?file=/src/index.ts)

```ts title="Listing 4.4.1 - Rework of Listing 1.2"
import * as E from 'fp-ts/Either';
import * as N from 'fp-ts/number';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as A from 'fp-ts/Array';
import { contramap } from 'fp-ts/Ord';
import { pipe, flow } from 'fp-ts/function';

type Student = { name: string; score: number; class: 'A' | 'B' };
export const students: Array<Student> = [
  { name: 'Jhon', score: 70, class: 'B' },
  { name: 'James', score: 60, class: 'A' },
  { name: 'Jones', score: 67, class: 'A' },
  { name: 'Raul', score: 55, class: 'A' }
];

const byStudentScore = pipe(
  N.Ord,
  // https://gcanti.github.io/fp-ts/modules/Ord.ts.html#contramap
  contramap((student: Student) => student.score)
);

const toNonEmptyArray = <L, R>(onEmpty: () => L) => (
  arr: Array<R>
): E.Either<L, NEA.NonEmptyArray<R>> => (
  arr.length === 0 ? E.left(onEmpty()) : E.right(arr as NEA.NonEmptyArray<R>)
);

const tailAndHead = <T>(list: NEA.NonEmptyArray<T>): [T, T] => [
  list[0],
  list[list.length - 1]!
];

export const main = flow(
  toNonEmptyArray<string, Student>(() => 'The list of students is empty!'),
  E.chain(
    flow(
      A.filter((student) => student.class === 'A'),
      toNonEmptyArray(() => 'There are no students from the "A" class')
    )
  ),
  E.map(
    flow(
      NEA.sort(byStudentScore),
      (sortedStudents) => (
        [
          // Average score
          sortedStudents.reduce((sum, student) => sum + student.score, 0) / sortedStudents.length,
          // Highest and lowest performers
          tailAndHead(sortedStudents)
        ] as const
      ),
      ([average, [lowest, highest]]) => `\
Class "A":
The highest score has: ${highest.name}, score: ${highest.score}
The lowest score has: ${lowest.name}, score: ${lowest.score}
An average score is ${average}`
    )
  )
);

console.log(main(students));
```
