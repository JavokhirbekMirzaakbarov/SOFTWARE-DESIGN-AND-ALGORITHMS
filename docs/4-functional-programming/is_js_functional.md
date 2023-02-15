---
sidebar_position: 5
---

# 5. Functional programming in JS/TS

As we have seen from examples before - JS supports main functional principles, but not static types. So, we would talk about the features that TS supports:

* Functions are first-class citizens
* Lexical scope
* Anonymous functions (lambdas)
* Parametric and ad-hoc polymorphism
* Possibility to implement type-classes, algebraic structures (Functors, Monads, Setoids), and algebraic data types (tuples, records, unions)

But, some features are missed:

* Higher kinded types
* Tail call optimizations
* Built-in pattern matching
* Built-in algebraic data types

## 5.1 Widespread functional JS libraries

### 5.1.1 Ramda

Ramda is a library of functions which is written in a purer functional style. Functions are automatically curried. Does not provide any new abstractions or methodologies, just utils.

```js title="Listing 5.1.1 - curried multiplication"
const double = R.multiply(2);
double(3); // 6
```

In order to run _Listing 4.5_ open [Try ramda](https://ramdajs.com/repl/)

More info - [Ramda](https://ramdajs.com/)

### 5.1.2 Lodash

The lodash/fp module promotes a more functional programming (FP) friendly style by exporting an instance of `lodash` with its methods wrapped to produce immutable auto-curried iterate-first data-last methods. Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.

Lodash modular methods are great for:

- Iterating arrays, objects, & strings
- Manipulating & testing values
- Creating composite functions

```js title="Listing 5.1.2 - array filtering"
var users = [
  { user: "barney", age: 36, active: true },
  { user: "fred", age: 40, active: false },
];

_.filter(users, function (o) {
  return !o.active;
}); // [{ user: "fred", age: 40, active: false }]
```

To run _Listing 5.1.2_ open [lodash docs](https://lodash.com/docs/4.17.15) and press the **Try in REPL** button on any code example.

More info - [Lodash](https://lodash.com/).

### 5.1.3 FP-TS

fp-ts provides developers with popular patterns and reliable abstractions from typed functional languages in TypeScript. Allows you to make from TypeScript full-featured FP language, provides a lot of new abstractions and implements a full set of algebraic data structures.

```ts title="Listing 5.1.3 - transform first element of array"
import * as O from 'fp-ts/Option';
import { flow } from 'fp-ts/function';

const double = n => n * 2;
const head = <A>(as: ReadonlyArray<A>): O.Option<A> => (as.length === 0 ? O.none : O.some(as[0]));
const inverse = (n: number): O.Option<number> => (n === 0 ? O.none : O.some(1 / n));

const main = flow<ReadonlyArray<number>>(
  head, // get first element
  O.map(double), // double it
  O.chain(inverse), // 1 / n
  O.match(
    () => 'no result', // onNone handler
    (head) => `Result is ${head}` // onSome handler
  ),
);

main([5, 2, 3]); // Result is 0.1
main([]); // no result
main([0]); // no result
```

### 5.1.4 React

As you know, React is one of the most popular JavaScript libraries to create Web user interfaces. Its success is due to several factors, but maybe one of them is the clean and effective approach to programming. In the React environment, every piece of a UI is a component. Components can be composed together to create other components. The application itself is a component: a composition of components. For example, _Listing 4.7_. The task is to create a user form.

```jsx title="Listing 5.1.4 - user form"
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

const Input = ({ value, label, onChange }) => (
  <div>
    <label>
      {label}: <input value={value} onChange={(event) => onChange(event.target.value)}></input>
    </label>
  </div>
);

const ShowButton = ({ onClick, isShowing }) => {
  return (
    <button onClick={onClick}>
      {isShowing ? 'Hide values' : 'Show values'}
    </button>
  );
};

const App = () => {
  const [formState, setFormState] = useState({
    name: '',
    lastName: '',
    email: ''
  });
  const [showValues, setShowValues] = useState(false);
  const toggleValues = useCallback(
    () => setShowValues((isShowing) => !isShowing),
    []
  );

  const setStateFor = (field) => (value) =>
    setFormState((state) => ({ ...state, [field]: value }));

  return (
    <div>
      <Input
        value={formState.name}
        label="Name"
        onChange={setStateFor('name')}
      />
      <Input
        value={formState.lastName}
        label="Last name"
        onChange={setStateFor('lastName')}
      />
      <Input
        value={formState.email}
        label="Email"
        onChange={setStateFor('email')}
      />
      <ShowButton onClick={toggleValues} isShowing={showValues}/>
      {showValues ? (
        <ul>
          {Object.entries(formState).map(([field, value]) => (
            <li key={field}>
              {field}: {value}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);
```

In the code above, there are three components `Input`, `ShowButton`, and `Main`. By composing components in the `Main` component a variety of screens can be created. For example, to create different types of `Input` the props have to be passed instead of creating three different `Input` elements. The state is immutable and changed only by calling callbacks which re-renders components with just a new state. It is pretty reusable.

You can run this code here: https://codesandbox.io/s/app-zi9cxr.

More info - [React](https://reactjs.org/).

## 4.4 Pros and Cons of FP

Pros
- Due to limitations and strict rules applications written in FP manner are much more stable, and fault-tolerant and have almost zero number of runtime errors
- Code becomes more straightforward and self-explanatory because of high abstractions and declarative
- Easier testing and debugging
- High-modularity
- Much easier to write high cohesion and low coupled code

CONS
- Some languages are not optimized for functional programming and code might be less effective
- The very steep learning curve
- It is not so widespread as imperative programming, so it's way harder to find novice-friendly resources
