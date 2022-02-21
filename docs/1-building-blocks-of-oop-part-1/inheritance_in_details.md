---
sidebar_position: 5
---

# 4. Inheritance in Details

## 4.1 Intro

JavaScript is a bit confusing for developers experienced in class-based languages (like Java or C++), as it is dynamic and does not provide a `class` implementation per se (the `class` keyword is introduced in ES2015, but is syntactical sugar, JavaScript remains prototype-based).

When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its `prototype`. That prototype object has a prototype of its own, and so on until an object is reached with `null` as its prototype. By definition, `null` has no prototype, and acts as the final link in this `prototype` chain.

Nearly all objects in JavaScript are instances of `Object` which sits on the top of a prototype chain.

While this confusion is often considered to be one of JavaScript's weaknesses, the prototypal inheritance model itself is, in fact, more powerful than the classic model. It is, for example, fairly trivial to build a classic model on top of a prototypal model.

Inheritance mechanisms, which play a key role in the object approach in terms of extensibility and reuse, model the relationship (IS-A relationship) and exploit the relationship between the base class and its descendant.

:::info

Inheritance is the mechanism of basing an object or class upon another object (prototypical inheritance) or class (class-based inheritance), retaining similar implementation.

:::

:::info

In most class-based object-oriented languages, an object created through inheritance (a "child object") acquires all the properties and behaviors of the parent object

:::

Experienced developers can tell you that overuse of inheritance leads to code that is difficult to understand and maintain. This is primarily because the IS-A relationship is much stronger than the relationship that appears during composition. Therefore, when making changes, you need to be very careful and see if any methods have been overridden, what is the contract of the parent class, at the level of coupling.

Inheritance is essentially an automatic message delegation mechanism. Inheritance creates a relationship in which if one object cannot respond to a received message, it passes that message to another. And this transfer happens automatically.

## 4.2 Recognizing Where to Use Inheritance

Let's look at an example where inheritance can be applied. Let's imagine that we want to rent a bike.

```js title="Listing 4.1"
class Bicycle {
    constructor(options) {
        this.size = options.size;
        this.tapeColor = options.tapeColor;
    };

    spares() {
        return {
            chain: '11-speed',
            tireSize: '28',
            tapeColor: this.tapeColor,
        };
    };
}

const bike = new Bicycle({size: 'M', tapeColor: 'red'});

bike.size; // => 'M'
bike.spares(); // => {chain: '11-speed', tireSize: '28', tapeColor: 'red'}
```

And we need to know what parts need to be replaced in case of a breakdown, so we added `spares` method.

But what happens if we add another bike style? For example, a mountain bike. Now our method looks a little strange.

```ts title="Listing 4.2"
class Bicycle {
    constructor(options) {
        // previous options
        this.style = options.style;
        this.frontShock = options.frontShock;
    };

    spares() {
        if (this.style === 'road') {
            return {
                chain: '11-speed',
                tireSize: '28',
                tapeColor: this.tapeColor,
            };
        }

        return {
            chain: '11-speed',
            tireSize: '29',
            frontShock: this.frontShock,
        };
    };
}

const crossCountryBike = new Bicycle({style: 'XC', size: 'M', frontShock: 'mountain'});
const roadBike = new Bicycle({style: 'road', size: 'M', tapeColor: 'red'});
```

We added 2 new arguments for `MountainBike`. The new `style` property defines what the `spares` method (details) will return using the `if` statement inside the method.
Already this code is hard to maintain, and if we need to add another type of bicycles, our code will turn into a big dump.
It's time for an Abstract class.

Figure 1.1 – Abstract class

<img
    width="500"
    src={require('./img/abstract_class.jpg').default}
    alt="Abstract class"
/>

Subclasses are specializations of their superclasses. `MountainBike` should have everything a `Bicycle` plus something else.
The picture above shows a class diagram where `Bicycle` is a superclass for `MountainBike` and `RoadBike`. The `Bicycle` will contain general behavior, and `MountainBike` and `RoadBike` will add specializations. The public interface of the `Bicycle` should include a `spares` method and a `size` property, and the interfaces of its subclasses will add the necessary parts.
The `Bicycle` is now an abstract class.

## 4.3 Creating an Abstract Superclass with Shared Abstract Behavior

```ts title="Listing 4.3"
abstract class Bicycle {
    // keep only common parts
}

class RoadBike extends Bicycle {
    constructor(options) {
        super(options);

        this.tapeColor = options.tapeColor;
    };

    spares() {
        return {
            ...super.spares(),
            tapeColor: this.tapeColor,
        };
    };
}

class MountainBike extends Bicycle {
    constructor(options) {
        super(options);

        this.frontShock = options.frontShock;
    };

    spares() {
        return {
            ...super.spares(),
            frontShock: this.frontShock,
        };
    };
}
```

Abstract classes exist in order to inherit from them. They provide a common repository that stores the behavior common to all subclasses, and each of them is a specialization of an abstract class.
It almost never makes sense to create an abstract superclass with a single subclass.

## 4.4 Template Method Pattern: Default Implementation

This gives subclasses the ability to inject specialization by overriding the default values set in the parent class. This technique of describing the basic structure/algorithm in a superclass and redefining parts of this structure/algorithm to those that are already specific for a particular class is called the template method.

Bicycle now provides a structure, a general algorithm, for its subclasses. In those places where the base class provides the ability to influence this algorithm to the derived classes, it sends messages `defaultChain` and `defaultTireSize`.

```ts title="Listing 4.4"
abstract class Bicycle {
    protected readonly defaultChain = '11-speed';

    constructor(opts) {
        // ...
        this.chain = opts.chain || this.defaultChain;
        this.tireSize = opts.tireSize || this.defaultTireSize;
    };
}

class RoadBike extends Bicycle {
    protected readonly defaultTireSize = '28';
}

class MountainBike extends Bicycle {
    protected readonly defaultTireSize = '29';
}
```

Something similar can be found in ReactJs library. When creating a component, it has methods `componentDidMount()`, `shouldComponentUpdate()` you can change their implementation yourself.

Okay, we split the `MountainBike` and the `RoadBike`, but now there are new problems:
- Mountain bike and road bike classes depend on their abstract class;
- Abstract class depends on children;
- If you forget to call super methods – the result might not contain all data required;
- Users of road and mountain bike depend on the abstract class, even if they don't know anything about it.

## 4.5 Using Hook Messages: Decoupling Subclasses

This strategy removes the knowledge of the algorithm from the subclass and returns control to the superclass. Which was done by adding the `postInitialize` method.

`RoadBike` and `MountainBike` no longer control the initialization process, but instead bring specialization to a more abstract algorithm. This algorithm is defined in the abstract superclass `Bicycle`, which in turn is responsible for sending `postInitialize`. To achieve this result Bicycle constructor should always be called, this will happen automatically if derived classes will have no constructor.

This same technique can be used to remove the dispatch of super in the `spares` method.

```ts title="Listing 4.5"
 abstract class Bicycle {
     constructor(opts) {
         this.size = opts.size;
         this.chain = opts.chain;
         this.tireSize = opts.tireSize;

         this.postInitialize(opts);
     };
 
    protected postInitialize() {};
 
    spares() {
         return {
             tireSize: this.tireSize,
             chain: this.chain,
             ...this.localSpares()
         };
     };
 }
 
class RoadBike extends Bicycle {
    protected postInitialize(opts) {
        this.tapeColor = opts.tapeColor;
    };

    protected localSpares() {
        return { tapeColor: this.tapeColor };
    };
}

class MountainBike extends Bicycle {
    protected postInitialize(opts) {
        this.frontShock = opts.frontShock;
    };

    protected localSpares() {
        return { frontShock: this.frontShock };
    };
}
```

## 4.6 Summary

- Inheritance solves the problem of related types that share a great deal of common behavior but differ across some dimension;
- The best way to create an abstract superclass is by pushing code up from concrete subclasses;
- Abstract superclasses use the template method pattern to invite inheritors to supply specializations, and they use hook methods to allow these inheritors to contribute these specializations without being forced to send super;
- Well-designed inheritance hierarchies are easy to extend with new subclasses, even for programmers who know very little about the application;
