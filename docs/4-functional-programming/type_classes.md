---
sidebar_position: 4
---

# 4. Type classes and ADTs

Another important thing in functional programming is type-classes and algebraic data types. This is what makes functional programming so flexible and abstract by providing a convenient way of using ad-hoc polymorphism. Actually, we already dealt with it in the previous article when talked about the `functors`.

## 4.1 Type classes

*Type class* is a pattern used to achieve ad-hoc polymorphism. In general, it allows us to create generic type for provided list of operations, associated with a particular type, and this type is determined by parametric polymorphism.

Sounds complex, but let's see with examples. Here's an example of a function that compares two strings:

```ts title="Listing 4.1.1 - Equality function for simple type"
const eqString = (a: string, b: string) => a === b;
```

Okay, that's work. But what if we want to create more complex types?

```ts title="Listing 4.1.2 - Equality function for more complex type"
type Student = { 
  name: string;
  score: number;
};

const eqStudents = (a: Student, b: Student) => a.score === b.score && a.name === b.name;
const eqStudentsScore = (a: Student, b: Student) => a.score === b.score;
```

How can we generalize such an operation? We can create a type for it!

```ts title="Listing 4.1.3 - Equality function type"
type Equals = <T>(a: T, b: T) => boolean;
```

Seems okay. But, what if we want not just to compare whether they are equal, but to additionally determine if one of them is greater or less? So, we would need to have two functions: `equals` and `compare`.

```ts title="4.1.5 - 'equal' and 'compare' functions for complex type"
const eqStudentsScore = (a: Student, b: Student) => a.score === b.score;
const compareStudentsScore = (a: Student, b: Student) => a.score === b.score
  ? 0
  : a.score > b.score
    ? 1
    : -1;
```

These two functions are interconnected, but in the current implementation, they are separate, which in some cases is not convenient.

And here are the *type-classes* that come into the game! We can create a type constructor for such operations. Let's start with equality:

```ts title="Listing 4.1.6 - Setoid type-class"
// In some languages and mathematics it's called Setoid
interface Eq<T> {
  equals(a: T, b: T): boolean;
}

const eqNumber: Eq<number> = {
  equals: (a, b) => a === b,
};
```

For now, the benefits are not so obvious. Let's proceed and build comparing:

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

Great! But such a way of creating new instances of `Ord` is exhausting, and thanks to a such simple abstraction of `Ord`, we can handle it. Let's create a `contramap` utility  ([Contravariant Functor](https://ncatlab.org/nlab/show/contravariant+functor)).

Try in playground: [Listing 4.1.8 Creating Ord with contramap constructor](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgKIEcA8AVAfMgbwChlkJ0BXOAGwGcAKOALmWwBpkAjF7AShc4B7QdQhwQAbiIBfIkQggKAW2QB5KABNooAOaESyADKoAyieQBeZAFoAjGwOoAigFUAgofNWADA9IBxACVUN2xUQMtkexk5UEhYRBR1DRx8CAAPSBANWjQsPH1SBEElAAc4KAgWRh4OblZeS3xk7RAdB1kiYpBaMGRBTQA5ZU5oFmTMRSVRqHwrYiKS8srquDrGi3w4SwsrTgNSAH41TVadADpnd08D5BZt-H3SZ+Rjlqhdc6CQsMDb0nGpw+bXOxjMfjIlBotFW6yayG2uz2HSkRAA9GjkABNQQUZDlWi5MAACxQMAoIAQYGAghAyBgA2QYCg4loDKgSl0yDcTMEyAAQhxxBomaS6RN+bhzshBoIAO7IACeuOQxLgADckppMG5cF1ab1kN1mXAlHBSpEdRxJfQYKsWG4Nvh+U7kPQBhpASlJfwTildfD6AtIVQ6LCuK6PedyKGGDBGLwOPHOLxEwZimUKlU3WsI-CoxnlhBbQmk-QU2npLxUWBFaUUCYwBQtOBIgRkCBTdnesD2shaMUVh2RtBkNIpN1DZxFY3mwowCZB9mJrOW2A5kbaSazaV6AZ6L05+AWKv567D2vzgOBigMfSKVSaXSwHyd8hT63rPgpjMiLx3UMI5QNWyB3sk9KMoWFRcmAcp8j+0C0HIk59Be865FYADaBjtp2SjZgA5AAUoIxIgARHDXkOtjeGOEK4V2LDEeIEAUf2S4sAArHROEdoxyDMQgADWbFUdmADsPEALoTgaqEDJAIpYecKloeAtBSVeCnljOTZrouN7nFBlTVshBoiBA5zUIIOgHgpEAaLwQA)

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
  equals: (a, b) => ord.equals(f(a), f(b)),
  compare: (a, b) => ord.compare(f(a), f(b)),
});

const byStudentScore: Ord<Student> = contramap(
  (student) => student.score // function to map Student -> number
)(ordNumber); // Ord for comparing two numbers

const students = [
  { name: 'John', score: 10 },
  { name: 'Jane', score: 5 },
  { name: 'Jack', score: 7 },
];
const sorted = [...students].sort(byStudentScore.compare);
```

Some info about `contramap`: It's a [contravariant](https://en.wikipedia.org/wiki/Covariance_and_contravariance_of_vectors) of `Functor.map`. When `map` makes `F<A> -> F<B>` transformation using morphism `A -> B`, `contramap` makes `F<A> -> F<B>` transformation using morphism `B -> A`. Here's a very demonstrative example of how contravariance works: [stackoverflow](https://stackoverflow.com/questions/66410115/difference-between-variance-covariance-contravariance-and-bivariance-in-typesc).

And this is only a small part of the huge number of possibilities that these abstractions provide.

We already worked with another type-class in the previous chapter - `Functors`, it has only one operator: `map`, but you can create from it more complex abstractions, like `Monad`.

You can check the [full list of type-classes](https://github.com/fantasyland/fantasy-land): (it's called there an algebraic structure, it's another concept from math, just a non-empty set with some operations and laws).

:::info
Do not be afraid if you don't understand it, this is a specification for library creators, not educational purposes.
:::

Type classes are pretty similar to the `Strategy` pattern from OOP (that we will explore later). Some algorithms are put inside one class and form a family, where distinct instances of different classes of the same strategy are interchangeable.

## 4.2 Algebraic data types

By definition, an algebraic data type is a composite data type formed by combining other types using `sum` or `product` techniques.

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

Yeah, we have already seen this before, and now let's look deeply into it. Here, the `Maybe` functor is just a casual `value | null` which we often use, but it is transformed into such a shape, so we can apply it to different type-classes. We can transform it into the `Monad`, `Foldable`, `Traversable`, `Apply`, `Applicative` and many other different interesting concepts. You might have a question: "So, is `Maybe` a type-class or an ADT?" - the answer is "Both". Type class is a type system, or roughly saying in OOP terms - a pattern. ADT is a composite type, which is formed by combining other types. And we can combine them together to achieve huge flexibility.

## 4.3 Further reading

Type classes and Algebraic data types are essential, but complex aspects of functional programming and an explanation above can give you only a blurry understanding of them. If you are interested to learn more - we recommend you to read [this series of articles](https://jrsinclair.com/articles/2019/what-i-wish-someone-had-explained-about-functional-programming/)

Also, you are ready to learn about another technique for handling side effects that we mentioned in the beginning. It's the `Effect` functor! In simple terms, it's an ADT for eventually computed values.

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

So, what is it all about? The trick is that we already have a list of `users`, an `oldestUser`, and a list of all users above 18, BUT! No side effect was called! If you run this code and look at the console, there would be no output. Database call would be called only when `.run` would be called. With this Functor, we can do whatever we want with impure values without even having them. Our code is pure until the moment when we call `run`.

Such an effect system gives us so much power, but it is not apparent at first glance. It allows us to make `programs as values`. Every piece of our logic is just a value, and these values are composed into programs, which are values as well, and we can compose these small programs together to create one big program, which is as well pure and predicted. And then, in the end, in an isolated place, it runs. You might see quite a similar concept in React.js (the application would render only after the `ReactDOM.render` call) and Express.js (the server would start only after the `.listen` call).

This is a hard topic as well, so if you are interested, we recommend you to read [this article](https://jrsinclair.com/articles/2018/how-to-deal-with-dirty-side-effects-in-your-pure-functional-javascript/).

## 4.4 New version of the initial example

Now we know the basics of functional programming, let's rewrite our `Listing 1.2` to something more _functional_, using functors and ADTs. We will use the [fp-ts](https://gcanti.github.io/fp-ts/) library.

You can find the source here: [Listing 4.4.1 - Rework of Listing 1.2](https://codesandbox.io/s/listing-4-4-1-rework-of-listing-1-2-0r4qvn?file=/src/main.ts)

This code might seem very complex at first glance, but it represents real-world functional programming well.

The project consists of 2 main parts: `main.ts` and `index.ts`. The main logic of the program is in the `main.ts` file; it has a `main` function which implements desired behaviour by taking `Student[]` and returning `string`. There are a lot of interesting examples of using functors, monads and ADTs, so we recommend you read them carefully.

```ts title="file: main.ts"
import * as E from "fp-ts/Either";
import * as N from "fp-ts/number";
import * as NEA from "fp-ts/NonEmptyArray";
import * as A from "fp-ts/Array";
import { contramap } from "fp-ts/Ord";
import { pipe, flow } from "fp-ts/function";

// Data

export type Student = {
  name: string;
  score: number;
  class: "A" | "B";
};

// Utils

const byStudentScore = pipe(
  N.Ord,
  // Contramap is suited for building Ord for different types. Like here, we build Ord<Student>
  // https://gcanti.github.io/fp-ts/modules/Ord.ts.html#contramap
  contramap((student: Student) => student.score)
);

const toNonEmptyArray = <L, R>(onEmpty: () => L) => (
  arr: Array<R>
): E.Either<L, NEA.NonEmptyArray<R>> =>
  pipe(NEA.fromArray(arr), E.fromOption(onEmpty));

const sumScore = pipe(
  (student: Student) => student.score, // student -> number
  NEA.foldMap(N.SemigroupSum) // reducing and maping at the same time!
);

const tailAndHead = <T>(list: NEA.NonEmptyArray<T>): [T, T] => [
  list[0],
  list[list.length - 1]!
];

// Implementation

export const main: (
  students: Array<Student>
) => E.Either<string, string> = flow(
  // Converting list from input to the NonEmptyArray
  toNonEmptyArray<string, Student>(() => "The list of students is empty!"),
  // Filtering by class A. Since we might face the issue when after filtering, there is no students - a new error might appear
  // That's why we use flatMap to flat Either<*emptyListErr, Either<noAClassStudents, students>> to just Either<emptyListErr|noAClassStudents, students>
  // That is what the Monad is
  // * It's not the real types, just the meaning of the value inside the Either 
  E.flatMap(
    flow(
      A.filter((student) => student.class === "A"),
      toNonEmptyArray(() => 'There is no students from the "A" class')
    )
  ),
  // And then we map our Either<err, _students_> to Either<err, _message_>
  E.map(
    flow(
      // Firstly we sort students
      NEA.sort(byStudentScore),
      // Then create a tuple of (averageScore, (lowestPerformer, highestPerformer))
      (sortedStudents) =>
        [
          // Average score
          (sumScore(sortedStudents) / sortedStudents.length).toFixed(2),
          // Highest and lowest performers
          tailAndHead(sortedStudents)
        ] as const,
      // And finally produce the resulting message
      ([average, [lowest, highest]]) => `\
Class "A":
The highest score has: ${highest.name}, score: ${highest.score}
The lowest score has: ${lowest.name}, score: ${lowest.score}
An average score is ${average}`
    )
  )
);
```

The `index.ts` file is a place where we run our program. It implements asking the "database", calling the `main` function, and printing the result to the browser (in DOM) or the console based on the passed parameter. You can find here a good example of using the `Effect` (in the context of fp-ts `IO`) and `Task` monad and the overall approach of writing effect-full code `purely`.

```ts title="file: index.ts"
import { flow, pipe } from "fp-ts/function";
import * as T from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import * as IO from "fp-ts/IO";
import * as IOE from "fp-ts/lib/IOEither";
import * as E from "fp-ts/Either";

import { Student, main } from "./main";

const fetchFromDB: TE.TaskEither<string, Array<Student>> = T.delay(200)(
  TE.right([
    { name: "Jhon", score: 70, class: "B" },
    { name: "James", score: 60, class: "A" },
    { name: "Jones", score: 67, class: "A" },
    { name: "Raul", score: 55, class: "A" }
  ])
  // You can replace it with the "left" to see an error message
  // TE.left('DB: connection refused')
);

// DOM manipulation
const getEl = (id: string): IOE.IOEither<string, HTMLElement> =>
  flow(
    () => document.getElementById(id),
    E.fromNullable(`DOM: There is no such #${id} element`)
  );

const printTo = (id: string) => (content: string) =>
  pipe(
    getEl(id),
    IOE.map((el) => {
      el.innerText = content;
    })
  );

// console manipulation
const logAs = (type: "message" | "error") => (
  message: string
): IO.IO<void> => () => {
  // Since all this function is an effect, it's absolutely okay to use imperative constructions like "if"
  if (type === "error") console.error(message);
  else console.log(message);
};
const logMessage = logAs("message");
const logError = logAs("error");
// You can as well change output channel to the DOM
/*
const logError = flow(
  printTo("error"),
  // Since accessing the DOM can produce error, we need to reduce our IOEither to IO
  IOE.getOrElse(logAs("error")),
);
*/

const print = (to: "DOM" | "console") => (
  content: string
): IOE.IOEither<string, void> =>
  to === "DOM"
    ? // You can try to replace "app" with another non-existing ID and see an error in the console
    printTo("app")(content)
    : // We need to lift IO to IOEither here
    IOE.fromIO(logMessage(content));

// The program

// The essence of the program - it returns some IO, effectful computation, in our case it's printing to the console or the DOM 
// Here we just fetch the data from the "database", push it to the "main" function and then print the result
const program: T.Task<IO.IO<void>> = pipe(
  // fetch our students from "database"
  fetchFromDB,
  TE.match(
    // In case of db error return error logger
    logError,
    flow(
      main,
      // In case if everything was okay - print result to the DOM
      E.map(print("DOM")),
      // At this moment, we have Either<studentsError, IOEither<printError, void>>
      // We need to transoform it to IOEither<studentsError, IOEither<printError, void>>
      IOE.fromEither,
      // And then flatten to the IOEither<studentsError|printError, void>
      IOE.flatten,
      // In case of error in "print" or "main" function return the error logger
      IOE.getOrElse(logError)
    )
  )
);

// Dead Zone: executing

const run = (io: IO.IO<void>) => io();
run(pipe(program, T.map(run)));

/**
 * Try to play around with the data and see how the app behaves
 * For example, replace the DB response with an error (uncomment the corresponding line)
 * Or make a list of students empty, or remove all students from class "A"
 * Or you can remove the element with the "app" id from the index.html
 */
```

:::info
We still have not explained what a Monad is, but we used it in the description and the example. It's an advanced topic; you can explore it if you want to deepen your FP knowledge.

But in straightforward terms, it's a functor with a `flatMap`(sometimes called `chain`) method. `flatMap` unwraps the mapping result; you might be familiar with this from the `Array.prototype.flatMap`. Yes, `Array` is a monad as well!
:::

## 4.5 What's the point of all of it?

We have learned many things about functional programming, and let's try to answer this question: Why is FP used in the real world? Why a lot of production companies are using it? What problems does it solve?

Let's look back at the procedural and OOP programming. It has many conventions, patterns, and principles; using them is the only possible way to write an extensive, growing and maintainable production-grade application. Why do they appear in the first place? Because one of the main problems with OOP - it's too low-level in the architectural sense. We control every bit of the program; we should decide how every connection would be organised and structured by ourselves. What is the result of it? We have all these MVC, SOLID, DRY, GRASP, YAGNI, KISS, and a large zoo of patterns. Their only purpose is to restrict, structure and formulate how we build applications. It's too hard to develop something in such a way without extensive experience.

But can functional programming resolve this problem? All these concepts are already baked into it! Let's elaborate on the most ambitious of them - SOLID.

1. Single Responsibility - Our functions are pure and referentially transparent; we're composing functions to create a new one and combining them in type classes. With such a restriction, we cannot even potentially make them do something different than they should.
2. Open-Closed - We have one function which does only one most primitive thing. We can create new functions via composition. We may have different base-type classes and monoids, and we can derive new ones from them. We never change the existing ones; we only extend them.
3. Liskov Substitution - The most intriguing one! All this hierarchy of type classes like Monoids, Functors and others allows us to construct programs abstractly. Does our function accept Monoid? We can pass whatever Monoid of any type we want! If our application relies on some Effect Functor, and with time we need to use another one, more performant and async - we can change it at the beginning of the program, and everything would work as expected! Because it would obey the same laws as the previous one.
4. Interface Segregation - Type classes segregated by their purpose. We might have some function that accepts the parameter of Functor, but with time we also want it to be, for example, Applicative - you're welcome, extend it, and nothing breaks!
5. Dependency Inversion - The essence of Functional Programming. We always have absolute control over what is going on during computations. Computational flow is abstract, and every function obeys strict laws, so we can be sure of what it does by looking at its type signature.

Now you can look back on the code examples and concepts we discussed, and you will see that it works! Of course, this course only gives you some theoretics and practice, and it is absolutely not enough to build something valuable in FP languages like Haskell or Scala. But the purpose was to introduce you to the world of FP, to demystify its shape, and to intrigue you to go down deep into it if you found such concepts close to you. If so, here you can see a comprehensive glossary of the most FP terms you can find on your way: https://degoes.net/articles/fp-glossary.
