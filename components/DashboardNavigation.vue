<template>
  <div id="nav" class="dashboard-header">
    <div class="dash-header-cover">
      <div
        data-animation="over-right"
        data-collapse="small"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        class="dash-navigation w-nav"
      >
        <div class="dash-container flex">
          <div id="top2">
            <NuxtLink to="/" class="w-nav-brand"
              ><img src="/Logo.png" loading="lazy" width="123" alt="" />
            </NuxtLink>
            <div id="ytWidget"></div>
          </div>
          <nav
            role="navigation"
            class="dash-navlist w-nav-menu w-64 flex-col transition pl-3"
          >
            <div class="das-menu abs w-nav-button absolute top-3 right-3">
              <div class="w-icon-nav-menu"></div>
            </div>
            <div class="dash-mainnav top pl-3">
              <NuxtLink to="/dashboard" class="dash-mainnav-links active top"
                >Dashboard </NuxtLink
              ><NuxtLink to="/dashboard/manager" class="dash-mainnav-links top"
                >Manager </NuxtLink
              ><NuxtLink to="/dashboard/deposit" class="dash-mainnav-links top"
                >Deposit </NuxtLink
              ><NuxtLink to="/dashboard/withdraw" class="dash-mainnav-links top"
                >Withdraw </NuxtLink
              ><NuxtLink to="/dashboard/earnings" class="dash-mainnav-links top"
                >Earnings </NuxtLink
              ><NuxtLink
                to="/dashboard/referrals"
                class="dash-mainnav-links top"
                >Referrals
              </NuxtLink>
            </div>
            <div class="das-top-navflex">
              <NuxtLink
                to="/dashboard/profile"
                class="dash-icon-links w-inline-block"
                ><img
                  src="/images/dashboard/profile.svg"
                  loading="lazy"
                  alt=""
                />
              </NuxtLink>
              <NuxtLink
                to="/dashboard/notifications"
                class="dash-icon-links w-inline-block"
                ><img
                  src="/images/dashboard/notification.svg"
                  loading="lazy"
                  alt=""
                />
              </NuxtLink>
              <span
                @click="logout"
                class="dash-icon-links w-inline-block cursor-pointer"
                ><img
                  src="/images/dashboard/logout.svg"
                  loading="lazy"
                  alt=""
                />
              </span>
            </div>
          </nav>
          <div class="das-menu w-nav-button">
            <div class="w-icon-nav-menu"></div>
          </div>
        </div>
      </div>
      <div class="dash-header-content">
        <div class="dash-container">
          <h1 class="dash-header1">
            Welcome back,
            <span class="dash-spec" v-if="user">{{ user.username }}</span>
          </h1>
          <div class="dash-mainnav">
            <NuxtLink to="/dashboard" class="dash-mainnav-links das"
              >Dashboard</NuxtLink
            >
            <NuxtLink to="/dashboard/manager" class="dash-mainnav-links das"
              >Manager</NuxtLink
            ><NuxtLink to="/dashboard/deposit" class="dash-mainnav-links das"
              >Deposit</NuxtLink
            >
            <NuxtLink to="/dashboard/withdraw" class="dash-mainnav-links das"
              >Withdraw</NuxtLink
            >
            <NuxtLink to="/dashboard/earnings" class="dash-mainnav-links das"
              >Earnings</NuxtLink
            >
            <NuxtLink to="/dashboard/referrals" class="dash-mainnav-links das"
              >Referrals</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },

    loadScript() {
      if (!process.server) {
        let el = document.getElementById("translate");

        if (el != undefined) {
          document.body.removeChild(el);
        }

        const scriptTranslate = document.createElement("script");

        scriptTranslate.type = "text/javascript";

        scriptTranslate.src =
          "https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=light&autoMode=false";
        scriptTranslate.async = true;

        scriptTranslate.id = "translate";
        const app = document.querySelector("#nav");
        if (app) {
          app.appendChild(scriptTranslate);
        } else {
          console.error("Could not find app node to append script element");
        }
      }
    },

    loadScript1() {
      if (!process.server) {
        let el3 = document.getElementById("das");

        if (el3 != undefined) {
          document.body.removeChild(el3);
        }

        const script = document.createElement("script");

        script.type = "text/javascript";

        script.src = "/script/dashboard.js";
        script.async = true;

        script.id = "das";
        const app = document.querySelector("#nav");
        if (app) {
          app.appendChild(script);
        } else {
          console.error("Could not find app node to append script element");
        }
      }
    },
  },

  mounted() {
    this.loadScript();
    this.loadScript1();
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
.router-link-active.router-link-exact-active.das {
  color: white;
  border-bottom: 2px solid #fff;
  font-size: 16px;
}

.das-menu.abs {
  background-color: rgba(200, 200, 200, 0.1);
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
