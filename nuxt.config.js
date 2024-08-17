export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Schoolin Prime",
    htmlAttrs: {
      lang: "en",
      "data-wf-domain": "schoolin.io",
    },

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      {
        content: "One of the best educative platform for first class minds.",
        name: "description",
      },
      {
        content: "Make a Good Decision Now... Join The Learned Community.",
        property: "og:title",
      },
      {
        content:
          "There is no better time to take a good chance than when the opportunity present.",
        property: "og:description",
      },
      {
        content: "https://schoolin.io/Logo.png",
        property: "og:image",
      },
      {
        content: "Make a Good Decision Now... Join The Learned Community.",
        property: "twitter:title",
      },
      {
        content: "Make a Good Decision Now... Join The Learned Community.",
        property: "twitter:description",
      },
      {
        content: "https://schoolin.io/Logo.png",
        property: "twitter:image",
      },
      { property: "og:type", content: "website" },
      { content: "summary_large_image", name: "twitter:card" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { content: "Webflow", name: "generator" },
    ],

    link: [
      { rel: "icon", type: "image/x-icon", href: "/icon.png" },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
      },

      { href: "https://fonts.googleapis.com", rel: "preconnect" },
      {
        href: "https://fonts.gstatic.com",
        rel: "preconnect",
        crossorigin: "anonymous",
      },
      {
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        rel: "stylesheet",
      },
      {
        href: "/css/custom-home.css",
        rel: "stylesheet",
      },
    ],

    script: [
      {
        src: "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",
        type: "text/javascript",
      },
      {
        src: "/script/query.js",
        type: "text/javascript",
      },
      {
        src: "/script/font.js",
        type: "text/javascript",
      },
      { src: "https://js.paystack.co/v1/inline.js", type: "text/javascript" },
      // {
      //   src: "/script/smartSupport.js",
      //   type: "text/javascript",
      // },
      // {
      //   src: "/script/dashboard.js",
      //   type: "text/javascript",
      // },

      // {
      //   src: "https://code.tidio.co/0gqmbzwnpgualga6qdslyngzvcs0rocd.js",
      //   type: "text/javascript",
      //   async: true,
      // },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ["~/assets/css/main.css"],

  plugins: [
    { src: "~/plugins/fontLoader.js", mode: "client" },
    // { src: "~/plugins/clientFontLoader.js", mode: "client" },
    // { src: "~/plugins/support.js", ssr: false },
    // { src: "~/plugins/socket.io.js", ssr: false },
  ],

  router: {
    base: "/",
    middleware: ["isAuthenticated"],
  },

  auth: {
    strategies: {
      local: {
        // scheme: 'refresh'
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer",
        },
        user: {
          property: "user",
          autoFetch: true,
        },

        endpoints: {
          login: { url: "/users/login", method: "post" },
          logout: false,
          user: { url: "/users/get-user", method: "get" },
        },
      },
    },
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],

  generate: {
    routes: [
      // Add the confirmation route to the generated routes
    ],
  },

  // axios: {
  //   baseURL: "https://schoolin.io/schoolin/api",
  // },
  // publicRuntimeConfig: {
  //   FILE_URL: "https://schoolin.io/schoolin/api/uploads",
  // },

  axios: {
    baseURL: "http://127.0.0.1/schoolin/api",
  },
  publicRuntimeConfig: {
    FILE_URL: "http://127.0.0.1/schoolin/api/uploads",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  target: "static",
};
