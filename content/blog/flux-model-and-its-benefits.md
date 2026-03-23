---
title: Flux model and its benefits
date: 2019/09/15
slug: flux-model-and-its-benefits
excerpt: Flux is a relatively new design pattern by Facebook for structuring client-side applications that empower the unidirectional flow of data within different components of the application.
keywords: flux, unidirectional data flow, data flow, bidirectional data flow, mvc, design pattern, vuex, vue, redux, react
image: /images/flux.png
category: Design Patterns
tags: vuex, vue, flux, design patterns
readingTime: "☕️ 5 min read"
---

To understand why Flux matters, it helps to go back to the traditional MVC (Model View Controller) design pattern. In general, the MVC design pattern has three parts:

1. Model - responsible for managing the behavior and the data of the application,
2. View - responsible for representing the data to the end-user,
3. Controller - responsible for manipulating models based on the user’s input and updating the data on the UI (UI - User Interface).

Each of the three parts is separated, which provides code separation that makes code easier to maintain. The data flow in this pattern is pretty straightforward. In the past, the backend and the frontend of the application weren't separated, which made this approach very effective. Basically, the Model and the View didn't need to know anything about each other, since the communication between them went through the Controller. However, as we keep moving forward with the development of more and more complicated UI’s, separation of the client-side and the server-side is something that is considered a good practice. In large codebases, changes in the data can happen from multiple sources, and reflecting those changes in the view can get complicated — which is why developers started looking for alternatives.

Reacting to changes in the data across different parts of the application requires unidirectional data flow. Flux is all about controlling the data flow inside the application itself. With Flux, sharing data between different application components is relatively easy and simple to understand.

The Flux design pattern consists of four parts (four different actions that need to be taken in order to achieve needed unidirectional data flow):

1. Actions - Objects (methods) that have a type and data that is eventually passed to the dispatcher,
2. Stores - Containers for application state and logic for a particular domain within the application. They are different from the Models in MVC since the Model in the MVC pattern is usually responsible for only one entity (object), while stores can store basically everything,
3. The Dispatcher - Registry for all callbacks to all stores in the application. It acts as a central hub and processes actions that eventually change the stores. It's different from the Controller in the MVC pattern since it doesn't have a lot of logic, and can be reused within different parts of our application.
4. Views - Same as the views in the MVC pattern with one key difference - they also act like controllers (View-Controllers) and they listen for changes in the stores and re-render themselves accordingly. Within the views, users can invoke actions to the dispatcher.

**To summarize, the main benefits are:**

- The flow of the app - There are strict rules that are enforced by the dispatcher that help conserve the unidirectional flow of data within the application.
- Unidirectional flow of data - Every change of the data goes through the dispatcher. Changing a particular store must be done within an action. A store cannot access another store directly.
- Stores - Stores don't need to model a particular object. Storing any data in the stores is possible and common.

---

## Vuex

_Vuex is a state management pattern + library for Vue.js applications._

Vuex is a centralized store for all parts (components) in an application, that provides unidirectional flow of data between different parts of the application and sets rules which ensure that the data can be mutated only in a predictable way (ensuring the “one-way data flow”). Using Vuex is recommended when we build large scale SPA (SPA - Single Page Application). Even though in Vue, each component can have its own state, sharing data between components can be extremely challenging in large scale applications, which is why for better developer experience and separation of logic it's useful to implement Vuex. With Vuex we are ensuring that updating the state is unidirectional, sharing of the data between components is consistent and precise, which reflects to showing proper data in the views.

Since it's based on the Flux design pattern, Vuex has four parts:

1. Actions - Responsible for helping with updating the state,
2. State - The data that is shared within our application,
3. Getters - Responsible for accessing filtered, derived or computed state,
4. Mutations - Responsible for updating the state,

Actions call mutations to update the data — that's the reason they're described as "helping" with updates. They can also contain arbitrary asynchronous operations.
