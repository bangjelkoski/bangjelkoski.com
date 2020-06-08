---
title: The road to a static portfolio website with a blog
date: 2019/09/29
slug: the-road-to-a-static-portfolio-website-with-a-blog
excerpt: I really want this time to be the last time I am rebuilding my portfolio website.
keywords: nuxt, vue, static, jam stack, netlify, static blog, markdown blog, portfolio
image: /images/portfolio-final.png
category: Web Development
tags: web development, netlify, nuxt, vue
---

The way you've built and designed your portfolio website says a lot about yourself as a developer. And why are we even building these websites? Well, I think its a really nice and convenient way to showcase your profile and introduce yourself to the world. Many newcomers that join our developers' community are building their portfolio websites as a way to learn new technology and gain a little bit of experience in building websites. Also probably because everyone is tired of making a ToDo list.

I had redesigned and rebuilt my portfolio website a few times now. Since we want to showcase ourself in the best possible way, I always listed my skills, projects I am working on, a little bit about myself and a contact form. The first version I built was built in native PHP, and it wasn't event uploaded online. After that, I wanted to experiment with Vue.js and I built the second version of my portfolio website, which in that time was a really nice looking and functional SPA (Single Page Application). However, I couldn't write any blog posts to express my thoughts on that version, so I redesigned it using Laravel and Tailwind by also adding a small dashboard for me to conveniently publish new blog posts, change the content on the website - because I really didn't want to upload a new version every time I want to change something.

So, everything looks perfect now. The website is live, changing stuff on it is easy, but ...

## Sometimes we need to take a break {class=marginless}

Working on personal stuff always gives you relief and keeps you motivated because you are working for yourself, and not for someone else. Sometimes, we need to take a break from brain-intensive tasks and just work on something that isn't so demanding. Building something for yourself, even if its something that you can build for a day always kept me satisfied with the work I am doing and why I choose to become a developer in the first place. If you ever find yourself stuck in a project that seems it's going on forever and doesn't feel rewarding when you are completing tasks, take the weekend and built something for yourself.

Another reason why I have decided to rebuild my website is to improve its speed and usability. I also wanted it to be more blog-focused since I have experienced a big flow of visitors to some of the blog posts I have written, which means that some people like what I write.

So, how to improve the speed and usability of the portfolio? By building a static single page application.

## The new way of building static single page application {class=marginless}

A static single page application is an HTML file, with some CSS and JavaScript that doesn't require a server to load. Since we are serving static HTML pages, our visitors experience a big improvement in speed while using our website. Did you know that almost 30% of your visitors will not wait for more than 3seconds for your application to load before leaving? Sometimes, even if you optimize your web application, loading can be slower than you expected because of your server. By generating (building) a static SPA your visitors don't have to to wait for the server to receive and respond to the request, all of your pages are served instantly.

There are tons of ways to build static SPA's (Nuxt, Gridsome, Gatsby, VuePress ...). These frameworks/libraries, give you pre-configured working environments which you can use to build your portfolio website fairly quickly. For this SPA, I am using Nuxt.js, which is a framework that gives you a boilerplate with a lot of configuration to make your development experience enjoyable. With Nuxt.js you can build universal web applications - SSR (server-side rendered) or client-side rendered. It also gives you a way to quickly generate a **static single page application** which is exactly what I wanted. And yes, since my preferred library for building UI's is Vue.js, adopting Nuxt.js in my workflow was pretty easy.

## Generating static pages {class=marginless}

Nuxt includes a command `nuxt generate`, that generates static pages for all `.vue` files in your project's `pages` directory. Simple as that. Build your pages, run a simple command and you have a static SPA ready to be deployed. But, `nuxt generate`, doesn't generate static pages for _dynamic_ pages. A dynamic page is a page which shows content depending on a route parameter. For example, if we want to show a blog post when a visitor navigates to `blog/{post}`, the `{post}` part in the URL is the `post` that we want to show to the user. But, since we can type anything we want in the `{post}` parameter (therefore the page is dynamic), the `nuxt generate` command doesn't generate static pages for those routes.

One way we can solve this 'problem', is to explicitly tell Nuxt to generate static pages for some values of the `{post}` parameter. In this case, since the blog will always have a finite number of posts, we can just get all the posts, and generate a `blog/{post}` static page that will be served to the visitor whenever he wants to visit a particular post. Great, now we even have static pages for our dynamic post page.

The next thing we need to do is to be able to write and elegantly handle blog posts. Since I don't want to use any database, every post will be stored as a single markdown file. All of the posts that I would write in the future should be handled and shown properly while also generating an appropriate static page for the new post, because doing it manually would just return me back to the previous version - and I want this one **to be the last version of my portfolio I build.**

## Handing of new posts and using markdown to write content {class=marginless}

My final goal is to just make a new markdown file, commit the changes, push them to a repository and they are automatically shown on the website (later in this post a bit more about the past part). But, how to parse and convert markdown and render it in JavaScript?

Every post has a slug in their attributes list. When a user visits a post URL, we get the slug in the URL and try to load the markdown file for that post. When the post is loaded, we get its YAML properties (post attributes) like _title_, _slug_, _date_, etc using the `front-matter` package. The content of the post is converted from markdown to HTML using the `markdownit` package. Before we display the content, we apply to highlight for the code snippets written in the post. That's it!

_`formatReadingTime` and `formatPostDate` are just functions that I use to format the posts reading time and date created. `markdown-it-attrs` is a package used to parse HTML attributes added your markdown._

```
/* pages/blog/_post.vue - Handling and rendering the post */

import { formatReadingTime, formatPostDate } from '~/utils/formatter';

const fm = require('front-matter');
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
})
    .use(require('markdown-it-highlightjs'))
    .use(require('markdown-it-attrs'));

export default {
    async asyncData({ params, app: { $md } }) {
        const result = await import(`~/posts/${params.post}.md`);
        const post = fm(result.default);

        return {
            attributes: post.attributes,
            content: md.render(post.body),
            readingTime: formatReadingTime(post.body),
            date: formatPostDate(post.attributes.date),
        };
    },
};
```

How about finding and browsing through all of the posts? Building the blog index page is simple. We just get all of the posts within our `posts` directory, get the needed attributes to display them on the page, sort them by creation date to show latest posts first and we are good to go. We can even add searching/filtering of the posts using Vue.js.

```
/* blog/index.vue - Showing all posts */

const fm = require('front-matter');
import { formatReadingTime, formatPostDate } from '~/utils/formatter';

export default {
    async asyncData() {
        const resolve = require.context('~/posts/', true, /\.md$/);
        const posts = resolve
            .keys()
            .map(key => {
                const [, name] = key.match(/\/(.+)\.md$/);
                return resolve(key);
            })
            .map(post => {
                const result = fm(post.default);
                return {
                    ...result.attributes,
                    readingTime: formatReadingTime(result.body),
                    date: formatPostDate(result.attributes.date),
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return {
            posts,
        };
    };
```

The last step for us to do is to configure Nuxt to generate static pages for all of the posts we have. To do this, we modify the `nuxt.config.js` config by extending the `generate` key to the default exported object.

```
/** nuxt.config.js **/
const glob = require('glob');
const path = require('path');

const getDynamicPaths = files => {
    return [].concat(
        ...Object.keys(files).map(url => {
            var filepathGlob = files[url];
            return glob
                .sync(filepathGlob, { cwd: __dirname })
                .map(filepath => `${url}/${path.basename(filepath, '.md')}`);
        }),
    );
};

const dynamicRoutes = getDynamicPaths({ '/blog': 'posts/*.md' });

export default {
  /** ...  **/
  generate: {
      routes: dynamicRoutes,
      fallback: true,
  },
}
```

Now the only thing remaining to be completed is to show the changes when we push to our repository. Netlify and it's CI/CD tools are out of this world - which is why I am going to use their services to deploy any changes to my website automatically.

## Netlify is ... magic {class=marginless}

If you are following any trends in the developers' community, you have probably heard of Netlify. Netlify is a unified platform that automates your code to create performant, easily maintainable sites and web apps. They provide continuous deployment, an intelligent, global CDN; full DNS. automated HTTPS, asset acceleration, and much more.

Within this post, I will just explain how I use Netlify for this project specifically. There will be probably a more detailed post about Netlify in the future and its features.

The `nuxt generate` command generates a `dist` folder that contains all of the assets we need to deploy our website. What we need to do using Netlify is to connect it to our repository and the branch we want to _watch_. Meaning - whenever we push to that branch on our repository, Netlify will trigger the actions we told it do perform.

So, we set up to run the `nuxt generate` command when we push to our repository's branch and serve the dist folder as our publish directory. Everything else is handled by Netlify for us. I told ya - **magic!**

---

Everything is configured now. All of the changes I make are almost instantly show on the live version of our website. I just need to commit and that it - which is extremely easy and convenient.

As a final note - I prefer dark themes. I think they are better for your eyes and there won't be any light theme for this website. I might also open source the project some day.

**Thanks for reading. I hope this post will inspire you to build your own static portfolio website 😁**
