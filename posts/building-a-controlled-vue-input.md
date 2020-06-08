---
title: Building a controlled Vue input component
date: 2019/08/12
slug: building-a-controlled-vue-input
excerpt: Why do we need these reusable controller components and how to build them?
keywords: vue, vue.js, controlled component, vue component, advanced vue component design, advanced vue, vue model, vue v-model
image: /images/vue-controller-component.jpg
category: Vue.js
tags: vue components, advanced vue, vue
---

First lets explain what a **controlled component** is. Controlled component is a component which takes its **current value** from **props**, and **notifies the parent of the changes to that value using an event.** Which means that usually, controlled components are form fields.

We all know that in every modern application there is a form that needs to be filled. Every form has fields, which is why we want to build **reusable input components** that we can use in all of our forms.

Imagine we have a big Vue component that is used for user registration. We would at least need 4 input fields there, _Name_, _Email_, _password_ and _password confirmation_. We can bind each of the inputs to some data in the Vue component using the **v-model** directive. Basically, the component would look something like this:

```
<template>
  /* ... */
  <input type="text" v-model="name" ...>
  <input type="email" v-model="email" ...>
  /* ... */
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        ...
    };
  }
</script>
```

But usually, our form fields don't look like this. They have some wrapper, they have labels, they have some classes etc etc. So, lets see how would a typical form field would look like (in real app, for example using bootstrap):

```html
<div class="col-md-6">
  <div class="form-group">
    <input type="text" class="form-control" ... >
    <label for="name">Name <sub*</sub></label>
  </div>
</div>
```

Looking at this form field, one thing is for sure - we don't want to write this code every time we want to write a text input field, so we use the most important concept from Vue - **building reusable components.**

Now, if we want to wrap our heads around this issue, we can see that if we wrap this input field in a component, we want it to be **controlled component** - receiving value and emitting changes to the parent component. So, lets do that. We create a new **SFC (single file component)** and start implementing our desired functionality. This is how it would look like. Please note that all of our state lives in the parent component. _(Note: You cannot bind v-model to a prop, because Vue will let you know that you cannot change immutable objects. Instead, you should bind the value to the prop itself, and emit changes to the parent.)_

```
// TextInput.vue

<template>
  <div class="col-md-6">
    <div class="form-group">
      <input :value="value" @input="handleChange" ... >
      <label for="name">Name <sub*</sub></label>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        required: true,
        type: String,
      }
    },
    methods: {
      handleChange(e) {
        this.$emit('handleChange', e.target.value);
      }
    }
  }
</script>
```

What we did in this component is that we always emit the changed value to the parent, then the parent caches that changed event and updates its state, which then triggers the value on our controlled component to change since we pass it as a prop. This is tricky to understand, but let me show you how the parent component could look like, so you can better understand this concept.

```html
// Form.vue

<template>
  /* ... */
  <text-input :value="value" @handleChange="handleChange($event)">
  /* ... */
</template>

<script>
  export default {
    data() {
      return {
        value: '',
      }
    },
    methods: {
      handleChange(payload) {
        this.value = payload;
      }
    }
  }
</script>
```

Lets break down what we do here. We send the changed value from the child component `this.$emit('handleChange', e.target.value);` and then in the parent we **catch the fired event** using `@handleChange="handleChange($event)"` and **assign the payload** we send (Vue passes the payload we send from the child component in the `$event` variable) to the value we want to update in our parent component's state. _(Note: payload can also be objects, arrays ..)_.

And, thats it. Now we have a fully functional controlled component that we can reuse.

### But what if i told you we can simplify this even further?

Vue's **v-model** directive is basically a combination of `:value="value"` and `@input="value = $event.target.value"`. So, what we can do in our controlled component is implement those exact attributes/events and we can then use v-model in our parent component. Let me show you what i mean.

```html
// TextInput.vue
<input type="text" :value="value" @input="$emit('input', $event.target.value)" ... />

// Form.vue
<text-input v-model="value"></text-input>
```

Using this approach what we basically did is mimic the v-model's implementation for our custom component and simplified our controlled component even more. Seems pretty neat right? Its basically as we would have a normal input field but we have a reusable component with classes, labels ...

This concept can be used also for custom check boxes and custom select form fields. Actually its best use is for custom form fields like these.

What do you think about this approach? If you have any questions, send me a DM on twitter @bangjelkoski or send me an email using the contact form on the homepage!

**Enjoy using controlled components.**
