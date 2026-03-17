export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Bojan Angjelkoski's Personal Portfolio",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "google-site-verification",
          content: "CUa_gYMxlqM5FtfaM94rEke1P_HI-_prKSqq3WZuOEg",
        },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/favicons/32x32.png" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  vite: {
    optimizeDeps: {
      include: ["@nuxtjs/mdc"],
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "nuxt-gtag",
    "@nuxtjs/sitemap",
    "@vueuse/nuxt",
  ],

  runtimeConfig: {
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || "https://bangjelkoski.com",
    },
  },

  gtag: {
    id: "UA-127706672-1",
  },

  site: {
    url: "https://bangjelkoski.com",
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.scss",
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: "one-dark-pro",
        },
      },
    },
  },
});
