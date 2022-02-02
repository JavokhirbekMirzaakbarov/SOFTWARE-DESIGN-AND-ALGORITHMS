---
sidebar_position: 4
---

# 3. Structural Design Patterns

Structural patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient. To achieve that, both inheritance and composition can be applied.

## 3.1 Façade

Facade is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes.

### 3.1.1 Façade structure

A facade is a class that provides a simple interface to a complex subsystem which contains lots of moving parts. A facade might provide limited functionality in comparison to working with the subsystem directly. However, it includes only those features that clients really care about.

For instance, an app that uploads short funny videos with cats to social media could potentially use a professional video conversion library. However, all that it really needs is a class with the single method encode(filename, format). After creating such a class and connecting it with the video conversion library, you will have your first facade.

When you call a shop to place a phone order, an operator is your facade to all services and departments of the shop. The operator provides you a simple voice interface to the ordering system, payment gateways, and various delivery services.

Figure 3.1 - Façade

<img
  width="700"
  src={require('./img/facade.jpg').default}
  alt="Façade"
/>

1. The Facade provides convenient access to a particular part of the subsystem's functionality. It knows where to direct the client's request and how to operate all the moving parts.
2. An Additional Facade class can be created to prevent polluting a single facade with unrelated features that might make it yet another complex structure. Additional facades can be used by both clients and other facades.
3. The Complex Subsystem consists of dozens of various objects. To make them all do something meaningful, you have to dive deep into the subsystem's implementation details, such as initializing objects in the correct order and supplying them with data in the proper format. Subsystem classes aren't aware of the facade's existence. They operate within the system and work with each other directly.
4. The Client uses the facade instead of calling the subsystem objects directly.

### 3.1.2 Façade example

Here we have a `Computer` class with lots of unclear methods.

```ts title="Listing 3.1"
class Computer {
  public getElectricShock() { return 'Ouch!'; }
  public makeSound() { return 'Beep beep!'; }
  public showLoadingScreen() { return 'Loading..'; }
  public bam() { return 'Ready to be used!'; }
  public closeEverything() { return 'Zzzzzz bup'; }
  public sooth() { return 'shhshh'; }
}
```

And a façade with 2 straightforward methods `turnOn` and `turnOff`.

```ts title="Listing 3.2"
class ComputerFacade {
  constructor(protected computer: Computer) {
  }

  public turnOn() {
    this.computer.getElectricShock();
    this.computer.makeSound();
    this.computer.showLoadingScreen();
    this.computer.bam();
  }

  public turnOff() {
    this.computer.closeEverything();
    this.computer.sooth();
  }
}

const computer = new ComputerFacade(new Computer());

computer.turnOn();
computer.turnOff();
```

### 3.1.3 When to apply, pros and cons

- when need a limited but straightforward interface to a complex subsystem
- to structure a subsystem into layers: create facades to define entry points to each level of a subsystem. You can reduce coupling between multiple subsystems by requiring them to communicate only through facades

Pros
- you can isolate your code from the complexity of a subsystem

Cons
- a facade can become a god object coupled to all classes of an app

## 3.2 Decorator

Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.

### 3.2.1 Decorator structure

Imagine you are developing a coffee brewing system. Initially only black coffee brewing is required. Then single black coffee option become not enough. Now you need to implement white coffee and black with cream. Therefore, you reasonably made a `Coffee` abstract class and implemented it in black, white and black with cream classes. Soon you got request for a white coffee with cream and for coffees with different amount of sugar. Thus, you came to the point, that inheritance is not the case.

Extending a class is the first thing that comes to mind when you need to alter an object's behavior. However, inheritance has several serious caveats that you need to be aware of: it is static, and it does not let a class inherit behaviors of multiple classes at the same time.

So, apparently, we need a composition here.

"Wrapper" is the alternative nickname for the Decorator pattern that clearly expresses the main idea of the pattern. A _wrapper_ is an object that can be linked with some target object. The wrapper contains the same set of methods as the target and delegates to it all requests it receives. However, the wrapper may alter the result by doing something either before or after it passes the request to the target.

When does a simple wrapper become the real decorator? As I mentioned, the wrapper implements the same interface as the wrapped object. That's why from the client's perspective these objects are identical. Make the wrapper's reference field accept any object that follows that interface. This will allow you to cover an object in multiple wrappers, adding the combined behavior of all the wrappers to it.

Figure 3.2 - Decorator

<img
  width="700"
  src={require('./img/decorator.jpg').default}
  alt="Decorator"
/>

1. The `Component` declares the common interface for both wrappers and wrapped objects.
2. `Concrete Component` is a class of objects being wrapped. It defines the basic behaviour, which can be altered by decorators.
3. The `Base Decorator` class has a field for referencing a wrapped object. The field's type should be declared as the component interface, so it can contain both concrete components and decorators. The base decorator delegates all operations to the wrapped object.
4. `Concrete Decorators` define extra behaviours that can be added to components dynamically. Concrete decorators override methods of the base decorator and execute their behaviour either before or after calling the parent method.
5. The `Client` can wrap components in multiple layers of decorators, as long as it works with all objects via the component interface.

### 3.2.2 Decorator example

```ts title="Listing 3.3"
interface Coffee {
    getCost();
    getDescription();
}

class SimpleCoffee implements Coffee {
    public getCost() { return 10; }
    public getDescription() { return 'Simple coffee' }
}

class CoffeeDecorator implements Coffee {
  protected wrappee: Coffee;

  constructor(coffee: Coffee) {
    this.wrappee = coffee;
  }

  public getCost() { return this.wrappee.getCost(); }
  public getDescription() { return this.wrappee.getDescription(); }
}
```

The decorators and the data source class implement the same interface, which makes them all interchangeable in the client code.

```ts title="Listing 3.4"
class MilkCoffeeDecorator extends CoffeeDecorator {
  public getCost(): number {
    return this.wrappee.getCost() + 2;
  }

  public getDescription(): string {
    return this.wrappee.getDescription() + 'with milk';
  }
}

class WhipCoffeeDecorator extends CoffeeDecorator {
  public getCost(): number {
    return this.wrappee.getCost() + 3;
  }

  public getDescription(): string {
    return this.wrappee.getDescription() + 'and with whip';
  }
}

let someCoffee = new SimpleCoffee();

someCoffee.getCost(); // 10
someCoffee.getDescription(); // Simple Coffee
someCoffee = new MilkCoffeeDecorator(someCoffee);
someCoffee.getCost(); // 12
someCoffee = new WhipCoffeeDecorator(someCoffee);
someCoffee.getDescription(); // Simple Coffee with milk and whip
```

### 3.2.3 When to apply, pros and cons

- when you need to be able to assign extra behaviours to objects at runtime without breaking the code that uses these objects – The Decorator lets you structure your business logic into layers, create a decorator for each layer and compose objects with various combinations of this logic at runtime. The client code can treat all these objects in the same way, since they all follow a common interface
- when it's awkward or not possible to extend an object's behaviour using inheritance. For example, you are working with a library, and you don't have access to alter its behavior, but what you can do is extending it with Decorator

Pros
- extending an object's behavior without making a new subclass
- adding or remove responsibilities from an object at runtime
- combining several behaviors by wrapping an object into multiple decorators
- dividing a monolithic class that implements many possible variants of behavior into several smaller classes

Cons
- hard to remove a specific wrapper from the wrappers stack
- hard to implement a decorator in such a way that its behavior doesn't depend on the order in the decorators stack
- initial configuration code of layers might look overcomplicated


## 3.3 Proxy

Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.

In other words by using proxy, one class provides functionality of another class.
Unlike Decorator, a Proxy usually manages the life cycle of its service object on its own.

### 3.3.1 Proxy structure

Figure 3.3 - Proxy

<img
  width="700"
  src={require('./img/proxy.jpg').default}
  alt="Proxy"
/>

1. The `ServiceInterface` declares the interface of the `Service`. The proxy must follow this interface to be able to disguise itself as a service object.
2. The `Service` is a class that provides some useful business logic.
3. The `Proxy` class has a reference field that points to a service object. After the proxy finishes its processing (e.g., lazy initialization, logging, access control, caching, etc.), it passes the request to the service object.
4. Usually, proxies manage the full lifecycle of their service objects.
5. The `Client` should work with both services and proxies via the same interface. This way you can pass a proxy into any code that expects a service object.

### 3.3.2 Proxy example

```ts title="Listing 3.5"
// Presume we have an input filed with an ID of inputname:
const el = `<input type="text" id="inputname" value="" />`;

// We also have a JS object named myUser with
// an id property which references this input
const myUser = {
  id: 'inputname',
  name: ''
};

// Our first objective is to update myUser.name
// when a user changes the input value. This can be achieved
// with an onchange event handler on the field:
(function inputChange(myObject) {
  if (!myObject || !myObject.id) return;

  const input = document.getElementById(myObject.id);

  input.addEventListener('onchange', function (e) {
    myObject.name = input.value;
  });
})(myUser);
```

There is a JavaScript native class `Proxy`, which allows catching get/set calls of objects and perform additional actions. Here we use this feature to create a primitive but operating bi-directional data-binding.

```ts title="Listing 3.6"
// create proxy
const myUserProxy = new Proxy(myUser, {
  set: function(target, prop, newValue) {
    if (prop === 'name' && target.id) {
      // update object property
      target[prop] = newValue;

      // update input field value
      document.getElementById(target.id).value = newValue;

      return true;
    }

    return false;
  }
});

// set a new name
myUserProxy.name = 'Craig';

console.log(myUserProxy.name); // Craig
console.log(document.getElementById('inputname').value);
```

### 3.3.3 When to apply, pros and cons

- lazy initialization (virtual proxy) of a heavyweight service object that wastes system resources by being always up, but is needed from time to time. Instead of creating the object when the app launches, you can delay the object's initialization to a time when it's really needed
- access control (protection proxy) – for letting only specific clients to be able to use the service object; for instance, when your objects are crucial parts of an operating system and clients are various launched applications (including malicious ones). The proxy can pass the request to the service object only if the client's credentials match some criteria
- local execution of a remote service (remote proxy). This is when the service object is located on a remote server. In this case, the proxy passes the client request over the network, handling all the nasty details of working with the network
- logging requests (logging proxy). This is when you want to keep a history of requests to the service object. The proxy can log each request before passing it to the service
- caching request results (caching proxy). This is when you need to cache results of client requests and manage the life cycle of this cache, especially if results are quite large. The proxy can implement caching for recurring requests that always yield the same results. The proxy may use the parameters of requests as the cache keys

Pros
- controlling the service object without clients knowing about it
- managing the lifecycle of the service object when clients don't care about it
- the proxy works even if the service object isn't ready or is not available
- introducing new proxies without changing the service or clients

Cons
- overcomplicated code since you need to introduce a lot of new classes
- the response from the service might get delayed
