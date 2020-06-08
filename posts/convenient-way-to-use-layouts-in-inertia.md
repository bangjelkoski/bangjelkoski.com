---
title: Convenient way to use layouts in Inertia
date: 2020/04/21
slug: convenient-way-to-use-layouts-in-inertia
excerpt: And common errors you might stumble upon while trying different methods
keywords: vue, vue.js, inertia, layout, laravel inertia, inertia layout, monolith laravel
image: /images/laravel-inertia.jpg
category: Inertia
tags: inertia, laravel
---

Its been a while since I wrote a blog post, but during these days we are left with a lot of free time while staying in the comfort of our homes so I decided to write some stuff up.

If you are a Laravel developer, you have probably heard of [Inertia.js](https://inertiajs.com/), the modern monolith. With Inertia, you can *quickly build modern single-page React, Vue and Svelte apps using classic server-side routing and controllers.* This makes Inertia a perfect choice for building some web apps.

Inertia gained a lot of traction in the past few months, so I have decided to give it a shot and build something with it. Installing and configuring it was easy, the documentation is awesome and I had no difficulties setting up my project. It took me a little bit of time to adapt to the mental model of how Inertia works, but after wrapping my head around it I started building the app.

### Building my first page and the need for a layout {class=marginless}

Every app you have built has a layout that you wrap around your pages. Usually, the Layout has the `Header` the `Footer` and a `slot` (or `router-view`) tag where you insert the content based on the route you are in. In the documentation, there is a straightforward example of a page, which you can also see attached in the code below.

```js
  <template>
    <layout title="Welcome">
      <h1>Welcome</h1>
      <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
    </layout>
  </template>

  <script>
    import Layout from './Layout'

    export default {
      components: {
        Layout,
      },
      props: {
        user: Object,
      },
    }
  </script>
```

As you can see from the example, you need to wrap every page with the Layout, insert that layout in the `script` tag and add it to the `components` key. This gives you the flexibility that you might need if you are using different layouts, but what if we could find a **better**, **more convenient** way to make this happen?

### The first (and flawed) approach I went for {class=marginless}

To use Inertia in your Vue app, you just have to copy and paste their code snippet from the documentation and you are good to go.

```js
import { InertiaApp } from '@inertiajs/inertia-vue'
import Vue from 'vue'

Vue.use(InertiaApp)

const app = document.getElementById('app')

new Vue({
  render: h => h(InertiaApp, {
    props: {
      initialPage: JSON.parse(app.dataset.page),
      resolveComponent: name => require(`./Pages/${name}`).default,
    },
  }),
}).$mount(app)
```

Lets dive deep into this code so we can try to understand what is happening, so you can understand why I thought of this solution first.

First, we include the `InertiaApp` and inject it in our `Vue` instance. Then, we get the `selector` we want to `$mount` our Vue app in, and instantiate our `Vue` instance. The object we pass to the constructor has only one property, and its the `render` property, which as it states, renders our the app. It has one argument, `h` which is the `render function` we call to render our `InertiaApp` component.

If you never used the `render` function in your Vue apps, it can take three arguments, first one is a `Vue instance` (Vue Component), the second one is the `data` passed to that component, and the third one is an `array` of children included in the component.

As you can see in the code above, we are rendering the `InertiaApp` `render: h => h(InertiaApp, ...)` we pass some `data` as the second argument, and there are no children rendered for this component.

My initial approach was, what if we wrap the whole `InertiaApp` in the `Layout` we are going to use. The end code snippet looked like this

```js
import App from './layout/App';

new Vue({
  render: (h) =>
    h(App, {}, [
      InertiaApp,
      {
        props: {
          initialPage: JSON.parse(app.dataset.page),
          resolveComponent: (name) => require(`./Pages/${name}`).default
        }
      }
    ])
}).$mount(app)
```

Now, we don't have to include our Layout in every component. But, this approach is flawed and I am going to explain why.

The **first flaw** of this approach is because this approach is not flexible. Meaning that you will be stuck with the same layout on every Inertia page you build. This flaw can limit you in many ways.

The **second, and deeper flaw** that I have found with this approach is that you cannot access the `$page` property within your layout. The `$page` property, contains **shared data** you pass from your backend to your frontend. For example, if you want to show a simple *Welcome {username}* message in your Header (which is in the Layout), you need to share the authenticated user from the backend to the frontend. But, if you try to access your `$page.user` property within your Layout you will get an error saying that *can not get property `user` of undefined.* At first, this error didn't make any sense. I can use the `$page.user` property in my `pages`, but I cannot use it in my Layout. After debugging for some time and looking at the Inertia's source code, I have found out that internally Inertia injects the `$page` property `Object.defineProperty(Vue.prototype, '$page', { get: () => app.props })` in our Vue instance, which is a `getter` that returns the `props` of the `app`, and if you go back to the previous code snippet, we pass the shared data from our backend in our `InertiaApp` component as a prop

```js
props: {
    initialPage: JSON.parse(app.dataset.page),
    resolveComponent: (name) => require(`./Pages/${name}`).default
}
```

which are then parsed and injected in the Vue instance. To simplify the flaw, the Layout did not had access to the shared data passed from our server.

### Solving the flaws with a convenient solution {class=marginless}

Lets get back to our snippet above. We resolve the current page with this code

```js
resolveComponent: (name) => require(`./Pages/${name}`).default
```

As you can see, we require the page (as a module), and return the default export from that module. Within that default export we can find all of the current page's data, including the layout. So, what if we modify the module, include the default layout and then return the modified module? Now, we don't have to wrap all of our pages with the layout. The code now looks like this

```js
import App from './layout/App'

//

resolveComponent: (name) => {
  const module = require(`./Pages/${name}`);

  module.default.layout = App;

  return module.default;
}
```

Now, we have set a default Layout for all of our Inertia pages. But, we still have not solved any of the flaws we mentioned previously. Lets do that.

To solve the first flaw, we can modify the code snipped above in a way that allows us to add the default Layout only if there is no layout already defined.

```js
resolveComponent: (name) => {
  const module = require(`./Pages/${name}`);

  if(!module.default.layout) {
  // there is no Layout defined, set the default layout
    module.default.layout = App;
  }

  return module.default;
}
```

We now achieved flexibility and solved the first flaw.

As for the second flaw, if we have a look at the source code for the `inertia-vue/src/app.js` you can see that we have the following peace of code in the `render` function

```js
if (this.component.layout) {
  if (typeof this.component.layout === 'function') {
    return this.component.layout(h, child)
  }

  return h(this.component.layout, [child])
}
```

This code ensures that the all of the props are transformed and injected in our app before we render the layout, so now we can access our `$page` property in the Layout as well.

At the end, we have ended up with the following code snippet.

```js
import { InertiaApp } from '@inertiajs/inertia-vue'
import Vue from 'vue'
import App from './Layouts/App';

Vue.use(InertiaApp)

const app = document.getElementById('app')

new Vue({
  render: h => h(InertiaApp, {
    props: {
      initialPage: JSON.parse(app.dataset.page),
      resolveComponent: (name) => {
        const module = require(`./Pages/${name}`);

        if(!module.default.layout) {
          module.default.layout = App
        }

        return module.default;
      }
    },
  }),
}).$mount(app)
```

---

I didn't want to give you the solution right from the start because there was a lesson to be learned from the first approach I took, so maybe in the future you can have a *gotcha* moment if you ever stumble across an issue like this.

And remember, stay safe, stay healthy and stay home. We can only defeat this pandemic together.