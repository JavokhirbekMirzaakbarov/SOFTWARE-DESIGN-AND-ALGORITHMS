---
sidebar_position: 3
---

# 3. Main concepts

## 3.1 Immutability

The main rule of an immutable object is it cannot be modified after creation. Conversely, a mutable object is each object which can be modified after creation.

The data flow in the program is lossy if the immutability principle is not followed, that is why it is the main concept of functional programming. For example, _Listing 3.1_. Data mutations can lead to hard-to-find bugs.

```js title="Listing 3.1"
const stats = [
  { name: "John", score: 1.003 },
  { name: "Lora", score: 2 },
  { name: "Max", score: 3.76 },
];

const formattedStats = stats.map((entry) => { // (1)
  entry.score = Math.floor(entry.score); // (2)
  entry.name = entry.name; // (3)

  return entry; // (4)
});

console.log(stats); // [{ name: "John", score: 1 }, { name: "Lora", score: 2 }, { name: "Max", score: 3 }]
console.log(formattedStats); // [{ name: "John", score: 1 }, { name: "Lora", score: 2 }, { name: "Max", score: 3 }]
```

In the `Listing 3.1` the `stats` array includes actual data from a database. It has player `name` and `score` that shows win percentage. The task is to display the `score` to the user as a rounded down integer. In lines from _(1)_ to _(4)_ it goes through array and modifies `score` in a needed way and the result of this operation is `formattedStats` array. The last step is to console two arrays `stat` and `formattedStats` and the result is unexpected. Both arrays are equal. That is because inside the `map` the `stats` entry was modified. These kinds of bugs are hard to find and can lead to undesired outcome. Immutability helps to avoid such behavior. Let's see how to avoid mutation in _Listing 3.2_.

```js title="Listing 3.2"
const stats = [
  { name: "John", score: 1.003 },
  { name: "Lora", score: 2 },
  { name: "Max", score: 3.76 },
];

const formattedStats = stats.map(entry => {
  return { ...entry, score: Math.floor(entry.score) };
});

console.log(stats); // [{ name: "John", score: 1.003 }, { name: "Lora", score: 2 }, { name: "Max", score: 3.76 }]
console.log(formattedStats); // [{ name: "John", score: 1 }, { name: "Lora", score: 2 }, { name: "Max", score: 3 }]
```

There are two arrays `stats` and `formattedStats` in _Listing 3.2_. The difference is in the `map` function. Instead of modifying `stats` entry it creates a new entry with copied data and modified `score` value. As a result, there are two arrays with different values.

In JavaScript, it might be easy to confuse `const` with immutability. The variable which cannot be redeclared is created by using `const` but immutable objects are not created by `const`. You can't change the object that the binding refers to, but you can still change the properties of the object, which means that bindings created with `const` are mutable.

Immutable objects can't be changed at all. You can make a value truly immutable by deep-freezing the object. JavaScript has a method that freezes an object one-level deep (in order to freeze an object deeply, recursion could be used to freeze each property and nested objects):

```js title="Listing 3.3"
const student = Object.freeze({
  greeting: "Hello",
  subject: "student",
  mark: "!",
});

student.greeting = "Goodbye";
// Error: Cannot assign to read only property 'foo' of object Object
```

There are several libraries in JavaScript which try to follow this principle, for example, [Immutable.js](https://immutable-js.com/) or [immer](https://github.com/immerjs/immer).

### 3.1.1 Side effects

If state changes are observable outside the called function and they are not returned value of the function it is a side effect.

Side effects include:

- Modifying any external variable or object property (e.g., a global variable, or a variable in the parent function scope chain)
- Logging to the console
- Alert
- Writing to the screen, in other words, replacing the content of a specific tag (querySelector(), getElementById(), etc.)
- Writing to a file
- The HTTP request might have side effects - therefore the function that triggers the request transitively have side effects
- Triggering any external process
- Calling any other functions with side effects

In functional programming side effects are mostly avoided. It makes a program much easier to understand, and much easier to test.

That is important to understand that a program without side effects does nothing. If the code does not write to or read from a database, does not make any requests, does not change UI, etc., it does not bring any value. So we cannot completely avoid side effects.

What we can do is isolate side effects from the rest of your software. In case of keeping side effects separately from the rest of the software, the application will be much easier to extend, refactor, debug, test, and maintain.

That is why a lot of front-end frameworks suggest using state management tools along with the library. Because it separates components rendering from state management, and they are loosely coupled modules. ReactJS and Redux are examples of that.

### 3.1.2 Pure functions

A function is called **pure** if it has the following properties:
- Given the same input, always returns the same output
- Function without side effects

A pure function also can be called a **deterministic** function.

Such JS arrays methods as: `map`, `filter`, `reduce` etc., are examples of pure function. A pure function does not depend on any state, it only depends on input parameters.

Let's look on the example:

```js title="Listing 3.4"
const doublePrice = (price) => price * 2;

doublePrice(2);
```

In this case, there are no side effects because `price` comes as an argument. Also, the result will always be 4 if the `price` is 2.

Just to compare let's check another example:

```js title="Listing 3.5"
let price = 2;

const doublePrice = () => (price = price * 2);

doublePrice();
```

You might have already noticed the difference. There is a side effect in this case. The `price` is changed inside the function, but `price` is declared outside the `doublePrice` function scope.

## 3.2 No shared state

**Shared state** is a memory space (could be an object or simple variable) that is reachable from all program parts. In other words, it is global and exists in shared scope. It also could be passed as a property between scopes. If two or more application parts change the same data, then the data is a shared state.

### 3.2.1 Problems with shared state

If the state is changing from more than one place in the application, there is a risk of one modification preventing another part of the application to work with the actual data. So it might lead to strange hard to track bugs.

```ts title="Listing 3.6"
const shoppingList = ["bread", "milk", "wine"];

function logItems<T>(items: T[]) {
  while (items.length) {
    console.log(items.shift());
  }
}

function functionA() {
  // some code
  logItems(shoppingList);
}

function functionB() {
  // some code
  logItems(shoppingList);
}

functionA();
functionB();

// bread
// milk
// wine
// undefined (1)
```

Let's analyse the code:

- Functions `functionA()` and `functionB()` do something and log `groceryItems`.
- Function `logItems()` logs elements into `console`. However, it removes elements from the array while logging them. So when `logItems()` is executed as a result of `functionB()` call there is nothing to log and that's why there is `undefined` in a line (1).

### 3.2.2 How to avoid it

#### By copying data

Until we are reading from a shared state without any modification we are safe. Before doing some modifications we need to "un-share" our state.

Let's try to fix the previous example:

```ts title="Listing 3.7"
const shoppingList = ["bread", "milk", "wine"];

// this is contrived example as normally we would want to use `map` function of the array
// sometimes though such sitations happen and copying the passed in array before making modifications is vital
function logItems<T>(items: T[]) {
  const copiedItems = [...arr];

  while (copiedItems.length) {
    console.log(copiedItems.shift());
  }
}

function functionA() {
  // some code
  logItems(shoppingList);
}

function functionB() {
  // some code
  logItems(shoppingList);
}

functionA();
functionB();

// bread
// milk
// wine
// bread
// milk
// wine
```

Let's analyse the code:

- Functions `functionA()` and `functionB()` do something and logs  `groceryItems`.
- Function `logItems()` logs elements into `console`. The code creates a new variable `copiedItems`, a copy of `items`. Changes to `copiedItems` won't affect `items` so everything works as expected.

#### By updating non-destructively

Let's imagine that we have to add some fruit to our shopping list.

```js title="Listing 3.8"
const shoppingList = ["bread", "milk", "wine"];

function addToShoppingList(shoppingList, item) {
  return [...shoppingList, item];
}

console.log(addToShoppingList(shoppingList, "fruit")); // ['bread', 'milk', 'wine', 'fruit']
console.log(shoppingList); // ['bread', 'milk', 'wine']
```

#### By making data immutable

We can prevent mutations of shared data by making that data immutable. If data is immutable, it can be shared without any risks. In particular, there is no need to copy defensively.

## 3.3 Composition

**Function composition** is a combination of two or more functions. The single function does a small piece which is not valuable for an application, so in order to achieve the desired result, small functions have to be combined. You can imagine composing functions as pipes of functions that data has to go through, so that outcome is reached. In functional programming, it is preferable to use composition over inheritance.

### 3.3.1 Composition over inheritance

Let's check the example with object composition in JavaScript. This approach combines the power of objects and functional programming. For example, let's create an animal that can talk and eat. Previously, using inheritance we would have abstract class `Animal` and a child class `TalkingAnimal`. Imagine we had to add more and more animals. In this case, the hierarchy could become messy, since abilities are shared between animals.

Composition helps to solve the problem:

```js title="Listing 3.9"
const createDog = (name) => {
  // (1)
  const self = { name };

  return self;
};

const buddy = createDog("Buddy");
```

The first step in _Listing 3.9_ _(1)_ is to create a function that creates an animal (e.g. `createDog`).

The internal variable `self` represents the prototype using classes or prototypes.

The next step _(2)_ (_Listing 3.10_ _(2)_) is defining behaviors, it will be created as functions receiving the `self`. Because they are functions it is easy to combine them. And finally _(3)_, all of these functions have to be merged. `Object.assign` or the spread operator `({...a, ...b})` can be used for this purpose.

```js title="Listing 3.10"
const canSayHi = (self) => ({
  // (1)
  sayHi() { console.log(`Hi! I'm ${self.name}`) },
});

const canEat = () => ({
  eat(food) { console.log(`Eating ${food}...`) },
});

const behaviors = (self) => Object.assign({}, canSayHi(self), canEat()); // (2)

const createDog = (name) => {
  const self = { name };

  const dogBehaviors = (self) => ({
    bark() { console.log("Ruff!") },
  });

  return Object.assign(self, behaviors(self), dogBehaviors(self)); // (3)
};

const buddy = createDog("Buddy");

buddy.sayHi(); // Hi! I'm Buddy
buddy.eat("Petfood"); // Eating Petfood...
buddy.bark(); // Ruff!
```

The different behaviors were defined by using the prefix `can`. Also, some behavior was combined _Listing 3.10, 2_ by **composition**.

Let's create another animal, for example, a cat. The cat can talk and, it can eat as all animals do:

```js title="Listing 3.11"
const createCat = (name) => {
  const self = { name };

  const catBehaviors = (self) => ({
    meow() { console.log("Meow!") },
    haveLunch(food) {
      self.eat(food);
    },
  });

  return Object.assign(self, catBehaviors(self), canEat());
};

const kitty = createCat("Kitty");

kitty.haveLunch("fish"); // Eating fish...
kitty.meow(); // Meow!
```

Keep in mind that all functionality was added in the same `self` reference, that is a reason why `self.eat` can be called within `haveLunch`. That allows us to create `catBehaviors` on top of other `behaviors`.

So composition is easier in maintenance and for reusability purposes. It is easy to refactor the code if needed. Composition is a simple _mental model_, so there is no need to think in advance of hierarchy, and we can combine all small pieces in the way that we need them to be. For example, _Listing 3.12_. The task is to create a statistic board with the possibility to sort and perform searches by different criteria.

```js title="Listing 3.12"
const stats = [
  { name: "Lora", score: 1.003 },
  { name: "Lora", score: 1.003 },
  { name: "Lora", score: 2 },
  { name: "Max", score: 3.76 },
];

const sortStats = (stats) => {
  return arr.sort((a, b) => b.score - a.score);
};

const findStatsByName = (name) => {
  return (arr) => arr.filter((item) => item.name === name);
};

const findStatsByScore = (score) => {
  return (arr) => arr.filter((item) => item.score === score);
};

const compose = (...funcs) => {
  return (arr) => {
    return funcs.reverse().reduce((acc, func) => func(acc), arr);
  };
};

console.log(compose(findStatsByName("Lora"))(stat)); // [{ name: "Lora", score: 1.003 }, { name: "Lora", score: 1.003 }, { name: "Lora", score: 2 }]
console.log(compose(findStatsByScore(1.003), findStatsByName("Lora"))(stats)); // [{ name: "Lora", score: 1.003 }, { name: "Lora", score: 1.003 }]
console.log(compose(sortStats, findStatsByName("Lora"))(stats)); // [{ name: "Lora", score: 2 }, { name: "Lora", score: 1.003 }, { name: "Lora", score: 1.003 }]
```

`compose` function is a self-invoking\* function that can take any number of parameters and execute right-to-left, in other words, performs right-to-left function composition. So, you can compose functions the way you need. There is a possibility to use `findStatsByName` and `sortStats` in one part of the application and `findStatsByName` and `findStatsByScore` in another without any duplication, by composing small reusable parts.

\* **self-invoking** function is a nameless (anonymous) function that is invoked immediately after its definition.
