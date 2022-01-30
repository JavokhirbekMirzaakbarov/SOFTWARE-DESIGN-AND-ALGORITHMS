---
sidebar_position: 1
---

# 1. Functional programing (FP)

**Functional programming** is a **programming paradigm**, that is another, different than OOP, way of thinking about how to build the application. The main unit of functional programming is a function. We already use functions on daily basis so what is the difference in this case? To use FP we have to think differently, the aim is to **abstract control flows and operations** on data with functions, so by doing that we could **avoid side effects** and **reduce mutation** of state.

## 1.1 Imperative programing paradigm

Imperative programming is one of the oldest programming paradigms. It has a close connection to machine architecture. By changing the state through assignment statements we are achieving results. The state is changing by performing step-by-step tasks. The main concept is how to achieve our goal. If you are following the imperative programming paradigm you have several statements and the result is stored after execution of all of them.

Pros
- Very simple to implement

Cons
- Less efficient and less productive
- Parallel programming is not possible

```js title="Listing 1.1"
const doubleMap = (numbers) => {
  const doubled = [];

  for (let i = 0; i < numbers.length; i++) {
    doubled.push(numbers[i] * 2);
  }

  return doubled;
};

console.log(doubleMap([2, 3, 4])); // [4, 6, 8]
```

In the `Listing 1.1` our goal is to double each array element and return a new array with doubled values. As was mentioned before, in case of imperative programming, our focus is on **HOW** to achieve the result. So, we have several main steps:

- creation of new empty array `doubled`
- going through `array` with `for` loop
- double each element
- push the doubled element into `doubled` array
- return `doubled` array

By doing these steps one-by-one as a result we will have `[4, 6, 8]`.

## 1.2 Declarative programing paradigm

The main idea of **Declarative programming** paradigm is to define **what** needs to be accomplished by the program, but **not how** it needs to be implemented. So, in other words, instead of instructing how to achieve the desired results we focus only on the result itself. It is different from imperative programming which focuses on a set of commands which need to be executed in order to achieve the required solution. Declarative programming describes a particular class of problems that have to be solved and a language implementation takes care of finding the solution. With this approach, the resulting program is simpler to read. The same example, but in a declarative way.

```js title="Listing 1.2"
const doubleMap = (numbers) => numbers.map((n) => n * 2);

console.log(doubleMap([2, 3, 4])); // [4, 6, 8]
```

Let's analyze what is the difference - in this case, we know that `map` function creates a new array, so we do not need to think about it. We also know that `map` goes through the array, so we can skip the implementation of these parts.

So, there are several main steps:
- all routine work is done by `map`
- we only pass the `callback` in which we provide the condition which is important to us in this case.

## 1.3 Is FP imperative or declarative?

In order to answer this question, let's compare these two approaches:

| Characteristic            | Imperative Approach                                          | Functional Approach                                    |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| Description               | The program directly changes computed state                  | The program avoids mutating state and computation data |
| Key points                | Direct assignments, global variables, common data structures | Compositiionality, resursion, no side effects          |
| Programmer focus          | How to perform tasks and how to track state changing         | What is desired and what transformations are required  |
| State changes             | Important                                                    | Non-existent                                           |
| Order of execution        | Important                                                    | Low importance                                         |
| Primary flow control      | Loops, conditionals and function calls                       | Function calls, resursion                              |
| Primary manipulation unit | Instances of structures or classes                           | Functions as first-class objects and data collections  |

As we can see FP implements most of the declarative rules, such as programmers focus on what to do, composition, recursion, immutability, functions as first-class objects, etc.
