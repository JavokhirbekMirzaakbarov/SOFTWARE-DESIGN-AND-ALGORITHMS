---
sidebar_position: 2
---

# 1. Design Patterns

Design pattern is a commonly used solution for a specific problem in software design. Unlike developed functions or libraries, pattern cannot be just copied to the code. It's not an already made piece of software, but a general conception of solution for the problem, which has to be adjusted and implemented in your software.

Patterns are often misconstrued as algorithms, since both concepts represent common solutions of some known issues. But algorithm is just a defined set of actions unlike pattern, which is a high-level description of a solution. And different programs may have their own implementation of this solution.

There is an analogy for better understanding the difference between these two concepts. Just imagine that algorithm is a cooking recipe with predefined steps and measures while design pattern is a blueprint or scheme of the solution without any direct steps or instructions.

## 1.1 History of Patterns

Who has invented patterns? It's a good but not quite accurate question, since patterns are not being invented. More likely, that they are being explored. Patterns are not extraordinary solutions, but opposite. Most typical, often used solutions for common problems.

Historically the concept of patterns was not about software design. It came from a book about buildings. It was firstly described in book "A Pattern Language. Towns. Buildings. Construction" as a language of environment design. Here patterns were used for architectural questions: how high windows should be, how many floors should be in the building, how much place should be taken for trees and lawn.

This idea was adopted by authors Erich Gamma, Richard Helm, Ralph Johnson and John Vissides. In 1994 they published a book "Design Patterns: Elements of Reusable Object-Oriented Software", which consisted of 23 patterns for different commonly occurring software design problems. Long title of the patterns book was hard to remember, and soon they started calling it "Book by the gang of four" and later just "GoF book". Since then, dozens of  object-oriented design patterns were discovered. 

## 1.2 Types of Patterns

**Creational patterns** – provide a way to create objects while hiding the creation logic, rather than instantiating objects directly using new operator. This gives program more flexibility in deciding which objects need to be created for a given use case.

**Structural patterns** – are related to class and object composition. Concept of inheritance is used to compose interfaces and define ways to compose objects to obtain new functionalities.

**Behavioral patterns** – are used for efficient and safe communication between objects and distribution of responsibility among them. For this purpose, both inheritance and composition-based mechanisms can be used.
Patterns are software development tools. Like real-world tools, that you can simply buy in a hardware store, they have specific purpose and are not equally useful in different scenarios.

Some of them are similar to a trusty hummer, that has very wide range of use. Others can be associated with very specific measurement tool, which is great to have on rare occasion.

We are not going to cover all gang of four design patterns. We will target the most common and most useful. And by the way, most of them are not quite easy to implement in plain JavaScript, and therefore we will use Typescript in examples.
