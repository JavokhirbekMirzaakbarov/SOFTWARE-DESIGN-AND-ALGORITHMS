---
sidebar_position: 7
---

# 6. Home Task

The home task needs to be done using Typescript.

:::info
The starter code for the home task is located in _docs/2-building-blocks-of-oop-part-2/hometask_ folder
:::

## Requirements

You need to implement:
1. class `Page`:
   - property `pageNumber`
   - property `pageType` ("with text" for `Book`, "with article" for `Magazine`, "with images" for `Comics`)
   - property `pageMaterial` ("simple paper" for `Book`, "glossy paper" for `Magazine` and `Comics`)

2. class `Pages` which is wrapper for array of `Page` instances
   - should provide appropriate methods/getters to communicate with iterator

3. `PagesIterable` mixin:
   - You can use 3rd library or `Symbol.iterator` to implement `PagesIterable` mixin
   - the `for..of`, spread operator `…` and other data consumers should work with your iterables (`Book`, `Magazine`, `Comics`)

4. abstract class `Item` with abstract `toString` method. Make `Book`, `Magazine` and `Comics` inherited from `Item` class. Mix `Iterable` behavior into `Item`'s prototype

5. class `Book` (should be `Iterable`):
   - properties: `pages`, `title`, `author`
   - setters and getters for `title` and `author`
   - `toString` -> `"Book: {book title} by {author} with number of pages: {number}"`
   - `pages` property keeps instance of `Pages` class

6. class `Magazine` (should be `Iterable`):
   - properties: `pages`, `title`
   - setters and getters for `title`
   - `toString` -> `"Magazine: {title} with number of pages: {number}"`
   - `pages` property keeps instance of `Pages` class

7. class `Comics` (should be `Iterable`):
   - properties: `pages`, `title`, `author`, `artist`
   - setters and getters for `title`, `author` and `artist`
   - `toString` -> `"Comics: {title} by {author}, the artist is {artist}, number of pages: {number}"`
   - `pages` property keeps instance of `Pages` class

## Extra mile

Implement `PageFactory`, so it will incapsulate pages creation logic.

## Usage

You also can run jasmine tests using `test` script from `package.json` to make sure that main requirements are met.

## Evaluation criteria

2. Only some classes were implemented.
3. Some classes were not implemented.
4. Some required methods are missing.
5. All tasks are implemented to a full extend.
