export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",

  app: {
    head: {
      title: "Bojan Angjelkoski — Head of Technology",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Bojan Angjelkoski — Head of Technology at Injective Labs. Building with judgment, leading with depth.",
        },
        { name: "author", content: "Bojan Angjelkoski" },
        {
          name: "theme-color",
          content: "#FFFFFF",
          media: "(prefers-color-scheme: light)",
        },
        {
          name: "theme-color",
          content: "#0A0A0A",
          media: "(prefers-color-scheme: dark)",
        },
        {
          name: "google-site-verification",
          content: "CUa_gYMxlqM5FtfaM94rEke1P_HI-_prKSqq3WZuOEg",
        },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicons/32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicons/16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "512x512",
          href: "/favicons/512x512.png",
        },
        {
          rel: "preload",
          href: "/fonts/space-grotesk/space-grotesk-latin-500.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
        {
          rel: "preload",
          href: "/fonts/space-grotesk/space-grotesk-latin-700.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "",
        },
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark';if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          type: "text/javascript",
        },
      ],
    },
  },

  nitro: {
    preset: "netlify",
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxtjs/i18n",
    "nuxt-gtag",
    "@nuxtjs/sitemap",
    "@vueuse/nuxt",
  ],

  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.ts" },
      { code: "mk", language: "mk-MK", file: "mk.ts" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    langDir: "../app/locales",
  },

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
          theme: {
            default: "github-light",
            dark: "github-dark",
          },
        },
      },
    },
  },
});
