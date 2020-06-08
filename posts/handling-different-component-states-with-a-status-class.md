---
title: Abstracting functionality to classes (Part 1) - Handling different component states
date: 2020/05/09
slug: handling-different-component-states-with-a-status-class
excerpt: And why you should avoid using booleans to handle components state.
keywords: vue, vue.js, react, status, state, component state, state booleans, is loading, loading, loading boolean
image: /images/is-loading.png
category: JavaScript
tags: vue components, advanced vue, vue, javascript
---
Web apps often require a loading state (things like loading spinners) to let a user know that an operation is taking place. These operations often take time, so it's best to let the user know something is loading, which helps improve UX, prevent form resubmissions and etc.

Except `loading` states, our components can have different states as well like `completed`, `rejected`, `idle`, etc. There are different ways of handling these states, so let's go through them. In the end, I am going to show you my way of handling these states by using a simple `Status` class that is very convenient to use.

### Handling component state using booleans{class=marginless}

The most common example is a button that is disabled and maybe even has a loading spinner when we submit a form.

```
// button-wrap.vue
<template>
  <button v-bind="$attrs" v-on="$listeners" :disabled="isLoading">
    <span v-if="isLoading">Loading ...</span>
    <slot v-else></slot>
  </button>
</template>

<script>
  export default {
    props: {
      isLoading: {
        required: false,
        default: false,
        type: Boolean,
      }
    }
  }
</script>
```

This is a simple `button-wrap` component that we can use within our forms and pass a `isLoading` boolean prop whether the button should be disabled (the form is being submitted) and show a loading spinner instead of the button label. In most cases, this is probably the easiest way to handle the loading state. But, what if we need other states like `rejected`, `completed`, etc, do we pass `isRejected`, `isCompleted` booleans? Maybe for this case, it doesn't make sense, but be ensured that you will need these states somewhere along the line, and you will get cluttered with booleans just to cover all of the cases. This is with what you might end up eventually:

```
// button-wrap.vue
<template>
  <button v-bind="$attrs" v-on="$listeners" :disabled="isLoading && !isCompleted && !isRejected"
    :class="{'is-valid': isCompleted, 'is-rejected': isRejected}"
  >
    <span v-if="isLoading && !isCompleted && !isRejected">Loading ...</span>
    <slot v-else-if="!isLoading && !isCompleted && !isRejected"></slot>
  </button>
</template>

<script>
  export default {
    props: {
      isCompleted: {
        required: false,
        default: false,
        type: Boolean,
      },
      isRejected: {
        required: false,
        default: false,
        type: Boolean,
      },
      isLoading: {
        required: false,
        default: false,
        type: Boolean,
      }
    }
  }
</script>
```

```
//form.vue
<template>
  <form @submit.prevent="onSubmit">
  //
  <button-wrap :isLoading="status.isLoading"
    :isCompleted="status.isCompleted"
    :isRejected="status.isRejected">
    Submit
  </button-wrap>
  </form>
</template>

<script>
  export default {
    data: () => ({
      status: {
        isLoading: false,
        isRejected: false,
        isCompleted: false,
      }
    }),

    methods: {
      onSubmit() {
        this.status.isLoading = true;

        axios.post(url, data)
          .then((response) => {
            this.status.isCompleted = true;
          })
          .catch((error) => {
            this.status.isRejected = true;
          });
          .finally(() => {
            this.status.isLoading = false;
          }
      }
    }
  }
</script>
```

Having three booleans for three different states feels a bit redundant when the button can have only one state at a time. Let's see a more convenient way to do this using classes.

### Handling component state using status property{class=marginless}

Since a component can have only one state at a time, we can simplify by having one `data` property named `status` and use `strings` to represent the state that the component is currently in. Changing the value of the `status` would be a notification to the component that its state changed. This implementation would look like this:

```
// button-wrap.vue
<template>
  <button v-bind="$attrs" v-on="$listeners" :disabled="status === 'loading'"
    :class="{'is-valid': status === 'completed', 'is-rejected': status === 'rejected'}"
  >
    <span v-if="status === 'loading'">Loading ...</span>
    <slot v-else-if="status !== 'rejected' && status !== 'loading'"></slot>
  </button>
</template>

<script>
  export default {
    props: {
      status: {
        required: false,
        default: 'idle',
        type: String,
      }
    }
  }
</script>
```

```
//form.vue
<template>
  <form @submit.prevent="onSubmit">
  //
  <button-wrap :status="status">
    Submit
  </button-wrap>
  </form>
</template>

<script>
  export default {
    data: () => ({
      status: 'idle'
    }),

    methods: {
      onSubmit() {
        this.status = 'loading';

        axios.post(url, data)
          .then((response) => {
            this.status = 'completed';
          })
          .catch((error) => {
            this.status = 'rejected';
          });
          .finally(() => {
            if(this.status !== 'rejected') {
              this.status === 'idle';
            }
          }
      }
    }
  }
</script>
```

What would happen if we want to introduce a new state? What if we want to change the `rejected` class to `error`?

### Handling component state using a Status class{class=marginless}

Nothing prevents us from using JavaScript classes within our Vue components. When abstracting away a functionality I always tend to simplify and find the most pragmatic approach to the solution I am trying to solve. We can achieve such abstraction if we combine take away best parts of the solutions above. Let's build the Status class now.

```javascript
// classes/Status.js

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
}

export default class Status {
  constructor(status = STATUS.IDLE) {
    this.status = status
  }

  get() {
    return this.status
  }

  set(status) {
    this.status = status
  }

  is(status) {
    return this.status === status
  }

  isLoading() {
    return this.is(STATUS.LOADING)
  }

  isNotLoading() {
    return !this.is(STATUS.LOADING)
  }

  isCompleted() {
    return this.is(STATUS.COMPLETED)
  }

  isIdle() {
    return this.is(STATUS.IDLE)
  }

  isRejected() {
    return this.is(STATUS.REJECTED)
  }

  setLoading() {
    this.set(STATUS.LOADING)
  }

  setCompleted() {
    this.set(STATUS.COMPLETED)
  }

  setRejected() {
    this.set(STATUS.ERROR)
  }

  setIdle() {
    this.set(STATUS.IDLE)
  }

  toggle() {
    this.set(this.status === STATUS.IDLE ? STATUS.LOADING : STATUS.IDLE)
  }

  toString() {
    return this.get()
  }

  valueOf() {
    return this.get()
  }
}
```

The class is pretty straightforward, there is no complicated logic, just simple `set` and `get` methods for all of the states we can have. Let's now integrate this class in our simple form example:

```
// button-wrap.vue
<template>
  <button v-bind="$attrs" v-on="$listeners" :disabled="status.isLoading()"
  :class="{'is-valid': status.isCompleted(), 'is-rejected': status.isRejected()}">
    <span v-if="status.isLoading()">Loading ...</span>
    <slot v-else-if="status.isIdle() || status.isCompleted()"></slot>
  </button>
</template>

<script>
  import Status from '~/classes/Status';

  export default {
    props: {
      status: {
        required: false,
        default: () => new Status(),
        type: Object,
      }
    }
  }
</script>
```

```
//form.vue
<template>
  <form @submit.prevent="onSubmit">
  //
  <button-wrap :status="status">
    Submit
  </button-wrap>
  </form>
</template>

<script>
import Status from '~/classes/Status';

export default {
  data: () => ({
    status: new Status()
  }),

  methods: {
    onSubmit() {
      this.status.toggle();

      axios.post(url, data)
        .then((response) => {
          this.status.setCompleted();
        })
        .catch((error) => {
          this.status.setRejected();
        });
        .finally(() => {
          if(this.status.isNotRejected()) {
            this.status.toggle();
          }
        }
    }
  }
}
</script>
```

If you are a *clean code* freak like me, this code looks pretty dope. Now, you can use the `Status` class anywhere and for different cases like fetching data from an API, submitting a form, toggling sates based on user actions, showing UI skeletons while prefetching data, etc.

---

You can also use HOC (High order components) to abstract the state logic and use that within your components, but eventually, it boils down to the first/second scenario that I told you about in this post. This approach is framework agnostic, meaning that you can also use it in your React apps. You can always use a **state machine** like [xstate](https://xstate.js.org/) but for simple logic, I find my approach way easier and more convenient that importing a whole new library. Thanks for reading. I will update this series with another post soon.