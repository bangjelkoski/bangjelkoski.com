---
title: Configuring new Laravel application with TailwindCSS
date: 2019/08/07
slug: configuring-new-laravel-application-with-tailwindcss
excerpt: Have you heard of Tailwind and you still haven't tried it in your applications?
keywords: tailwind, laravel with tailwind, configure tailwind, configure laravel with tailwind
image: /images/tailwind.png
category: Laravel
tags: laravel, tailwind
---

[Tailwind](https://tailwindcss.com) is something that you have to adopt in your **daily coding**. It will make writing CSS like a breeze. Not only it will speed up your **design development**, but it will also make you a better **UI designer**.

_Tailwind is a utility-first CSS framework for rapidly building custom user interfaces._ This is how they described Tailwind. Its not like any other **CSS framework** available (Bootstap, Bulma, ...), it doesn't have any predefined components, but instead you build every component on your own. Sounds difficult right? **Its not.** If you have your website to have its own identity, and not look like any other bootstrap based website online - use Tailwind.

Setting up Tailwind for Laravel is simple. Using your terminal, craft a new Laravel application using `laravel new <app_name>` command. Then, enter the directory using `cd <app_name>`, and run `composer install`. After composer did its thing, using `yarn` install node modules. After node modules are in place, install tailwind using `yarn add tailwindcss`.

After that, run `./node_modules/.bin/tailwind init` to init a configuration file for tailwind. You can configure the colors, modules, and other stuff for tailwind in tailwind.js file that was generated for you _(don't over think about this right now, you will learn how to customize tailwind to fit your needs after you play with it for a while)_.

In your main `.scss` file, add these two lines at the beginning:

```scss
@tailwind preflight
@tailwind utilities;
```

Open `webpack.min.js` and add this line to the top of the file

```js
let tailwindcss = require('tailwindcss');
```

And lastly, append to the `.scss()` function this postCSS method:

```js
.options({
      processCssUrls: false,
      postCss: [tailwindcss('./tailwind.js')],
});
```

Now, run `yarn run dev` and you can start using Tailwind in your Laravel application! You can read more about how to use tailwind in their website. Their documentation is amazing.
