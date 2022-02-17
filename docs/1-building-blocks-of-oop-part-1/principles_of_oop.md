---
sidebar_position: 4
---

# 3. Principles of OOP

We are done with the introductory part, let us move on to the principles of object-oriented programming. We will consider four basic principles of OOP on which the object-oriented concept, object-oriented programming is based: abstraction, polymorphism, encapsulation, and inheritance. In some sources, more concepts are highlighted, for example, Wikipedia still refers to the fundamental concepts of object-oriented programming such concepts as class and object. But these four concepts are the classics on which the concept of object-oriented programming is based.

## 3.1 Abstraction

Abstraction in object-oriented programming means the highlighting of some significant parts, meaningful information from a component, no matter whether it is a class or an architectural layer in the system, or a logical unit of our system. In general, the highlighting of significant parts or exclusion of insignificant parts from consideration. In OOP, only data abstraction is considered, usually it simply called as "abstraction" implying a set of the most significant characteristics of an object available for the program. Abstraction is essential when dealing with system complexity by hiding implementation details and highlighting essential aspects of behavior. The main idea of abstraction is to describe real life objects and how they interact in a software system. Abstraction can be implemented using interfaces and abstract classes.

```js title="Listing 3.1 – Example of Promise object in JavaScript"
new Promise((resolve, reject) => {
  // asynchronous code
})
  .then((result) => {
    // handling the result
  })
  .catch((error) => {
    // handling an error
  });
```

An example of abstraction is a JavaScript class Promise (Listing 3.1), which has a well-defined public interface (then, catch, all methods) while the client (the client is not a browser, but the calling program, the component that uses the Promise) works exclusively with meaningful behavior, public interface. It knows that by calling the then method he will receive the data, and by calling the catch method he will handle the error and so on. In this case, it does not matter at all how exactly the Promise object performs its work with asynchronous actions. Thus, all behavior that is insignificant to the client is hidden behind the abstraction. And if the logic of work inside the Promise object itself changes, the client will not change accordingly, because it does not depend on this behavior. The open part means the abstraction, that is, the interface should be the most stable, since a certain number of clients depend on it. Accordingly, the more the number of clients does depend on, the more stable it should be, because when the interface changes, there will be a cascading change in all clients.

The hidden part, that is, the implementation details, is the more unstable part of the abstraction, it can change while maintaining the public interface.

```ts title="Listing 3.2 – Abstraction example – Class CoffeeMachine with public method brewCoffee"
enum CoffeeSelection {
  FILTER_COFFEE,
  ESPRESSO,
  CAPPUCCINO,
}

class CoffeeBean {
  // implementation of CoffeeBeen
}

class Coffee {
  constructor(selection: CoffeeSelection, volume: number) {
    // implementation of Coffee
  }
}

class Configuration {
  constructor(weight: number, volume: number) {
    // implementation of Configuration
  }
}

class CoffeeMachine {
  private configMap: Map<CoffeeSelection, Configuration>;
  private beans: Map<CoffeeSelection, CoffeeBean>;

  constructor(beans: Map<CoffeeSelection, CoffeeBean>) {
    this.beans = beans;
    // create coffee configuration
    this.configMap = new Map<CoffeeSelection, Configuration>();
    this.configMap.set(CoffeeSelection.ESPRESSO, new Configuration(8, 28));
    this.configMap.set(
      CoffeeSelection.FILTER_COFFEE,
      new Configuration(30, 480)
    );
  }

  public brewCoffee(selection: CoffeeSelection): Coffee {
    const coffee = new Coffee(selection, 100);

    console.log("Making coffee...");

    return coffee;
  }
}
```

```ts title="Listing 3.3 – Abstraction example – Using class CoffeeMachine to brew coffee"
const main = () => {
  // create a |Map of available coffee beans
  const beans = new Map<CoffeeSelection, CoffeeBean>();

  beans.set(
    CoffeeSelection.ESPRESSO,
    new CoffeeBean("My favorite espresso bean", 1000)
  );
  beans.set(
    CoffeeSelection.FILTER_COFFEE,
    new CoffeeBean("My favorite filter coffee bean", 1000)
  );

  // get a new CoffeeMachine object
  const machine = new CoffeeMachine(beans);

  // brew a fresh coffee
  const espresso: Coffee = machine.brewCoffee(CoffeeSelection.ESPRESSO);
};
```

Well, you can see that we have a certain abstraction called a `CoffeeMachine`, it is presented on the Listing 3.3. A coffee machine is a kind of abstraction, in which there are some implementation details, that is, not significant behavior: configuration, `configMap`, working with different coffee beans, it knows how to brew espresso, it knows how to brew filtered coffee - all this is not important for the client. The client knows that the coffee machine has one and only public method (interface method) `brewCoffee` and the client depends only on this method. It is important for the client to know that he needs to create an instance of the `CoffeeMachine` class, pass coffee beans there and call the `brewCoffee` method.

The `CoffeeMachine` is an abstraction, and the method `brewCoffee` is a significant behavior that we have highlighted in this abstraction. Everything else, all the settings of the coffee machine, initialization in the constructor of some configuration of everything else - for the client this is not meaningful behavior, it should not depend on it, because it is unstable, it can change. The implementation details are changed systematically, the requirements are changed systematically, the main thing is not to change the public interface on which clients depend.

## 3.2 Encapsulation

If abstraction allows us to highlight the essential behavior of our component, the essential aspects of its behavior, then encapsulation is the tool that helps to hide unimportant implementation details out of sight. In the design field, there are two concepts - encapsulation and data hiding, information hiding. Encapsulation is commonly used in the context of information hiding. Public mutable data violates encapsulation, because in this case any client of the class can change the internal state of the class object without the notification of the class. To achieve encapsulation in the design, two components are distinguished, the two parts of the class that were mentioned earlier are the public part, its public interface, and the private part, not meaningful to the client behavior, implementation details. At the same time, the class interface that has encapsulation should not just take and duplicate the property of this class through accessors (getters and setters), it should provide abstract interface, a higher-level one that is needed by the client. In other words, the public part should expose more about what the class does and hide unnecessary implementation details from clients. Abstraction and encapsulation complement each other and form some more general holistic picture of the object-oriented programming paradigm.

```ts title="Listing 3.4 – Encapsulation is violated"
class Paystub {
  private readonly employees: Employee[];

  public getEmployees(): Employee[] {
    return this.employees;
  }

  public computePayroll(): number {
    // using this.employees for calculation
    return 42;
  }
}

const p1 = new Paystub();
const employees = p1.getEmployees();

employees.push(new Employee());
employees.push(new Employee());

p1.computePayroll();
```

```ts title="Listing 3.5 – Encapsulation is not violated"
class Paystub2 {
  private readonly employees: Employee[];

  public addEmployee(employee: Employee): void {
      this.employees.push(employee);
  }

  public computePayroll(): number {
      // using this.employees for calculation
      return 42;
  }
}

const p2 = new Paystub2();

p2.addEmployee(new Employee());
p2.addEmployee(new Employee());

p2.computePayroll();
```

Here we have two classes. The first class on the Listing 3.4 is `Paystub`, the other class is `Paystub2` (Listing 3.5). In both examples, we have the private data `employees`, which is an array that can contain a certain number of instances of the `Employee` class. In the example on the Listing 3.4, the `getEmployees` method returns `this.employees` array so the client can access and modify the data (add and remove items). In the second example, the designer of our system, in which this class appears, made a certain assumption that the client would be able to add `Employee` to `Paystub2`, in what way - the client should not be interested. It should not depend on implementation details, how exactly `Employees` will be added to the `Paystub2` class, it should only depend on the abstract public interface, that is, on the `addEmployees` method. It should be enough for the client to call the `addEmployees` method with instances of the `Employee` class, it no longer depends on the data structure, an object or a linked list can be used instead of an array. In the second case, the client will not break, everything will work as before, only the implementation of the `addEmployees` method will change. In the first case, everything will break, because the client knows that this is an array, he works with this data as with an array, when we change it to an object, and we cannot push data there, if you will need to add new records there - the client will break. This is bad, because there can be not one, but a thousand such clients, and the half of the system will collapse because this system depends on the internal implementation in which there is pseudo encapsulation.

As mentioned earlier, class members do not just have to be duplicated through setters and getters, and `getEmployees` is, in fact, a regular getter. And the abstraction should provide some high-level interface for working with itself.

Another example to show that hiding data is not just about creating private class members and working with them. Suppose we have a server. You are writing an application from scratch. Server is written on NodeJS and some configuration data is required on the backend. Suppose these are passwords for connecting to a database or some sort of sensitive information. All this data is stored in the `config.json` file located somewhere on your server, in some directory. And then we have 2 options:
- You can spread the logic of working with the configuration throughout the application in such a way that any component that needs a part of the configuration will just read this `config.json` file, parse it, and so on.
- The client is agnostic to the location and the configuration format. And access is provided through the `ConfigurationProvider` class or module, which encapsulated the logic for working with configuration, it would be able to parse it and return data. And `ConfigurationProvider` will be provided through dependency injection to the components where it is needed.

The second case is also an encapsulation, in which we hide the entire management of the configuration, and if something changes (for example, the data storage format changes from json to xml), it would not be necessary to rewrite all components that depend on the configuration. Clients of `ConfigurationProvider` interface will continue to work.

Abstraction and encapsulation also play a key role in fighting complexity, providing the ability to design at a higher level, abstracting from implementation details.

## 3.3 Inheritance

Inheritance is the mechanism of basing an object or class upon another object (prototypical inheritance) or class (class-based inheritance), retaining similar implementation. In most class-based object-oriented languages, an object created through inheritance (a "child object") acquires all the properties and behaviors of the parent object.

Here, I hope things should be much easier because you are most familiar with this concept. Inheritance mechanisms also play a key role in the object-oriented approach, in terms of extensibility, reusability of components in the system. This is an "is" or "is a" relationship, a relationship between a base class and descendants. This relationship is the strongest and in statically typed languages it cannot be broken, and this must be considered when assessing the need to use inheritance in this case. If inheritance were applied in a place where one could do without it, as a result, with poor support, this all make difficult to understand and maintain code, because the inheritance hierarchy can be 10 classes or more, and it is rather difficult to understand somewhere in the middle or how the last class will behave, it is hard to understand in what places which methods are being overwritten or overridden, and so on. Therefore, inheritance must be approached wisely.

```ts title="Listing 3.6 – Inheritance example"
class Person {
  protected name: string;

  constructor(name: string) {
      this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getDetails() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

const howard = new Employee("Howard", "Sales");

console.log(howard.getDetails()); // ok
console.log(howard.name); // error
console.log(howard.department) // error
```

On the Listing 3.6 you can see an example of inheritance. We have a `Person` class and an `Employee` class. Employee inherits some methods and some properties from `Person`. There are 3 types of access modifiers:
- **Private** – not accessible from the outside, only instances of this current class can work with these properties. The `Employee` class has a `department` property, and only objects of the `Employee` class can work with this property.
- **Protected** – is a little wider than private, only instances of the current class and classes of descendants can work with them. From `Employee`, we can refer to `name` from `Person`. Moreover, they are also closed to the outside world.
- **Public** - public properties and methods are those that are provided to clients in the form of a public interface, on which they will depend, which should be the most stable and the most unchangeable.

## 3.4 Polymorphism

Polymorphism is the provision of a single interface to entities of different types or the use of a single symbol to represent multiple different types.

In general, the word polymorphism consists of two parts: poly – many, morphs - forms, that is, many forms. The word polymorphism is used not only in programming, but also in other areas, and it describes situations where something can exist in several forms. In programming, polymorphism describes such a concept when objects of different types are sharing the same interface. Each type can provide its own implementation of this interface.

If we discuss the concept of polymorphism in its classical representation, that is, in statically typed languages, in Java or Typescript, there are two types of polymorphism - static polymorphism and dynamic polymorphism:
- Static polymorphism: allows you to implement multiple methods within the same class that use the same name but a different set of parameters. That is called method overloading. (Listing 3.7)
- Dynamic polymorphism: does not allow the compiler to determine the executed method. Within an inheritance hierarchy, a subclass can override a method of its superclass. That enables the developer of the subclass to customize or completely replace the behavior of that method. (Listing 3.8)

Listing 3.7 is an example of static polymorphism in TypeScript. There is a certain `HeroService` from the Angular documentation, and it has a `getHero` method that behaves differently depending on the parameters that are passed to it.

Method overloading differs from one language to another because TypeScript makes it impossible to write different implementations for the same method. But it allows writing different signatures so that you can declare a method with different arguments and with different types of values obtained, while still using the same implementation.

```ts title="Listing 3.7 – Static polymorphism example"
interface Hero {
  name: string;
  skill: string;
  weakness: string;
}

class HeroService {
  protected heroes: Hero[] = [
    { name: "Superman", skill: "fly", weakness: "cryptonit" },
    { name: "Spiderman", skill: "spider-sense", weakness: "MJ" },
    { name: "Batman", skill: "superhuman power", weakness: "law" },
    { name: "Flash", skill: "run", weakness: "unknown" },
  ];

  public getHero(name: string);
  public getHero(name: string, skill: string);

  public getHero(name: string, skill?: string): Hero {
    if (!skill) {
      return this.heroes.find((hero) => hero.name === name);
    }

    return this.heroes.find(
      (hero) => hero.name === name && hero.skill === skill
    );
  }
}

const heroService = new HeroService();
const hero1 = heroService.getHero("Flash");
const hero2 = heroService.getHero("Superman", "fly");
```

Dynamic polymorphism. Everything is simple here; this is a usual method overriding in the inherited classes. Dynamic, because at the compilation stage no binding is carried out and the actual implementation of the method can be defined only in Runtime, we do not know which of the class instances will be called. On the Listing 3.8 you can see that in `AntiheroService` method `getHero` is overridden to accept `weakness` instead of `name` or `skill`.

```ts title="Listing 3.8 – Dynamic polymorphism example"
class HeroService {
  // implementation of HeroService
}

class AntiHeroService extends HeroService {
  public getHero(weakness: string): Hero {
    return this.heroes.find((hero) => hero.weakness === weakness);
  }
}

const antiHeroService = new AntiHeroService();
const hero = antiHeroService.getHero("law");
```
