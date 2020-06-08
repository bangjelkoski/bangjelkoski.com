const path = require("path");
const glob = require("glob");

const getDynamicPaths = files => {
    return [].concat(
        ...Object.keys(files).map(url => {
            const filepathGlob = files[url];
            return glob
                .sync(filepathGlob, { cwd: __dirname })
                .map(filepath => `${url}/${path.basename(filepath, ".md")}`);
        })
    );
};

const dynamicRoutes = getDynamicPaths({ "/blog": "posts/*.md" });

export default {
    mode: "universal",

    ErrorPage: "~/components/pages/error",

    /*
     ** Headers of the page
     */
    head: {
        htmlAttrs: {
            lang: "en"
        },
        title: "Bojan Angjelkoski's Personal Portfolio",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                name: "google-site-verification",
                content: "CUa_gYMxlqM5FtfaM94rEke1P_HI-_prKSqq3WZuOEg"
            }
        ],
        link: [{ rel: "icon", type: "image/png", href: "/favicons/32x32.png" }]
    },
    /*
     ** Customize the progwress-bar color
     */
    loading: { color: "#fff" },
    /*
     ** Global CSS
     */
    css: [
        {
            src:
                "~/node_modules/highlight.js/styles/atom-one-dark-reasonable.css",
            lang: "css"
        }
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: "~/plugins/reveal", ssr: false },
        { src: "~/plugins/affix", ssr: false }
    ],

    router: {
        linkActiveClass: "is-active"
    },

    generate: {
        routes: dynamicRoutes,
        fallback: true
    },

    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ["@nuxtjs/tailwindcss"],

    purgeCSS: {
        whitelist: [
            "is-active",
            "hr",
            "strong",
            "small",
            "em",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "marginless",
            "button",
            "p",
            "a",
            "pre",
            "code",
            "ul",
            "ol",
            "page-enter-active",
            "page-leave-to",
            "page-leave-active",
            "page-enter",
            "text-teal-500",
            "text-purple-700",
            "text-green-500",
            "text-green-700",
            "text-red-500",
            "text-blue-500",
            "text-orange-500"
        ],
        whitelistPatterns: [/language/, /hljs/]
    },

    /*
     ** Nuxt.js modules
     */
    modules: [
        "@nuxtjs/dotenv",
        "@nuxtjs/axios",
        "@nuxtjs/google-gtag",
        "@nuxtjs/sitemap"
    ],

    "google-gtag": {
        id: "UA-127706672-1"
    },

    sitemap: {
        hostname: "https://bangjelkoski.com",
        gzip: true
    },

    tailwindcss: {
        cssPath: "~/assets/css/tailwind.scss"
    },

    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},

    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
            config.module.rules.push({
                test: /\.md$/,
                include: path.resolve(__dirname, "posts"),
                loader: "raw-loader"
            });
        }
    }
};
