const author = "Bojan Angjelkoski <hello@abojan.me>";

export const usePostSeo = (post: {
  title: string;
  excerpt: string;
  image: string;
  keywords: string;
}) => {
  const config = useRuntimeConfig();
  const route = useRoute();
  const url = `${config.public.appUrl}${route.fullPath}`;
  const imageUrl = `${config.public.appUrl}${post.image}`;

  useHead({ title: post.title });

  useSeoMeta({
    keywords: post.keywords,
    description: post.excerpt,
    author,
    ogType: "article",
    ogTitle: post.title,
    ogDescription: post.excerpt,
    ogUrl: url,
    ogImage: imageUrl,
    twitterCard: "summary_large_image",
    twitterSite: "@bangjelkoski",
    twitterCreator: "@bangjelkoski",
    twitterTitle: post.title,
    twitterDescription: post.excerpt,
    twitterImage: imageUrl,
  });
};
