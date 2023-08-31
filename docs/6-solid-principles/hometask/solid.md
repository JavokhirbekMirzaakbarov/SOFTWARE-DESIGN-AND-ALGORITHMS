# Application examples

## Single Responsibility Principle (SRP)

'@ionic/angular/src/navigation/nav-controller.ts'

The Single Responsibility Principle states that a class should have only one reason to change. In the Ionic Framework's source code, many classes follow this principle by having a single responsibility or purpose. The NavController class in the @ionic/angular package is responsible for managing navigation within an Ionic application. This class has a clear and specific responsibility, and does not try to handle other unrelated tasks. Similarly, the Platform class is responsible for detecting the platform on which the application is running and exposing platform-specific information and APIs.

## Open/Closed Principle (OCP)

'@ionic/angular/src/ionic-module.ts'

The Open/Closed Principle states that a class should be open for extension but closed for modification. This means that a class should allow new functionality to be added without modifying its existing code. The IonicModule class in the @ionic/angular package provides a range of configuration options that allow developers to customize various aspects of the framework's behavior, such as the default animation settings or the use of specific fonts.

## Liskov Substitution Principle (LSP)

'@angular/core/src/render3/component_ref.ts'

The Liskov Substitution Principle states that objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program. This means that subclasses should be able to replace their parent classes without causing any unexpected behavior. The ComponentRef class in the @angular/core package is used throughout the framework to represent a component instance, and provides a consistent interface that can be used by other parts of the framework to interact with components.

## Interface Segregation Principle (ISP)

'@angular/router/src/interfaces.ts'

The Interface Segregation Principle states that clients should not be forced to depend on interfaces they do not use. This means that interfaces should be designed to be as small and specific as possible. The CanLoad interface in the @angular/router package is used to represent a class that can load a route lazily, and provides a single method that must be implemented. This allows clients to depend only on the specific functionality they need, rather than on a larger, more complex interface.

## Dependency Inversion Principle (DIP)

'@ionic/angular/src/platform/platform.ts'

The Dependency Inversion Principle states that high-level modules should not depend on low-level modules, but both should depend on abstractions. This means that classes should depend on abstractions rather than concrete implementations. The Platform class in the @ionic/angular package depends on an abstraction called PlatformConfig, which represents the configuration for the platform on which the application is running. This allows the Platform class to be easily tested and swapped out with other implementations if necessary.

# Violation examples

## Single Responsibility Principle (SRP) violation:

@ionic/angular/src/components/tabs/tabs.ts - This file contains the Tabs component, which is responsible for managing a set of tab buttons and their associated content. However, the component also includes logic for handling the transition between tabs, which could be considered a separate responsibility.

## Open/Closed Principle (OCP) violation:

@ionic/angular/src/components/alert/alert.ts - This file contains the Alert component, which provides a modal dialog for displaying messages to the user. The component provides a range of customization options, but these are implemented using a large number of conditional statements, which can make the code difficult to maintain and extend.

## Liskov Substitution Principle (LSP) violation:

@ionic/angular/src/directives/virtual-scroll.ts - This file contains the VirtualScroll directive, which provides virtual scrolling functionality for long lists. The directive extends the IonVirtualScroll class, which is itself a subclass of IonScroll, but the VirtualScroll directive modifies the behavior of some of the methods defined in its parent classes, which can lead to unexpected behavior in some cases.

## Interface Segregation Principle (ISP) violation:

@ionic/angular/src/directives/virtual-scroll.ts - This file also contains an example of a violation of the ISP. The VirtualScroll directive defines several methods that are not relevant to all of its clients, but are required to be implemented by any component that uses the directive. This can lead to unnecessary complexity and tight coupling between the directive and its clients.

## Dependency Inversion Principle (DIP) violation:

@ionic/angular/src/providers/modal-controller.ts - This file contains the ModalController class, which is responsible for managing modal dialogs in an Ionic application. The class has a direct dependency on the OverlayController class, which is an implementation detail of the Ionic framework, and this can make it difficult to use the ModalController class outside of an Ionic context.
