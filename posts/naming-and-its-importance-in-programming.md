---
title: Naming and its importance in programming
date: 2019/10/01
slug: naming-and-its-importance-in-programming
excerpt: Phil Karlton said that there are only two hard things in Computer Science - cache invalidation and naming things.
keywords: programming, naming variables, naming classes, computer science, cache invalidation, naming functions,
image: /images/naming-in-programming.jpg
category: Computer Science
tags: computer science, programming
---

If you are writing code for some time you know that naming is very important in software development. We name our variables, functions, classes, modules, etc. It's proven that we spend more time reading code than we do writing it, so good naming always pays off in the future. Spending time in writing good code actually saves your time directly and indirectly.

Let's see an example of a hard to read code.

```js
const convert = (x, y, z) => {
  const k = Object.keys(x);

  return k.map(key => {
    return {
      [y]: key,
      [z]: x[key],
    };
  });
};
```

If you try to understand what on the earth this function tries to achieve, you might figure it out at the end but imagine having a big piece of functionality that is written in this way. How hard it will be for someone else (even yourself when you revisit that piece of code in the future) to understand it?

## Understanding the problem you are trying to solve {class=marginless}

I challenge you to have a look at code you wrote a few months ago. Can you understand what does it achieve? Can you explain to someone easily what problem were you trying to solve? You know it's not always easy to do that.

While working on some issues, we are often immersed in it to a point where it feels natural to us. As a result, what's happening is that we can find ourself in a position where it's really hard to put the problem into words so it's easy for **others to understand.**

Yes, your focus while solving issues and writing code should be to write easily understandable code. You should view the language around your code as your proxy. Its job is to explain the problem that your code is solving to others when you're not around.

If we want to do that, we should put extra time to investigate and learn more about the problem we are trying to solve in greater detail. This will help you flesh out the language around the problem. This should make it easier for you to describe what your code is doing to others.

## Good code is self-explanatory {class=marginless}

The key takeaway from this post is to force yourself to write code that even non-technical users will understand. A good rule of thumb is: If an identifier name requires a comment, then it doesn't reveal the intent of the identifier. This doesn't state that you should try to avoid comments or only write code that doesn't need any explanation. Just try to explain your code through proper naming identifiers (variables, functions, classes ...).

Lets examine different situations where you can improve your code by taking some simple steps to clarify it.

### Naming should have a clear purpose {class=marginless}

When declaring variables we should always try to name them in a way that the purpose of the variable is clear. Let's say we have a variable named `t` which stores time. Declaring this variable says nothing about its purpose. It does not evoke a sense of lapsed time. It would be better to choose a name that specifies what is being measured, and the unit of that measurement. Depending on the situation, we can declare variables like `daysSinceCreation`, `elapsedTimesInSeconds`, `daysSinceClosing`, `personAgeInDays` ...

Let compare these two functions that perform the same operation.

```js
function getList(list) {
  const list1 = [];

  for (x in list) {
    if (x % 2 === 0) {
      list1.push(x);
    }
  }

  return list1;
}

function getOddNumbers(listOfNumbers) {
  const oddNumbers = [];

  for (number in listOfNumbers) {
    if (isOdd(number)) {
      oddNumbers.push(number);
    }
  }

  return oddNumbers;
}
```

Why is it so hard to tell what the `getList` function does? There are no complex expressions. The code is indented and formatted properly. Only three variables are used and there's no fancy stuff.

Now take a look at the `getOddNumbers` function. Did you see that the function does the same as the `getList` function?

Notice that the simplicity of the code has not changed. It still has the same number of operators and variables, with the same number of nesting levels. The only thing that has changed, is that the code has become much more explicit.

With some simple name changes, it is suddenly much easier to tell what this piece of code does.

### Avoid using plain values {class=marginless}

The so-called _magic numbers_ are numbers that appear in your source code without any explanation of what they stand for (this is also applicable to other primitive types like Booleans). Usually, this is because they are used directly rather than being referenced as a variable or constant.

These plain values make your code difficult to understand as there's no explanation of what the value stands for or how it was determined.

Let's have a look at this function that calculates the potential energy given the mass and the height of an object.

```js
function potentialEnergy(mass, height) {
  return mass * height * 9.81;
}
```

As you can see, we use a _magic number_ in our function. Some of us probably know what does it stand for, but it will be much clear if we replace the magic number with a constant that represents what does that value stands for.

```js
const GRAVITATIONAL_CONSTANT = 9.81;

function potentialEnergy(mass, height) {
  return mass * height * GRAVITATIONAL_CONSTANT;
}
```

We can expand this rule even further. Let's say we want to express how much milliseconds are there in an hour and use it somewhere in our code.

```js
const MILLISECONDS_IN_ONE_HOUR = 3600000;
```

Instead of just writing the number, we can preserve the calculations inside our code instead of just using the number. This allows other developers to not only see what the number means, but also understand how it was determined.

```js
const MILLISECONDS_IN_ONE_HOUR = 60 * 60 * 1000;
```

Moving on to an example with a boolean flag. Boolean flags can make for hard-to-understand code, so we should try to avoid them as much as possible. Consider having this function that accepts boolean as a second argument.

```js
object.setData({ x: 1 }, true);
```

What is the meaning of `true`? We have no idea unless you dig into the source for `setData()` and find out. If we assume that we looked at the code and found out that it's just a flag to merge `key:value` pairs with existing ones within the object, what would be the best way to avoid using plain values? Using constants? Well, yeah but there is even a better way to handle this situation. Instead of adding a boolean flag, we can make a new function that merges the data by default.

```js
object.mergeData({ x: 1 });
```

### Use names you can pronounce and search {class=marginless}

Pretend we have a variable name called `const xsq`, which is a very important abbreviation for your company. Imagine a conversation with a colleague:

- “Hey, what about that variable eks ess kjew?”
- “You mean the access queue?”

Some developers will try to pronounce the variable as one word. Others will spell out the word.

Names that consist of one letter have the problem that they can't be located easily. Imagine having a variable named `a`, and you want to find and replace all occurrences of that variable? Sounds impossible, right?

### Don't use abbreviations {class=marginless}

You should also try to avoid abbreviations as well. For example, let's say you're using `cat` instead of `category`. Does `cat` mean a `category` or `catalog`? (or maybe it's an actual `cat`!?)

Sure, you know the answer, but it still creates ambiguity. As we saw earlier, you should avoid it as much as possible. Saving a few characters isn't worth the confusion that an abbreviation might bring.

### Replace conditional expression with function/variables {class=marginless}

If statements with multiple operands can often be hard to understand without a comment. We can apply a similar method as above to clarify them. Have a look at this piece of code.

```js
if(!el.offsetWidth || !el.offsetHeight) {
  //
}
```

What is the purpose of the code above? It can have multiple purposes, one of which is whether the element is visible in the viewport. We found the purpose, so now let's extract it to a variable or even better a reusable function.

```js
function isVisible(el) {
    return !el.offsetWidth || !el.offsetHeight;
}

if(isVisible(el)) {

}

/** OR **/

const isVisible = el.offsetWidth && el.offsetHeight;

if(!isVisible) {
}
```

Extracting the conditional to a variable makes sense when the logic you want to clarify is very specific to a certain algorithm used only in one place. The most common use for this method is mathematical expressions.

```js
return a * b + (c / d);
```

We can clarify the above by splitting the calculation:

```js
const multiplier = a * b;
const divisor = c / d;
return multiplier + divisor;
```


### Class and module interfaces {class=marginless}

Class name and object name should be noun or noun phrase (`User`, `Customer`, `Account`, etc). You should avoid words like `Data`, `Information` or `Info` (they don't give clear explanation of class or object. There can be different types of data or information). A verb as class name is highly discouraged.

The interface — that is, the public methods and properties — of a class or module can act as documentation on its usage. Lets have a look at one example.

```js
class Box {
  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}
```

This class could contain some other code in it as well. I purposely kept the example simple, to illustrate how the public interface is documentation. Can you tell how this class should be used? Maybe with a little bit of work, but it isn't very obvious on the first read.

Both of the functions have reasonable names: what they do is clear from their name. But despite this, it's not very clear how we should be using them. Most likely we would need to read more code or the documentation for the class to figure it out.

In this example, even though we named the class and its methods clearly, we can go even further.

```js
const BOX_OPEN = 'open';
const BOX_CLOSED = 'closed';

class Box {
  open() {
    this.state = BOX_OPEN;
  }

  close() {
    this.state = BOX_CLOSED;
  }

  isOpen() {
    return this.state === BOX_OPEN;
  }
}
```

We can now see its much easier to guess the usage of our class. Notice that we only changed the public interface; the internal representation is still the same with the `this.state` property.

Now we can tell at a glance how the `Box` class is used. This shows that even though the first version had good names in the functions, the complete package was still confusing, and how, with simple decisions like this we can have a very big impact.


### Use language features to your advantage  {class=marginless}

We can even use some features of our chosen language to better communicate the intention behind some code. A good example of this in JavaScript are the array iteration methods.

```js
const ids = [];

for(let i = 0; i < items.length; i++) {
  ids.push(items[i].id);
}
```

The above code collects a list of IDs into a new array. However, in order to know that, we need to read the whole body of the loop. Compare it with using the `map()` function.

```js
const ids = items.map(function(item) {
  return item.id;
});
```

In this case, we immediately know that this produces a new array of something, because that's the purpose of map(). This can be beneficial especially if you have more complicated looping logic. There's a list of other [iteration functions on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods){target=_blank rel="noopener noreferrer"}.

Another example with JavaScript is the const keyword. Often, you declare variables where the value is supposed to never change. A very common example is when loading modules with CommonJS:

```js
var async = require('async');
```

We can make the intention of never changing this even more clear:

```js
const async = require('async');
```

As an added benefit, if someone ever accidentally tries to change this, we'll now get an error.

## Empathize with others {class=marginless}

Indeed, you're not always coding software with complex business requirements. But that doesn't mean that there isn't some merit to the idea of creating a ubiquitous language. That's what the previous example tried to show you.

Creating a ubiquitous language forces you to empathize with others. You need to find words that aren't ambiguous and that everyone can understand. The result is that it's easier for others to work with both your application and your code.

We should also empathize with our future selves. That person is often not that different from someone who has to read your code for the first time. That person and others that will read your code deserve a consistent language made up of words that are simple and unambiguous.

---

**We often forget that writing code isn't just about solving problems. We're still writing something that others will read. That's the essence of why naming is important when you write code.**
