---
sidebar_position: 1
---

# 1. Introduction

**Functional programming (FP)** is a **programming paradigm** where programs are constructed by applying and composing functions. It is different from the imperative way of thinking of how to build the application. The main unit of functional programming is a function. We already use functions on daily basis. So what is the difference in this case? Functions in FP are different from such in procedural programming, where the program is built upon procedures, dedicated code pieces, and just subprograms. In FP, it's more like a mathematical function, which maps one value to another. In mathematics, when we write `f(x) = x * 2`, we would always know that `f(5) = 10` because in terms of FP, functions are `pure`. The way to build an application in the FP paradigm is to combine such functions, where each one is some kind of expression over the data. Combination of such functions is called `composition`.

But what are the main rules of **Functional programming**?

* Functions are treated as first-class citizens
* The state is immutable
* Functions are pure
* Rules of the pure functions:
  * Functions are referential transparent (the same input produces the same output)
  * Functions do not produce any side effects (such as mutating the global state, manipulation of I/O, or anything outside the function)

## 1.1 Imperative programming paradigm

To see the real difference, let's briefly highlight again what is imperative programming. Imperative programming is one of the oldest programming paradigms. It has a close connection to machine architecture and the way how the Turing state machine works. The main operation in imperative programming is an `assignment`, and when we are talking about the program, we are talking about the sequence of some `statements`.

Let's imagine some application, and try to write it in imperative and declarative style:

:::info
You get a list of students. You need to find the student with the lowest and the highest score, print them on screen, and also print the average score of all students. You need to operate only on the students from the "A" class.
:::

Try in the playground: [Listing 1.1 - Imperative style](https://www.typescriptlang.org/play?strictNullChecks=false&jsx=0#code/C4TwDgpgBAysCuATCA7YUC8UDeAoKUKAhgLYQBcUAzsAE4CWKA5gNz7UDGA9rRYfCQBGEWmwIcANkSpVKAcgCCcqAB8ocgEJy2AXza5uKGtQTI0sqAtq0iIADxwkqYAD5MUANrtshUnzkAUgAWXChyADScPHwA7AAMkZLSFprKOuHevmTyAX5UEVG8lABsCVBJMvJKUOmZxNnqAaEQ+ZFU3EVQxTGJUpXq1bUEPvX+AEpE8BIF7dGUAKzzvclVaRkAuvr0AGZQABQ0TuYAdBKoTMBBmBhYcQCUOOyXtFwA7oQQ7wCi1jx7cgAVILQCT0YxcXaHMzAKhQMFQCAkMCgACEcjuulwuDO6CC9CYwJoMA6EEc0MoZOcqn4Egk7hQUwkbBxUAkbxawGJ0UpaAppipagZtPpjOZEHQHHg1mcPOAfKO6EFjJFtLF6CIADciDYmKSSe44mrylx4GgAPLbWWw276V54s77PaS6VoWXuKHOKjHMBcMB7O4PFE3KCm5DbRgQRAPPAEHb7Z28V38tDHCrW4OKdGPAix3Z7PEEjlc3hum5YIV0lRqBMy5PAY6zXhQNwFwmckmyhsk6PsHNQVtFjt19w1pMKsQ5nRYvtxvZs16D7nDss0yvVqWJzl1rvRKB2VnsolDhU73g9vsEeeLkvL8ob2vj3s1ac57im4AWq0Aai-E4Imu1IhdWLaAvywUctxPRsIAnKcp1wWc33NS063TW5zygZ43g+b5flof4gREaB4RQLgTAVWFtheEhMOBKAACIFHo8o+nyDFcHggCdT1XcAHpwJNZCrX0QwqC4M5Ti4Jg9gAA0I-t8TbQpoCCaRKAAEmwAcjyXE9RnSZSNK0xTr1JbdoJ0GT2NE8SIEk6S5Loq9jGg-s1KgTTnPbXToWOfS2hJIyvJAzsLKstgbIktkHIUFAoC4oDoFcxhaOgNMGKYuFYU0hLgJJSyMSAA)

```ts title="Listing 1.1 - Imperative style"
type Student = {
  name: string;
  score: number;
  class: 'A' | 'B';
};

const students: Array<Student> = [
  { name: 'Jhon', score: 70, class: 'B' },
  { name: 'James', score: 60, class: 'A' },
  { name: 'Jones', score: 67, class: 'A' },
  { name: 'Raul', score: 55, class: 'A' },
];

if (students.length === 0) {
  throw new Error('The list of students is empty!');
}

let highestScoreStudent: Student | null = null;
let lowestScoreStudent: Student | null = null;
let currentStudent: Student | null = null;
let averageScore = 0;
let countOfStudents = 0;

while ((currentStudent = students.pop()) !== undefined) {
  if (currentStudent.class === 'A') {
    if (highestScoreStudent === null || currentStudent.score > highestScoreStudent.score) {
      highestScoreStudent = currentStudent;
    }

    if (lowestScoreStudent === null || currentStudent.score < lowestScoreStudent.score) {
      lowestScoreStudent = currentStudent;
    }

    countOfStudents++;
    averageScore += currentStudent.score;
  }
}

if (countOfStudents === 0) {
  throw new Error('There is no students from the "A" class');
}

averageScore /= countOfStudents;

console.log(`The highest score has: ${highestScoreStudent.name}, score: ${highestScoreStudent.score}`);
console.log(`The lowest score has: ${lowestScoreStudent.name}, score: ${lowestScoreStudent.score}`);
console.log(`An avarage score in the class "A" is ${averageScore}`);
```

So, what are the steps of this program above?

1. Initialization of variables
2. Establish a loop to iterate over the students by pulling out the last value and assigning it to the `currentStudent` variable
3. Check if the current student is from "A" class
4. If so, assign `currentStudent` to the `highestScoreStudent` variable if the score is higher, or if the `highestScoreStudent` is still `null`
5. Do the same for the `lowestScoreStudent` variable
6. Increase amount of students
7. Put `currentStudent.score` to the `averageScore` variable
8. *and so on...*

How the program structure does look like? What can we say about it? It is the sequence of `statements` and `assignments`.

## 1.2 Declarative programming paradigm

Let's do the same in the functional programming approach:

Try in the playground: [Listing 1.2 - Declarative style](https://www.typescriptlang.org/play?strictNullChecks=false&jsx=0#code/C4TwDgpgBAysCuATCA7YUC8UDeAoKUKAhgLYQBcUAzsAE4CWKA5gNz7UDGA9rRYfCQBGEWmwIcANkSpVKAcgCCcqAB8ocgEJy2AXza5QkKADkuKAKIkwoBbVpEQAHgAqAPkw4oABkrOoOqAAyKFt7JzdcXG4UGmoEZDRZELsHRzgkVGB3LABtdmxCUj45ACkACzM5ABpOHj4Adi8ayWkkzWUdKvzCsnkSoqpq2t5KADYmqBaZeSV-LoIC4l71ErMIQZqqbhGoUfrmqWn1Wc7upeKAJSJ4CSGtusoAVkeD1pmOroBdfWjYrkEAFYQDjAKgaEAeRwAeRqAGkoBAAB7AVCIKhQADWEBAXAAZlAoR4sTj8VDXAAKXH0CASRCUWEASkw7nJ-wBCkoMKgbI0nKZGBZ7DZChyVJpiE+mAwWB5ouptMlAH5vFByOwCMK5eLJe5ZWKFVBlQBGVVQAC0RtwDJ+ZliTAgwGcRHoEgUKEQAAkIEREJC3OSJPQaJRTBYrDYUuFXAzKDlnDVnJKBVAcoGaDkvJ8amngKmg8AAHQSVBMYBlc1QI2fb6RXHwFAg+hmKAkZ0oAP5qG49IJUGUUKpHuZaOUGgMZiqKDmOw8HDsej4js0LtDxJFktlqVYLxMvAEAi8BC0FCECAAdynM9o5LkzjK0Bz3PxNAyiSgQYR4ZAAEI5Nb2DokTiLa6Avr2VAAGK0FwJAAMKHFQCgeDmK7xJkVAFlSEgoteYGZMycSvoWUzotKWCKH++gEAuUDknhiRQTB8GtAo67MJuZHeLu6pQIe8DHqeF7TtB163vevBQEQEkoFwhHgVAuLQSQUBltAABEChqZMCGUQBQGTCBKYSFwZ7rMAMDbBAq7ADUZT0Ew940BZdTWUmUD2o6zquu6Xo+uSPE5AWQX0aCjFwQhCifAWVA8MArKAsCoLgje9y8H+TLSCYZiWNYIADk41muOw-7sL86BEAAbiIRD2s5ElYCFkFKcxMisbwiDwBwEDknRAibGhaD8u4VACFAADUcmZNFlk1DuUAAPSTQxzURWxpZlFRvEOvxJ4AAZ3tAdkOWZwyHdIlAACTYEdjnmZZ1kFucnSnZd132bddVWQNhapRAgEHVAxmmbEv1QGU51QFdQNmZ9D1PZslmvdDTn3d9011IBbqSVV9j2qd74nqp2mtFAGlaR+V2VdVtWWTou26JEvxcMWRZcEw5KtowdHfVQDLWkAA)

```ts title="Listing 1.2 - Declarative style"
type Student = {
  name: string;
  score: number;
  class: 'A' | 'B';
};

type NonEmptyArray<T> = Array<T> & { 0: T }

const students: Array<Student> = [
  { name: 'Jhon', score: 70, class: 'B' },
  { name: 'James', score: 60, class: 'A' },
  { name: 'Jones', score: 67, class: 'A' },
  { name: 'Raul', score: 55, class: 'A' },
];

const objectsBy = <O, K extends keyof O = keyof O>(field: K) => (objA: O, objB: O) => (
  objA[field] === objB[field] ? 0 :
    objA[field] > objB[field] ? 1 : -1
);

const getTailAndHead = <T>(list: NonEmptyArray<T>): [T, T] => [list[0], list[list.length - 1]];

function main(listOfStudents: Array<Student>): string | Error {
  if (listOfStudents.length === 0) {
    return new Error('The list of students is empty!');
  }

  const studentsFromClassA = listOfStudents.filter(student => student.class === 'A');

  if (studentsFromClassA.length === 0) {
    return new Error('There are no students from the "A" class');
  }

  const [lowestScoreStudent, highestScoreStudent] = getTailAndHead(
    [...studentsFromClassA].sort(objectsBy('score'))
  );

  const averageScore = studentsFromClassA.reduce((sum, student) => sum + student.score, 0) / studentsFromClassA.length;

  return `The highest score has: ${highestScoreStudent.name}, score: ${highestScoreStudent.score}
The lowest score has: ${lowestScoreStudent.name}, score: ${lowestScoreStudent.score}
An average score in the class "A" is ${averageScore}`;
}

console.log(main(students));
```

What is the difference between this example from the imperative one? Lets by steps find out what we are doing here:

1. Call the `main` function, which returns the desirable `string` from the list or an `error`
2. Inside the function get a new list of students from class "A"
3. Sort the list of students by score, and then return the tail (`lowestScoreStudent`) and the head (`highestScoreStudent`) values from the sorted list
4. Sum all students scores from "A" class and divide it by the total number of students in this class
5. Return the result string

There are also steps of execution, but rather than a list of `statements`, there is a flow of `expressions`. All the data in the application is immutable, every expression is _independent_ of each other (in terms that it doesn't matter what was before or after the expression, we can easily extract it into another function and pass all required inputs as properties), the intermediate result of one function we store in variables, and then pass them into another function.

Does this program pass the rules of functional programming? Yes, it is! You can argue that there is actually a side effect in our application, a `console.log`. Isn't it means that this application is not **pure**? Yes and no. What actually _IS_ the application? The code from line 0 to the end of the file? Or the business logic of an application? The only important part for us is the `main` function. Is it pure? Yes, it is. We can treat the result of this function as we want, and perform any further computation. We can move this function into some independent module, and then, print the result to the console, send it over the network, insert it to the HTML page, and assert inside the unit tests. What this all means?

:::important
Our application does not **RELY** on side effects, so it can be considered pure.
:::

But can this application be called an idiomatic example of functional programming? No. Indeed, it fits all the functional programming requirements, but it is not the perfect solution that can be achieved in other fully functional programming languages. JavaScript has all the basic capabilities for FP, but it still does not have enough abstractions and utils for it. At the end of the module, we would try to rewrite this application into a more idiomatic one!

## 1.3 Is FP imperative or declarative?

To answer this question, let's compare these two approaches:

| Characteristic            | Imperative approach                                                      | Functional approach                                                              |
|---------------------------|--------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| Description               | The program uses statements to directly operate on a shared global state | The program uses a composition of functions and the data is flowing through them |
| Key traits                | Statements, mutable global variables, procedures                         | Abstraction, composition                                                         |
| Programmer focus          | How to change the state to complete the task                             | What sequence of data transformations are required                               |
| State changes             | Direct                                                                   | The new state is created based on the previous one and is always immutable       |
| Primary flow control      | Loops, conditional statements, goto statements, procedure calls          | Function calls, recursion, pattern matching                                      |
| Primary manipulation unit | Variables, pointers to the complex structures                            | Constants, type classes, algebraic data types                                    |

As we can see FP implements most of the declarative rules, such as programmers focusing on what to do, composition, recursion, immutability, functions as first-class objects, etc.
