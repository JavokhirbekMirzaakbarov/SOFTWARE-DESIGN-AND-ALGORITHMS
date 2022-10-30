---
sidebar_position: 3
---

# 2. Duck Typing

:::info
Duck typing in computer programming is an application of the duck test — "If it walks like a duck and it quacks like a duck, then it must be a duck" — to determine whether an object can be used for a particular purpose.

[Wikipedia](https://en.wikipedia.org/wiki/Duck_typing)
:::

## 2.1 If It Walks Like a Duck and Talks Like a Duck Then It's a Duck

To better understand the meaning of this phrase let us analyze it using one of previous examples based on the UML-diagram below: 

Figure 2.1 - Trip – Mechanic interaction

<img
    width="500"
    src={require('./img/trip-mechanic_interaction.jpg').default}
    alt="Trip – Mechanic interaction"
/>

In this example, `Trip` class earlier had to do few calls of Mechanic class method, now those calls are combined into single `prepareBicycles` method call, as you can see on Figure 2.1. But if we will need to prepare something besides bicycles, then our code may look like on example below:

```ts title="Listing 2.1"
class Mechanic {}
class TripCoordinator {}
class Driver {}

class Trip {
  bicycles;
  customers;
  vehicle;

  prepare(prepares: object[]) {
    return prepares.map((preparer) => {
      switch (preparer.constructor) {
        case Mechanic:
          return preparer.prepareBicycles(this.bicycles);
        case TripCoordinator:
          return preparer.buyFood(this.customers);
        case Driver:
          preparer.fillTank(this.vehicle);

          return preparer.fillWaterTank(this.vehicle);
      }
    });
  }
}
```

When introducing new preparers in addition to `Mechanic`, like `TripCoordinator` and `Driver` you will notice how dramatically increased the number of dependencies in prepare method. Now it knows every class name, classes' methods' names and their arguments because it needs to prepare some specific things before the trip. What is even worse, is the fact that this type of code only will increase its size and dependencies number with time, it is the easiest way for developer to add another switch case to already existing cases.

## 2.2 Finding the Duck

We have identified the problem which we need to solve, and now we need to minimize dependencies number to make Trip functionality easily extensible without usage of switch-case operator and other similar approaches. Analyzing existing functionality, we may notice something common between all the preparers, something, that each of them does, but at the same time what they are not. To understand what the instance is we are talking about, let us look on the UML-diagram on Figure 2.2:

Figure 2.2 - Missing Preparer type

<img
    width="700"
    src={require('./img/missing_preparer_type.jpg').default}
    alt="Missing Preparer type"
/>

Every preparer class is responsible for preparing something for the `Trip`, so we can try to extract some `Preparer` abstraction and call it a duck type. As a result we have something similar to an interface, but actually it is just a role which can be applied to some specific class in some specific moment of time, and we cannot say that every `Preparer` class is a part of some types' hierarchy. This is the exact moment when we can extract our duck types, the next step is to review changes in code, which is required to extract the duck type. Our refactoring will be based on the UML-diagram from Figure 2.3:

Figure 2.3 - Trip – Preparer interaction

<img
    width="500"
    src={require('./img/trip-preparer_interaction.jpg').default}
    alt="Trip – Preparer interaction"
/>

When we finish the refactoring, every `Preparer` will have `prepareTrip` method which takes `Trip` instance as an argument so every preparer can take needed data from the instance. Below you can see the refactoring result:

```ts title="Listing 2.2"
class Trip {
  prepare(prepares: { prepareTrip(trip: Trip) }[]) {
    prepares.map((preparer) => {
      preparer.prepareTrip(this);
    });
  }
}

class Driver {}

class Mechanic {
  prepareTrip(trip: Trip) {
    trip.bicycles.map((bicycle) => {
      this.prepareBicycle(bicycle);
    });
  }
}

class TripCoordinator {
  prepareTrip(trip: Trip) {
    this.buyFood(trip);
  }
}
```

`Trip` class changed the most, we have removed all the dependencies on specific implementations of other classes, now every `Preparer` only need to have `prepareTrip` method so Trip class will not change anymore with addition of new preparers.

## 2.3 Writing Code that Relies on Ducks

To sum up the information about duck types we will try to make a list of main points which helps us to write a code using duck types.
1. Recognizing Hidden Ducks. You need to timely understand where the duck types are hidden and how to extract them, pay attention to the next places in the code:
   - Case statements that switch on class.
   - `instanceof` operator.
   - Checking the method exists (`if (obj.someMethod) { obj.someMethod() }`);
2. Placing Trust in Your Ducks. Let client code trust the duck type, in lack of the trust client code means the next: "I know who you are, so I know what you do". Such knowledge transforms into tight coupling between classes which results into non extensible code. Flexible applications built on top of objects which works on trust – your goal as a developer is to make those objects reliable, to let the trust work.
3. Documenting Duck Types. Preparer duck type and its open interface is a specific part of the design, but at the same time it is a virtual part of code, because it is neither a class nor a real interface. Preparers are an abstraction, just a convention which gives you the powerful system design tool, but this abstraction makes code less obvious. When you create a duck type, you must document and cover it with tests.
4. Sharing Code between Ducks. In our example shared is only `prepareTrip` method, but when you start using duck types, you may notice that some part of the functionality is common for all the types. Share such functionality using mixins and other available approaches.
5. Choosing Your Ducks Wisely. The last point, as always, tells us that you do not need to create duck types just to have them. You need to find a balance between resources required for the refactoring, benefit gained, support simplicity and code clarity.
