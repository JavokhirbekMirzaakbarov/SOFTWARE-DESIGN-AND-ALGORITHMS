---
sidebar_position: 6
---

# Conclusion

In _MVC_, the View sits on top of our architecture with the controller beside it. Models sit below the controller, so our Views know about our controllers and controllers know about Models. Here, our Views have direct access to Models. Exposing the complete Model to the View, however, may have security and performance costs, depending on the complexity of our application. MVVM attempts to avoid these issues.

In _MVP_, the role of the controller is replaced with a Presenter. Presenters sit at the same level as views, listening to events from both the View and model, and mediating the actions between them. Unlike MVVM, there is not a mechanism for binding Views to ViewModels, so we instead rely on each View implementing an interface allowing the Presenter to interact with the View.

_MVVM_ consequently allows us to create View-specific subsets of a Model, which can contain state and logic information, avoiding the need to expose the entire Model to a View. Unlike MVP’s Presenter, a ViewModel is not required to reference a View. The View can bind to properties on the ViewModel, which in turn expose data contained in Models to the View. As we have mentioned, the abstraction of the View means there is less logic required in the code behind it.
