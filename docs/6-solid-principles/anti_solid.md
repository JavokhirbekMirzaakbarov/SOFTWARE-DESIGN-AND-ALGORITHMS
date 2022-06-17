---
sidebar_position: 4
---

# 3. Anti SOLID

Let us summarize all the information we got about SOLID principles and talk about anti SOLID behavior that you might have faced.

- **Anti-SRP** - "Blurred" responsibility principle: classes are split into many small classes, resulting in logic being spread across multiple classes and/or modules.
- **Anti-OCP** - Factory-Factory Principle. The design is too general and extensible, with too many levels of abstraction.
- **Anti-LSP** - The principle of unclear inheritance: either an excessive amount of inheritance, or in its complete absence.
- **Anti-ISP** - Thousand Interface Principle. Class interfaces are fragmented into too many pieces, making them awkward for all clients to use.
- **Anti-DIP** - "DI-brain" Principle. Interfaces are allocated for each class and passed in batches through constructors. It becomes almost impossible to understand where the logic is.
