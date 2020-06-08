---
title: Everything about JAM Stack and whether you should have FOMO about it
date: 2019/10/25
slug: everything-about-jam-stack-and-whether-you-should-have-fomo-about-it
excerpt: A modern development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup.
keywords: javascript, jam stack, fomo jam stack, fomo
image: /images/jamstack.jpeg
category: JAMStack
tags: jam stack, javascript
---
Working in the world of development can be a bit confusing, with lots of trends coming up to interrupt our normal lives and give us a bad case of FOMO. We‘re mostly stuck between learning, relearning and unlearning. Sometimes the new trends are not different from technologies we’ve already been using, other times, it will change your life or in this case, your stack. It’s no secret that the internet is a world of rapid, and near-constant, evolution.

## What the heck is JAM stack{class=marginless}

Over the past few years, one of the most recent major trends in web development has been the so-called **JAM stack,** a new concept for creating static websites — or sites written in pure HTML and CSS.

JAM stack stands for JavaScript, APIs, and Markup. It’s a new way of building websites and apps that delivers **better performance**, **higher security**, **lower cost of scaling**, and **better developer experience**. JAM Stack serves as an alternative to the once-prominent LAMP (Linux, Apache, MySQL, and PHP) and MEAN (MongoDB, Express.js, AngularJS, and Node.js) stacks. Let's now dive deeper into JAM Stack.

## JAM stack and its superpowers{class=marginless}

I have already highlighted some of the main benefits of using the JAM stack, but let's talk a bit more in-depth about each of them (and then some more):{class=mb-4}

* **Faster Performance:** The advantages of static websites in terms of speed can be astronomical. With HTML generated in advance and database queries eliminated, your content can be served quickly from a global content delivery network (CDN). Faster load times lead to reduced bounce rates, as visitors won’t be leaving your site due to slow loading times. This means more interactions, and ultimately, more conversions, as well.
* **Higher Security:** JAM stack web apps are incredibly secure since you don’t have to worry about servers been hacked or database vulnerabilities.
* **Less cost of scaling:** Cost of running a JAM stack web app is cheaper since it uses fewer resources as things like servers and databases are not necessarily needed.
* **Better Developer Experience:** By separating the data source from the actual application, we get a greater choice of technologies. You can use any framework/library/service to build a JAM stack web app.
* **Simpler model:** JAMStack's is a nice breeze of air in a world dominated by Docker, Kubernetes, Buildpacks & such.

You can also:{class=mb-4}
* Manage authentication, password recovery, and more with [Netlify Identity](https://www.netlify.com/docs/identity/).
* Searching through your data using [Algolia](https://www.algolia.com/) and [Lunr.js](https://lunrjs.com/).
* Handle your form submissions using [Formspree](https://formspree.io/) or [Netlify Forms](https://www.netlify.com/docs/form-handling/).
* Handle optimal image delivery with [Cloudinary](https://cloudinary.com/)
* much much more ...

---

## The JAM stack workflow{class=marginless}

If you got this far, I think you already are feeling the *JAM* stack. We already saw what does it stand for, now let's examine what is required to build an app using the JAM stack:{class=mb-4}

* **JavaScript**: Any dynamic programming during the request/response cycle is handled by JavaScript, running entirely on the client. This could be any frontend framework like [Vue.js](https://vuejs.org/), (or a library like) [React](https://reactjs.org/), [Angular](https://angular.io/), etc. or even vanilla JavaScript.
* **APIs**: All server-side processes or database actions are abstracted into reusable APIs, accessed over HTTP with JavaScript. These can be custom-built or leverage third-party services. These might include a payment processor like [Stripe,](http://www.stripe.com) a communication platform like [Twilio](http://www.twilio.com) or [Sendbird,](http://www.sendbird.com) or even a CMS like [Prismic](http://www.prismic.io) or [Contentful](http://www.contentful.com)
* **Markup**: The markup should be pre-built at deploy time, usually using a site generator like [Nuxt.js](https://nuxtjs.org/), [Gatsby.js](https://www.gatsbyjs.org/), etc. for content sites or a build tool like Webpack, ParcelJS, etc. for web apps.

When building a project with the JAM stack, you should consider the following best practices:{class=mb-4}

* The entire site should be served on CDN.
* Employ atomic deploys.
* Instant caching invalidation.
* Everything should live on Git.
* Markup builds should be automated.

### Web application frameworks{class=marginless}

Okay, having in mind everything that was written so far, few framework developers choose to build their JAM stack web apps. Having been using only **Nuxt.js** for my projects, I can't recommend any other framework, however choosing the framework is only up to you, since they all achieve the same outcome.

#### Nuxt.js{class="marginless text-green-700"}
Nuxt is the dominant framework when it comes to building web applications with Vue.js. Inspired by Next.js (its counterpart in the React world), it provides a statically generated mode that will embed the data used in your pages in your HTML templates.

#### Gatsby{class="marginless text-purple-700"}
Described as *a blazing fast modern site generator,* Gatsby is built in React and it allows embedding nearly any kind of data source into their internal GraphQL database for you to query. All the queried data will get statically built into the templates, making it blazing fast!

#### Gridsome{class="marginless text-green-500"}
Gridsome is a newcomer and the Vue equivalent to Gatsby. It is still in its early stages, but it looks promising. While it lacks the bigger ecosystem Gatsby has, it has picked up on its latest features and improved on them, and I expect it to move quite fast. Their documentation is getting better every day.

### Headless CMS{class=marginless}
From Wikipedia: *A headless content management system, or headless CMS, is a back-end only content management system (CMS) built from the ground up as a content repository that makes content accessible via an API for display on any device*. We use Headless CMS to get the dynamic content we need for our JAM stack web app. I have only worked with two Headless CMS so far, and here is a quick recap about my experience with them:

#### Contentful{class="marginless text-red-500"}
Its backend is quite simple and flexible to most use cases, including support for i18n fields, content relationships, a rich HTML content editor, and more. However, it's unexpectedly expensive. They have a free plan that might work for most use cases though.

#### Prismic{class="marginless text-blue-500"}
Prismic has outstanding UI and user experience. It has support for Ii8n documents, associations, responsive images, and many kinds of fields. They also have tools for working with all JavaScript frameworks (libraries) a great querying API, and much more.

### Deployment platforms{class=marginless}
There are probably other platforms for deploying JAM stack web apps, but I have been using only one and there isn't any other I would recommend more than **Netlify**. My experience using this service has been nothing but perfect from the moment I have registered. They also have a free plan that is probably enough for almost any project you are trying to build.

#### Netlify{class="marginless text-teal-500"}
Netlify it's just perfect for the JAM stack — notably, their CEO came up with the term — so expect it to support everything they need and more, including:{class=mb-4}

* Cached and automatic builds
* Deployment previews
* A/B testing
* Support for Serverless functions
* ...

---

I have built several web apps that are based on the JAM Stack and most importantly - the developer experience I have while building these kinds of apps is unparalleled. I encourage you to try it out and let me know about the outcome on my [Twitter](https://twitter.com/bangjelkoski).

This post  was inspired by my experience with JAM stack and also these posts [JAMstack: The What, The Why and The How](https://scotch.io/tutorials/jamstack-the-what-the-why-and-the-how), [What (the Hell) Is the JAMstack?](https://medium.com/@alexsanchezdesigns/what-the-hell-is-jamstack-5ef002963f26), [Adopting the JAMStack: Building CMS-backed static websites with Vue or React](https://www.codegram.com/blog/a-jamstack-journey-headless-content-management-with-vue-react/).