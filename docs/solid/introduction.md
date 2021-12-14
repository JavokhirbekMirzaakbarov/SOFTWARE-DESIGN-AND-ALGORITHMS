---
sidebar_position: 2
---

# 1. Introduction

In this section you are going to learn about SOLID principles that are commonly used in development and software design. You will study each of the principles in details, review examples of their usage and violations. As a result, you will understand why SOLID principles are needed and whether they are needed at all.

## 1.1 Design Principles Overview

There are **formal (measurable) criteria** that describe the quality of the code or design, e.g. the cyclomatic complexity of methods, the depth of the inheritance hierarchy, the number of method lines, etc. They are certainly useful and keeping these values in the normal range is necessary but not sufficient condition for good software design.

Figure 1.1 - Good code VS Bad code

<img
  width="500"
  src={require('./img/good_vs_bad_code.jpg').default}
  alt="Good code VS Bad code"
/>

In addition to formal criteria, there are common concepts of good design: low coupling and high cohesion.

**Low coupling** - modules should be as independent as possible from other modules, so that changes to modules do not heavily impact other modules.

**High cohesion** - keep elements of the module that are related to the functionality that module provides as close to each other as possible.

Even though these concepts are useful, they are too **abstract and informal**.

Figure 1.2 - Low coupling/high cohesion VS high coupling/low cohesion

<img
  width="700"
  src={require('./img/coupling_and_cohesion.jpg').default}
  alt="Low coupling/high cohesion VS high coupling/low cohesion"
/>

There are design principles **between formal and informal criteria**. Design principles are rules that experienced designers rely on. Their main goal is to describe in simple words what is "good and what is bad" in software design. For example: "A class should have only one reason to change, have a minimal interface, correctly implement inheritance and prevent cascading changes in the code when requirements change".

Design principles are used to combat complexity and make it easier to introduce changes needed. So before studying design principles, let us quickly review code smells that make our systems more complicated. 

Consider the following code smells:
- **Rigidity** – hard to change.
- **Fragility** – easy to break.
- **Immobility** – hard to reuse.
- **Viscosity** – hard to choose the right way to introduce changes.
- **Needless complexity** – overdesign.

As you can see, all smells are somehow related to a change in the code.

## 1.2 What is SOLID

When our application has only 200 lines, the design itself is not needed. It is enough to write 5-7 methods carefully and everything will be fine. Problems might arise when the system grows and requires scaling.

**SOLID** is an acronym used for the first five object-oriented design principles by Robert C. Martin (also known as Uncle Bob). He did not invent or discover them, but simply structured and combined into a set of 5 principles commonly known to us.

SOLID stands for:
- **S** – Single-responsibility Principle
- **O** – Open-closed Principle
- **L** – Liskov Substitution Principle
- **I** – Interface Segregation Principle
- **D** – Dependency Inversion Principle

These principles establish practices that tend to develop software with considerations for maintaining and extending as the project grows. Adopting these practices can also contribute to avoiding code smells, refactoring code, and agile or adaptive software development.

:::info
SOLID principles make both development and software design adaptive to changes, easy to scale and maintain.
:::
