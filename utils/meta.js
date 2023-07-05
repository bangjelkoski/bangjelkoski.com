const description =
  'Hey! I am Bojan — MSc in Software Engineering and Tech Lead at Injective Labs. With a strong passion for technology and expertise in software development, I am driving transformative changes in the decentralized financial landscape.'
const keywords =
  'bojan angjelkoski, bojan, angjelkoski, blog, cosmossdk, cosmos, cosmos developer, injective, injective labs, bojan injective, vue, vuejs, web3 development, dapps development, sdk-ts, defi, defi developer, defi injective, vuejs application, application development'
const author = 'Bojan Angjelkoski <hello@abojan.me>'

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
