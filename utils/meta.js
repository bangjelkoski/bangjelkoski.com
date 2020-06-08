const description =
  'I am committed and ambitions professional that can quickly assimilate new ideas and concepts and demonstrate a logical and analytical approach to solving complex problems and issues. I am able to analyze code and engineer well-researched, cost-effective and responsive solutions. I manage all aspects of the web development cycle, from concept to requirements definition, design, development, launch, maintenance and user support. I am very communicative and have a good sense of humor. I value honesty, integrity, appreciation, compassion, and empathy.'
const keywords =
  'bojan angjelkoski, bojan, angjelkoski, blog, eloquent, tailwind, booksi, development blog, laracasts, laravel tutorials, web developer, vue, vuejs, portfolio, web applications, sass, node app, vue app, vuejs application, application development, laravel'
const author = 'Bojan Angjelkoski <me@bangjelkoski.com>'

export const DefaultPostMetaTags = [
  { hid: 'author', name: 'author', content: author },
  {
    hid: 'twitter-card',
    property: 'twitter:card',
    content: 'summary_large_image'
  },
  { hid: 'twitter-site', property: 'twitter:site', content: '@bangjelkoski' },
  {
    hid: 'twitter-creator',
    property: 'twitter:creator',
    content: '@bangjelkoski'
  }
]

export const DefaultMetaTags = [
  { hid: 'keywords', name: 'keywords', content: keywords },
  { hid: 'description', name: 'description', content: description },
  { hid: 'author', name: 'author', content: author }
]

export const DefaultOgMetaTags = [
  { hid: 'og-type', property: 'og:type', content: 'portfolio website' },
  {
    hid: 'og-image',
    property: 'og:image',
    content: `${process.env.NUXT_ENV_APP_URL}/images/share.jpg`
  },
  { hid: 'og-description', property: 'og:description', content: description },
  {
    hid: 'twitter-card',
    property: 'twitter:card',
    content: 'summary_large_image'
  },
  { hid: 'twitter-site', property: 'twitter:site', content: '@bangjelkoski' },
  {
    hid: 'twitter-creator',
    property: 'twitter:creator',
    content: '@bangjelkoski'
  },
  {
    hid: 'twitter-description',
    property: 'twitter:description',
    content: description
  },
  {
    hid: 'twitter-image',
    property: 'twitter:image',
    content: `${process.env.NUXT_ENV_APP_URL}/images/share.jpg`
  }
]

export const DefaultTags = [...DefaultMetaTags, ...DefaultOgMetaTags]

export const generateMetaTitle = (title) => [
  { hid: 'twitter-title', property: 'twitter:title', content: title },
  { hid: 'og-title', property: 'og:title', content: title },
  { hid: 'title', property: 'title', content: title }
]
