---
sidebar_position: 2
---

# 2. Main Concepts

As we reviewed earlier, there are rules that the program should follow to be purely functional. Let's look a closer at these main FP concepts.

## 2.1 First-class functions

In computer science, a programming language supports first-class functions if it treats functions as first-class citizens. To be a first-class citizen, the function must be able to:

1. Be assigned to a variable
2. Accept other functions as a parameter
3. Return other function

In simple words, be treated as any other data type, in case of JavaScript - function is an object.

### 2.1.1 Higher order function

There is also such a concept as a **high-order function**. The high-order function can also take a function as a parameter and return it. The distinction between the two is very subtle: **"High-order"** describes a mathematical concept where one **entity** can operate on another **entity** of the same **category**. While **first-class citizen** is a computer science term for programming language entities that have no restriction on their usage (numbers, strings and objects types are also first-class citizens)

```ts title="Listing 2.1 - Functions are first-class citizens"
const multiply = (a: number) => (b: number) => a * b;
const add = (a: number) => (b: number) => a + b;

[1, 2, 3].map(multiply(2)); // [2, 4, 6]
[1, 2, 3].map(add(2)); // [3, 4, 5]
```

Here, `multiply` and `add` are high-order functions. They take a number as a parameter, and return a new function. `map` function returns a new array based on the function passed as a parameter.

## 2.2 Currying

The technique above `const multiply = (a: number) => (b: number) => a * b`, is named **curring**. It means splitting a function of two or more parameters into a sequence of high-order functions, so parameters are passed one by one.

For example:

Try in the playground: [Listing 2.2 - Usage of currying](https://www.typescriptlang.org/play?jsx=0#code/MYewdgzgLgBAhgEwTAvDAFADwFwzAVwFsAjAUwCcAaGAT1wJIoEpUA+GTGAaloG4AofqEggANqQB0okAHN0iBOgCs1ACxMmAoeGjwkAYXzlyAS1LI0WekTLkWKdujp4bzNh259BwiGMnS5BUNjM0UlJnR1TW8dWBBiACtSYCgIACEaVBgAHgB5agBpGFJMKFIwBAgYAGtSGhAAMxhcrNr6ptzWdAazUQRcAvtHeISAQVx8mBG0iaGMfhgpxNGAbR7SPoBdVBQ0abXehE2FxZgAfhgABhPF3BHV9a2Ydn3Ho5vTxYuARg-P3AAtL9ovwTGAyuQGnBgKQYABlKD4BDlWAAbxOYDghFIuGgpjAMgEizgMhxLkY5CJMAgoHIZIYtgEAF8tD5YMQaHDabC9olkqkMtkEUiUV0AOQ0kB0sXRNkwDmjUlZEb89I0IWI5Hg8Uk0gy1mxamalEQXCjYxwdXCrVQdhoFYnVF4LFksUAKRAAAswGLqLrcAAmS7USV03BKS4wJmUR3O7G4d0uiC++CkwMBkPc8MAZijMcWTsx8ZgYoA4qQpaSU-6YAGVNSszAABwANjzsaLro93uradr30zUrJAHYlO3NgaROIpLJ0CsJAvoCLwRBNhJfOQoOgOVyhxpeDAAPSH+FSsrIDkNofaKf+WfzxfGldrjdbhWk-dHk9ws-meWZXUgA)

```ts title="Listing 2.2 - Usage of currying"
const add = (x: number, y: number) => x + y;

add(5, 4);

// into
const addCurried = (x: number) => (y: number) => x + y;

addCurried(5)(4);

// Or a more natural example from Listing 1.2

const objectsBy = <O, K extends keyof O = keyof O>(field: K) => (objA: O, objB: O) => (
  objA[field] === objB[field]
    ? 0
    : objA[field] > objB[field]
        ? 1
        : -1
);

interface Student {
  name: string;
  age: number;
  score: number;
};

const byScore = objectsBy<Student>('score');
const byAge = objectsBy<Student>('age');

const students: Array<Student> = [
  { name: 'John', age: 20, score: 50 },
  { name: 'James', age: 22, score: 53 },
  { name: 'George', age: 25, score: 86 },
  { name: 'John', age: 21, score: 75 },
];

console.log([...students].sort(byScore)); // Sorted by score
console.log([...students].sort(byAge)); // Sorted by age
```

Curring is not so common in imperative programming, which is the opposite in functional programming.

## 2.3 Composition

Let's start from the beginning: what is the function (not procedure)? It's an algorithm that have some input of **A** and returns some output of **B**. Sometimes it's called `morphism`. Let's imagine three functions:

```ts title="Listing 2.3.1 - Functions can be represented as an arrow from A type to B type"
// Some bunch of different types
type A = void;
type B = void;
type C = void;
type D = void;

const ab = (a: A) => B;
const bc = (b: B) => C;
const cd = (c: C) => D;
```

We don't care what these functions do and what real types they take. This is an abstraction. Actually, in FP, we are always thinking in **abstractions**.

We pass some value `A` to the function `ab`, and as result, we get the `B` value. `const b = ab(a)`. But what if we want to pass this value further, and receive `C` from `bc`? We can pass the result of `ab` directly to `bc`: `bc(ab(a))`. We can go further to receive `D` from `cd`: `cd(bc(ab(a)))`.

This becomes a little complex. Let's imagine something more real based on `Listing 1.2`:

Try in the playground: [Listing 2.3.2 - Sequence of arrows](https://www.typescriptlang.org/play?jsx=0#code/JYOwLgpgTgZghgYwgAgMpgK4BMLmQbwChlkQ4BbCALmQGcwpQBzAbmLoQHsprSNyARtDYkEAGzi1aNeoxCtCAXzZcQ9OphzhpyAIJQocAJ4AedNlxgAfMgC8yANrt8pCrwDkAKU4ALEO4AaZHFJHXddQI5uXgBWAAZkRQDnV0oaLzdaSJCpdIig2i4eGhiAZkTkkhcyNOR3AHEIbiYIbIlcuvyo4uQADgA2CpSaj28-NtD0gCFIwuiaAHYYoYBdNkJCAHpNkl29-YPDg90D2xsDqeRCVXUYYDFIKCmjAGF22hP7AAp6C20afSGUzmLTWACUAIMxjMmksNjOGj+YFoADo7g9oD9YXgEb9QSicrQ7LZ7OF3GC2NtkABNCC0IInOAgLDIS4IJnIITIMA+FC0NzcowABwgQWAYHcRLgYjEyAAVhh1By4AJZIgwMBOCANlSjnr9SRLvsEQcXtctepaNwwM9UEUUN88ZYdIDoSC4RC9FDgdjrHYbA4UUGndoViirVAwF8sUiAIwFX0AJjB-sRoNj4ftyAAtGnLInM9EKVsdgay+X9i9TucDgARc1qMDIFpgABiwCg9F0zIAMpIwO7tCRHb6Xd6YUirJ6HIOwEFZytUw4Q8iHHEVgmkbRl6OUWJcEweTnkLGVmsdaWK1frzfkLW9iZc3sqw+n3sjbtH7tdA31A4xJwADudIDvas5BD4wBMLy9B2tEC52M2EBth2Xa9v2s60D81q2vaXzoo8zxvKEugxqCtBgpRKgWpw+57pwTBfABwGwWBvoQVBMGgfBvpgkAA)

```ts title="Listing 2.3.2 - Sequence of arrows A -> B -> C -> D"
//                                 A      =>       B 
const filterByClassA = (students: Array<Student>): Array<Student> => students.filter(student => student.class === 'A');
// Yes, A and B can be the same type, it's all just an abstraction

//                              B      =>       C
const sortByScore = (students: Array<Student>): Array<Student> => [...students].sort((student1, student2) => student1.score - student2.score);
//                                          C      =>        D
const getFirstAndLastStudents  = (students: Array<Student>): [Student, Student] => [students[0], students[students.length - 1]];

//                                                                 D    <-     C     <-      B     <-   A
const [lowestScoreStudent, highestScoreStudent] = getFirstAndLastStudents(sortByScore(filterByClassA(students)));
```

But from the example above, what if we want to create one new function, for directly mapping from `A` to `D`? (from `Array<Student>` to filtered, sorted tuple of `[lowestScoreStudent, highestScoreStudent]`). Can we do this? Yes, we can! This would be a composition! In mathematics, the operator `∘` is used for creating a composition, and functions(morphisms) are written from right to left (just like how we did it above):

```title="Listing 2.3.3 - For A -> B -> C -> D sequence we can create a composition from A -> D"
ad = cd ∘ bc ∘ ab
ad(a) -> D

getLowestAndHighestScoreStudents = getFirstAndLastStudents ∘ sortByScore ∘ filterByClassA
getLowestAndHighestScoreStudents(students) -> [Student, Student]
```

Here is a diagram of this process (`X`, `Y`, `Z` represents some types, and `f`, `g`, `h` are functions from `X` to `Y`, `Y` to `Z` respectively)

![commutative diagram](img/commutative_diagram_for_morphism.svg)

Let's try to implement this compose function in TypeScript:

```ts title="Listing 2.3.4 - the compose function"
type AnyFunction = (...args: Array<any>) => any;

// For two functions:     B -> C           A -> B            the composition from A -> C
function compose<A, B, C>(bc: (b: B) => C, ab: (a: A) => B): (a: A) => C;
function compose<A, B, C, D>(cd: (c: C) => D, bc: (b: B) => C, ab: (a: A) => B): (a: A) => D;
function compose(...fns: Array<AnyFunction>) {
  return (a) => (
    fns.reduceRight(
      (acc, fn) => fn(acc),
      a,
    )
  );
};
```

Now we can rewrite our example:

```ts title="Listing 2.3.5 - Usage of compose function"
const getLowestAndHighestScoreStudents = compose(
  getFirstAndLastStudents,
  sortByScore,
  filterByClassA,
);

const [lowestScore, highestScore] = getLowestAndHighestScoreStudents(students);
```

Here's another diagram representation of this process, but with actual data:
![composition of two functions](img/composition_of_two_functions.svg)

## 2.4 Pure functions

Let's start with the definition of a `pure` function. It's a function that:

1. Always return the same value for the same properties
2. Do not cause side effects
3. Do not modify the outer state

Before moving on, lets one more time discuss what is the side effect. It is anything that happens outside the application and changes the state of anything in the computer. Printing something on the screen, sending the request, reading from the keyboard etc. Almost everything that makes programs meaningful.

But why do we have an interest in such functions? Because it makes our application more stable and predictable. But if all application is built up from pure function, how to perform any operation to show some result? Is it impossible?

Absolutely possible! We just need a little _"tricks"_. There are couple technics to add side effects to our pure application. The most simple of them - put the effect out of the function, and pass it as a parameter:

```ts title="Listing 2.4.1 - Impure code"
const appConfig = { timesToRepeat: 2 };

const impureMultiply = (str: string) => {
  console.log(str.repeat(appConfig.timesToRepeat));
};

impureMultiply('hello '); // logs: "hello hello "
```

This function is not pure because it fires a side effect, and relies on the outer variable. So, how to make this function pure? Let's inject the dependencies as function parameters:

```ts title="Listing 2.4.2 - 'Pure' code"
const appConfig = {
  timesToRepeat: 2,
};

const pureMultiply = (log: (message: any) => void, timesToRepeat: number, str: string) => {
  log(str.repeat(timesToRepeat));
};

pureMultiply(console.log, appConfig.timesToRepeat, 'hello '); // logs: "hello hello "
```

You can argue: "But it still fires an effect! Just not implicitly!". And you will be right, but the `pureMultiply` function is still pure because it doesn't know anything about the function you passed into! How you can be so sure that the `log` function fires a side effect?

```ts title="Listing 2.4.3 - Pure code"
const assert = (expect: string) => (actual: string) => expect === actual;

pureMultiply(assert('hello hello '), appConfig.timesToRepeat, 'hello');
```

And now everything is truly pure, without any changes in `pureMultiply`. We're just lying everything is pure and there are no side effects. And everyone is happy, every law is kept. So, it means, that `pureMultiply` fits all requirements for being a pure function. And most importantly - it's referentially transparent.

But this method isn't perfect, and if everything works on parameters, it can lead us to **parameters hell** which isn't maintainable and scalable. Fortunately, there is also another, more powerful technic for dealing with side effects called `Effect Functor` that we will review in the next chapters. 
