---
sidebar_position: 4
---

# 4. Interface vs Abstract Class

| Parameters            | Interface                    | Abstract class              |
| --------------------- | -----------------------------| --------------------------- |
| Multiple inheritances | Implement several interfaces | Only one abstract class     |
| Structure             | Abstract methods             | Abstract & concrete methods |
| When to use           | Future enhancements          | To avoid independence       |
| Adding new methods    | Could be hard                | Easy to do                  |
| Access modifiers      | Only public                  | Public, protected, private  |
| Usage                 | Defines the peripheral abilities of a class | Defines the identity of a class |

An interface is more flexible from a client's point of view: any class can implement any interface. But the interface is **"stiffer"** from the point of view of its developer: it is more difficult to change it (the work of all clients will be broken), restrictions cannot be imposed on the client's constructor, and the code cannot be reused.

Important Reasons For Using Interfaces:
- Interfaces are used to achieve abstraction.
- Designed to support dynamic method resolution at run time
- It helps you to achieve loose coupling.
- Allows you to separate the definition of a method from the inheritance hierarchy

An abstract class is **"stiffer"** from the clients' point of view: the client will be forced to abandon the current base class. But an abstract class is "more flexible" from the point of view of its developer: it allows you to reuse code, restrict the constructor of descendants, allow you to make changes (easily add a virtual method without breaking existing clients), and more clearly define a "contract" with descendants using Template Methods.

Important Reasons For Using Abstract Class:
- Abstract classes offer default functionality for the subclasses.
- Provides a template for future specific classes
- Helps you to define a common interface for its subclasses
- Abstract class allows code reusability.
