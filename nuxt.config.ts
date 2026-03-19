export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Bojan Angjelkoski — Director of Engineering",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "google-site-verification",
          content: "CUa_gYMxlqM5FtfaM94rEke1P_HI-_prKSqq3WZuOEg",
        },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicons/32x32.png" },
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
    preset: 'netlify',
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
          theme: {
            default: "github-light",
            dark: "github-dark",
          },
        },
      },
    },
  },
});
