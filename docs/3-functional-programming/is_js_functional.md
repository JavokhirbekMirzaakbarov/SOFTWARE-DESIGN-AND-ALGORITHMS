---
sidebar_position: 4
---

# 4. Functional programing in JS

## 4.1 Functional concepts in JS

Based on the concepts of FP let's see if we can say that JS is implementing a functional programming paradigm.

The first concept is **immutability** - JavaScript has built-in methods which follow this rule.
For example, `filter`, `reduce`, `map`. For more information you can check [JS Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#).

```js title="Listing 4.1 - Array mutation"
const fruit = ["banana", "orange"];
fruit.push("kiwi");

console.log(fruit); // ["banana", "orange", "kiwi"]
```

_Not a functional approach_

In the _Listing 4.1_ array of fruit was mutated by adding new fruit to it.

```js title="Listing 4.2 - immutable Array"
const fruit = ["banana", "orange"];
const newFruit = [...fruit, "kiwi"];

console.log(fruit); // ["banana", "orange"]
console.log(newFruit); // ["banana", "orange", "kiwi"]
```

_Functional approach_

In _Listing 4.2_ it is obvious that we do not mutate the original array (Immutability). So there is a possibility in JavaScript to follow the immutability principle.

The second concept is **No shared state**

In order to avoid a shared state in JS, you can use such a library like [Redux](https://redux.js.org/), any other similar library, or all suggested approaches in the [How to avoid shared state](/docs/functional-programming/main_concepts#322-how-to-avoid-it) part could be used.

You might already notice that all of these principles could be applied in JS.

The third concept is **Composition**.

The main idea of inheritance is to make code more reusable. With the functional way, as was mentioned before in [Composition part](/docs/functional-programming/main_concepts#33-composition) we can do it without inheritance by using the composition of small functions. It has some advantages over inheritance - it is more flexible, does not require thinking in advance, and is easier to test.

## 4.2 Functional possibilities in JS

What about language possibilities?

**First class function** is implemented in JS, so we can use it for our purpose.

```js title="Listing 4.3 - functions are called one by one"
const foo = (a, b) => a + b;
const buzz = (c) => console.log(c);
const res = foo(4, 5);
buzz(res); // 9
```

_Not a functional approach_

In the _Listing 4.3_ there are two functions, `foo` adds two numbers, and `buzz` logs the input value in the console. In this case, in order to log the result in the console, we create the additional variable `res` which contains the result of `foo` and the pass `res` as an argument in the `buzz`.

```js title="Listing 4.4 - passing function as an argument"
const foo = (a, b) => a + b;
const buzz = (c) => console.log(c);
buzz(foo(4, 5)); // 9
```

_Functional approach_

In the _Listing 4.4_ there are two functions, `foo` adds two numbers, and `buzz` logs the input value in the console. In this case, in order to log the result in the console, we pass `foo` called with the arguments in the `buzz`.
This code will be executed in the next order:

- `foo` will be executed with `4, 5`
- result of execution `foo` will be passed to the `buzz` as a parameter

In _Listing 4.4_, there is an implementation of how a function can be passed as a parameter to another function, and that is definitely a possibility of functional language.

Currying is a technique that has to be supported in the language. So functions with more than one argument can be divided into several functions with one argument. The part [Currying](/docs/functional-programming/language_possibilities#22-currying) tells in detail about supporting this possibility in JavaScript.

**Conclusion**: it might look like JS is a strict functional programming language, because it follows all functional rules. However, JS includes some OOP principles as well. Such as inheritance. So, it will not be completely right to say that it is a functional programming language. It is rather both. So we can combine the best features of both approaches in order to achieve good results.

## 4.3 Widespread functional JS libraries

### 4.3.1 Ramda

The library is designed specifically for a functional programming style, one that makes it easy to create functional pipelines, one that never mutates user data. Ramda includes all of the favorite list-manipulation functions you expect, e.g. map, filter, reduce, find, etc. Ramda methods are automatically curried. For example, _Listing 4.5_. The function `multiply` returns another function, remembers the first arguments, and multiplies the first argument with the second one.

```js title="Listing 4.5 - curried multiplication"
const double = R.multiply(2);
double(3); // 6
```

In order to run _Listing 4.5_ open [Try ramda](https://ramdajs.com/repl/)

More info - [Ramda](https://ramdajs.com/)

### 4.3.2 Lodash

The lodash/fp module promotes more functional programming (FP) friendly style by exporting an instance of `lodash` with its methods wrapped to produce immutable auto-curried iteratee-first data-last methods. Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
Lodash modular methods are great for:

- Iterating arrays, objects, & strings
- Manipulating & testing values
- Creating composite functions

```js title="Listing 4.6 - array filtering"
var users = [
  { user: "barney", age: 36, active: true },
  { user: "fred", age: 40, active: false },
];

_.filter(users, function (o) {
  return !o.active;
}); // [{ user: "fred", age: 40, active: false }]
```

In order to run _Listing 4.6_ open [lodash docs](https://lodash.com/docs/4.17.15) and press the **Try in PERL** button on any code example.

More info - [Lodash](https://lodash.com/)

### 4.3.3 React

As you know, React is one of the most popular JavaScript libraries to create Web user interfaces. Its success is due to several factors, but maybe one of them is the clean and effective approach to programming.
In the React environment, every piece of a UI is a component. Components can be composed together to create other components. The application itself is a component: a composition of components. For example, _Listing 4.7_. The task is to create a user form.

```js title="Listing 4.7 - user form"
const Input = (props) => {
  const { value } = props;
  return (
    <div>
      <input></input>
      {value}
    </div>
  );
};

const Button = () => {
  return <button> Click me! </button>;
};

const Main = () => {
  return (
    <>
      <Input value="Name" />
      <Input value="Last Name" />
      <Input value="email" />
      <Button />
    </>
  );
};

// ReactDOM.render(
//   <Main />,
//   document.getElementById('root')
// );
```

Figure 4.1 - _Listing 4.7_ result

<img
width="500"
src={require('./img/sample.png').default}
alt="Abstract class"
/>

In the code above, there are three components `Input`, `Button`, and `Main`. By composing components in the `Main` component a variety of screens can be created. For example, in order to create different types of `Imput` the props have to be passed instead of creating three different `Input` elements. It is pretty reusable.

There are two ways how to run this code:

- to use configured [code pan](https://codepen.io/pen?&editors=0010) that supports babel and react.
- to run `npx create-react-app` locally.

In both cases commented code should be uncommented.

More info - [React](https://reactjs.org/)

## 4.4 Pros and Cons of FP

Pros
- No side effects (if they are not necessary) - because we are following the immutability principle.
- Pure functions are easier to understand because they depend only on the given input and don't change any states. With the same input, they always give the same output. Their function signature gives all the information about them.
- The ability of functional programming languages to treat functions as values and pass them to functions as parameters make the code more readable and easily understandable.
- Testing and debugging are easier. Since pure functions take only arguments and produce output, they don't produce any changes don't take input, or produce some hidden output. They use immutable values, so it becomes easier to check some problems in programs written using pure functions.
- It is used to implement concurrency/parallelism because pure functions don't change variables or any other data outside it.
- It adopts lazy evaluation which avoids repeated evaluation because the value is evaluated and stored only when it is needed.

CONS
- The readability can be reduced by a lot of pure functions.
- Loss of performance could take place, because of the immutability principle.
