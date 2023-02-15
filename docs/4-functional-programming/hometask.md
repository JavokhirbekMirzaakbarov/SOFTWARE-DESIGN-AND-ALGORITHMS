---
sidebar_position: 6
---
import CodeEmbedLink from '@site/src/components/CodeEmbedLink';

# 6. 📚 Home Task

The home task should be done using TypeScript.

:::info
The starter code for the home task is located in _docs/4-functional-programming/hometask_ folder
:::

## Testing the project

In the project directory, run the command bellow to install all required packages:

```bash
npm install
```

To try to run an example.ts, enter the following command:

```bash
npm run start
```

To run the tests, enter the following command:

```bash
npm run test
```

## Task

Imagine that there is some executor, or taxi driver, whatever, who needs to reach some clients. Each client has some `position` and the `reward` for reaching him. Also, he might have a list of `demands`. If he does, it means that the executor should have such `possibilities` to meet that `demands`.

The main task is to write a code inside of the `show` function in `/src/main.ts`. This function takes two parameters and should return the string in the format below:

```
This executor meets the demands of only 3 out of 4 clients

Available clients sorted by highest reward:
name: Philip, distance: 30.364, reward: 600
name: John, distance: 21.378, reward: 250
name: Gregor, distance: 20.025, reward: 230
```

But before starting, you need to implement the missed parts of some utils and algebraic types

## Requirements

During the implementation of each of the functions in utils, suggest you verify it in the tests. It is also a good example of how the function would be used
Steps:

1. First of all, you need to finish the implementation of the `pipe` and `flow` functions (`src/fp/utils.ts`). The `flow` currently accepts only a maximum of up to 3 functions, you need to extend it up to 4 by adding new overloads. Same with the pipe, extend it up to 4 and provide the realization.
2. Next, you can move to `src/fp/maybe.ts`. Get to know what it is, look at the examples in the tests, and implement the code of the `fold` and `fromNullable`
3. Move to `src/fp/either.ts` and implement code of the `map`, `fold` and `fromPromise`.
4. Get to know what is it inside the `src/fp/setoid.ts and ord.ts`, implement the `sort` inside of the `array.ts`
5. When all preparations are done, and all tests inside the `test/fp` are passing `npm run test:fp`, you can start to implement the code of the `src/main.ts`
6. Fix the `getClients` function, because it returns the raw data of the client, where `demands` is just `Array<Demand> | null`. You need to transform it to the `Maybe<Array<Demand>>`
7. Implement the code of the `show` function

The details of the `show` function:

The first line represents how many of the clients the executor can reach.
If all of them: `This executor meets all demands of all clients!`
If some of them: `This executor meets the demands of only ${number} out of ${number} clients`
If none of them: `This executor cannot meet the demands of any client!`. This would be the only line, and the result itself would be `left`

:::info
Remember that you should check if the executor meets the demands of the particular client only if the demands are none! If it is none - the demands is met by default
:::

The first line of the table should be:
`Available clients sorted by ` + `highest reward` in case if `SortBy.reward` was passed, or `distance to executor` in case of `SortBy.distance`

## Tips

* Try to avoid imperative constructions (if, while, for) as much as possible. But still, keep it simple
* Check the usage examples of different functions and type classes in the tests
* Use `fold`, `map` or `getOrElse` to get or manipulate the data inside the type class. Avoid using the `either.right` or `maybe.value`

## Evaluation Criteria

2. Only `main.spec` test is passed
3. Some tests not passed
4. All tests are passed, and some imperative constructions are in use (like `if`, `while`, `switch` or `for` statements, ternary operator allowed), and no `any` keywords
5. All tests are passed, imperative constructions are not in use, and no `any` keyword
