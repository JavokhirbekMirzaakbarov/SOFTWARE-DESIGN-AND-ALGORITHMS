---
sidebar_position: 2
---

# 2. Functional language possibilities

There are several functional languages in there: `Scala`, `Clojure`, `Lisp`, `Haskel`, etc.

**When functional approach should be used?**

In projects where is a lot of math and where concurrency is required. For example:

- digital signal processing
- digital image processing
- data manipulation
- supply chain projects
- agricultural projects

Before we go any further, it is important to highlight that in order to be a functional language, it is not enough to just follow functional principles, language itself has to support some functional possibilities.

## 2.1 First class functions

In computer science, they say that a programming language supports first-class functions if it treats functions as first-class citizens. In simple words, language supports first-class functions if it can pass functions as parameters to other functions, can return them as values from other functions, and can assign them to variables or can store them in data structures.

Examples:

- In _Listing 2.2_ line(1) you can see, that function is assigned to `consoleValue`
- In the _Listing 2.2_ line(2) function `logFn` returns as a value from `logPowerOfTwo`
- In the _Listing 2.2_ line(3) `consoleValue` is passed as a parameter while calling `logPowerOfTwo`

```js title="Listing 2.1 - Example of storing function in object data structure"
const example = {
  name: "John",
  getName() {
    return console.log(this.name);
  },
};
```

It is important to remember that the language must implement the feature passing function as a parameter. It is not a functional concept, and it is a language possibility. By using this feature we can follow another functional concept such as higher order function (HOF).

### 2.1.1 Higher order function

A **higher order function** is any function that takes a function as an argument, returns a function, or both.

Higher order functions are often used to:

- Abstract or isolate actions, effects, or async flow control using callback functions, promises, monads, etc
- Create utilities that can act on a wide variety of data types
- Partially apply a function to its arguments or create a curried function for the purpose of reuse or function composition
- Take a list of functions and return some composition of those input functions

```js title="Listing 2.2"
const consoleValue = (value) => console.log(value); // (1)
const logPowerOfTwo = (logFn, value) => logFn(value * value); // (2)

logPowerOfTwo(consoleValue, 5); // 25 (3)
```

Each JavaScript function that takes a callback is a HOF. For example, `map`, `filter`, `forEach` etc.

## 2.2 Currying

Currying is a technique that converts function with more than one parameter into the chain of functions with one argument. In a math way - it is a process of transforming function with multiple arities in functions with less (usually one) arity.

**Arity** - number of function's arguments.

For example, currying a function `foo` that takes three arguments creates three functions.

**Usual syntax**

```js title="Listing 2.3"
const foo = (a, b, c) => a + b + c;

foo(1, 2, 3); // 6
```

**Currying**

```js title="Listing 2.4 - Based on arrow functions"
const curryingSum = (a) => (b) => (c) => a + b + c;

curryingSum(1)(2)(3); // 6
```

```js title="Listing 2.5 - Based on regular functions"
const curryingSum = function (a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
};

curryingSum(1)(2)(3); // 6
```

Currying is not something that you have to use every time, it is something that is useful in certain situations. For example, if you need to call the same function with **some of the same** parameters a lot. This function can be divided into smaller ones and some of them can be called when needed.
