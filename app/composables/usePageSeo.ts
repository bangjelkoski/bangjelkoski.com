const description =
  'Hey! I am Bojan — MSc in Software Engineering and Engineering Director at Injective Labs. With a strong passion for technology and expertise in software development, I am driving transformative changes in the decentralized financial landscape.'
const keywords =
  'bojan angjelkoski, bojan, angjelkoski, blog, cosmossdk, cosmos, cosmos developer, injective, injective labs, bojan injective, vue, vuejs, web3 development, dapps development, sdk-ts, defi, defi developer, defi injective, vuejs application, application development'
const author = 'Bojan Angjelkoski <hello@abojan.me>'

export const usePageSeo = (title: string, options?: { bodyClass?: string }) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const url = `${config.public.appUrl}${route.fullPath}`
  const imageUrl = `${config.public.appUrl}/images/share.jpg`

  useHead({
    title,
    ...(options?.bodyClass ? { bodyAttrs: { class: options.bodyClass } } : {}),
  })

  useSeoMeta({
    keywords,
    description,
    author,
    ogType: 'website',
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: imageUrl,
    twitterCard: 'summary_large_image',
    twitterSite: '@bangjelkoski',
    twitterCreator: '@bangjelkoski',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
  })
}
