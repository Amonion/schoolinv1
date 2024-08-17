<template>
  <div>
    <section class="home-top">
      <div class="contain">
        <div class="home-top-holder">
          <div class="home-top-each">
            <div class="home-social-icon">
              <img
                src="https://assets-global.website-files.com/656a90c4e57ba7b7685c4581/656ae28a8397f73bfb85c760_iface.svg"
                loading="lazy"
                alt=""
                class="home-socials-top"
              />
            </div>
            <div class="home-social-icon">
              <img
                src="https://assets-global.website-files.com/656a90c4e57ba7b7685c4581/656ae34db59a73ed77c449a7_twitter.svg"
                loading="lazy"
                alt=""
                class="home-socials-top"
              />
            </div>
            <div class="home-social-icon">
              <img
                src="https://assets-global.website-files.com/656a90c4e57ba7b7685c4581/656ae336a7d01fc94a3b0a0e_insta.svg"
                loading="lazy"
                alt=""
                class="home-socials-top"
              />
            </div>
            <div class="home-social-icon">
              <img
                src="https://assets-global.website-files.com/656a90c4e57ba7b7685c4581/656ae376e57ba7b76891a6d7_pin.svg"
                loading="lazy"
                alt=""
                class="home-socials-top pin"
              />
            </div>
            <div class="home-top-link">
              <strong class="bold-text"
                >Welcome to Agriculture WordPress Theme</strong
              >
            </div>
          </div>
          <div class="home-top-each">
            <div class="home-flex-top">
              <img
                src="https://assets-global.website-files.com/656a90c4e57ba7b7685c4581/656af87318790741945451ac_messages.svg"
                loading="lazy"
                alt=""
                class="home-tip-icon"
              />
              <div class="home-top-link">needhelp@company.com</div>
            </div>
            <div class="home-flex-top">
              <img
                src="https://assets-global.website-files.com/656a90c4e57ba7b7685c4581/656aab80e57ba7b7686de27e_clock.svg"
                loading="lazy"
                alt=""
                class="home-tip-icon"
              />
              <div class="home-top-link">
                Mon - Sat 8:00 - 6:30, Sunday - CLOSED
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="navigation" id="append">
      <div
        data-animation="default"
        data-collapse="medium"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        class="navbar w-nav"
      >
        <div class="contain">
          <div class="flex-nav">
            <div>
              <NuxtLink to="/" class="home-logo-holder w-nav-brand"
                ><img
                  src="/Logo.png"
                  loading="lazy"
                  alt=""
                  class="home-logo min-w-[120px]"
              /></NuxtLink>
              <div id="translate"></div>
            </div>
            <nav role="navigation" class="nav-menu w-nav-menu">
              <nuxt-link to="/" class="home-nav-link active w-nav-link"
                >Home</nuxt-link
              ><nuxt-link to="/about" class="home-nav-link w-nav-link"
                >About</nuxt-link
              >
              <nuxt-link to="/plans" class="home-nav-link w-nav-link"
                >Plans</nuxt-link
              >
              <nuxt-link to="/partners" class="home-nav-link w-nav-link"
                >Partners</nuxt-link
              >
              <nuxt-link to="/contact" class="home-nav-link w-nav-link"
                >Contact</nuxt-link
              >
              <div class="py lg:hidden">
                <nuxt-link to="/signup" class="home-nav-link w-nav-link"
                  >Signup</nuxt-link
                >
                <nuxt-link to="/login" class="home-nav-link w-nav-link"
                  >Login</nuxt-link
                >
              </div>
            </nav>
            <div v-if="user" class="top-touch">
              <NuxtLink
                v-if="user.status == 'User'"
                to="/dashboard"
                class="text-base text-white py-1 ml-auto px-5 rounded-md bg-[#194d3a]"
              >
                <div class="home-small-text">Dashboard</div>
              </NuxtLink>
              <NuxtLink
                v-else
                to="/admin"
                class="text-base text-white py-1 ml-auto px-5 rounded-md bg-[#194d3a]"
              >
                <div class="home-small-text">Admin</div>
              </NuxtLink>
              <span
                @click="logout"
                to="/login"
                class="text-base text-white ml-6 py-1 px-5 rounded-md bg-[#f7c357] cursor-pointer"
              >
                <div class="home-small-text">Logout</div>
              </span>
            </div>
            <div v-else class="top-touch">
              <NuxtLink
                to="/login"
                class="text-base text-white ml-auto py-1 px-5 rounded-md bg-[#f7c357]"
              >
                <div class="home-small-text">Login</div>
              </NuxtLink>
              <NuxtLink
                to="/signup"
                class="text-base text-white py-1 ml-6 px-5 rounded-md bg-[#194d3a]"
              >
                <div class="home-small-text">Sign Up</div>
              </NuxtLink>
            </div>
            <div class="w-nav-button">
              <div class="icon-5 w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ideNav: false,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },

    loadScript() {
      if (!process.server) {
        let frontScript = document.getElementById("translatorFront");

        if (frontScript == null) {
          const scriptTranslate = document.createElement("script");

          scriptTranslate.type = "text/javascript";

          scriptTranslate.src =
            "https://translate.yandex.net/website-widget/v1/widget.js?widgetId=translate&pageLang=en&widgetTheme=light&autoMode=false";
          scriptTranslate.async = true;

          scriptTranslate.id = "translatorFront";
          const app = document.querySelector("#append");
          if (app) {
            app.appendChild(scriptTranslate);
          } else {
            console.error("Could not find app node to append script element");
          }
        }
      }
    },

    loadScripts() {
      if (!process.server) {
        let el = document.getElementById("script");

        if (el == null) {
          const script = document.createElement("script");

          script.type = "text/javascript";

          script.src = "/script/home.js";

          script.id = "script";
          const app = document.querySelector("#append");
          if (app) {
            app.appendChild(script);
          } else {
            console.error("Could not find app node to append script element");
          }
        }
      }
    },
  },

  mounted() {
    this.loadScript();
    this.loadScripts();
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style>
.router-link-active.block {
  color: #255946;
  text-decoration: underline;
}
.w-nav-overlay {
  display: none;
}
@media screen and (max-width: 991px) {
  nav.ide {
    height: 0;
    overflow: hidden;
  }

  nav {
    height: 300px;
  }

  .w-nav-overlay {
    display: none;
  }
}
</style>
