const description =
  "Bojan Angjelkoski — Director of Engineering at Injective Labs. Building teams, systems, and products that ship.";
const keywords =
  "bojan angjelkoski, Director of Engineering, injective labs, software engineering, frontend engineering, typescript, vue, nuxt, web development";
const author = "Bojan Angjelkoski <hello@abojan.me>";

export const usePageSeo = (title: string, options?: { bodyClass?: string }) => {
  const config = useRuntimeConfig();
  const route = useRoute();
  const url = `${config.public.appUrl}${route.fullPath}`;
  const imageUrl = `${config.public.appUrl}/images/share.jpg`;

  useHead({
    title,
    ...(options?.bodyClass ? { bodyAttrs: { class: options.bodyClass } } : {}),
  });

  useSeoMeta({
    keywords,
    description,
    author,
    ogType: "website",
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: imageUrl,
    twitterCard: "summary_large_image",
    twitterSite: "@bangjelkoski",
    twitterCreator: "@bangjelkoski",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
  });
};
