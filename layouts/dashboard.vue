<template>
  <div class="dashboard" style="background: #f3f2f8; min-height: 100vh">
    <dashboard-header />
    <div class="dashboard-container" style="padding-top: 20px">
      <div
        class="dashboard-wrapper"
        style="min-height: 200vh; align-items: flex-start; display: flex"
      >
        <dashboard-v-nav style="position: sticky; top: 20px" />
        <div class="dash-main">
          <dashboard-modal />

          <dashboard-comment-box />
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCommentBox from "../components/Dashboard/DashboardCommentBox.vue";
import DashboardHeader from "../components/Dashboard/DashboardHeader.vue";
import DashboardModal from "../components/Dashboard/DashboardModal.vue";
import DashboardVNav from "../components/Dashboard/DashboardVNav.vue";
export default {
  components: {
    DashboardHeader,
    DashboardVNav,
    DashboardModal,
    DashboardCommentBox,
  },
  head() {
    return {
      title: "Schoolin ", // Set the page title
      link: [
        { rel: "stylesheet", href: "/css/dashboard.css" },
        { rel: "stylesheet", href: "/css/custom-home.css" },
      ],
    };
  },
  async mounted() {
    if (this.$route.query.ref) {
      localStorage.setItem("referral", this.$route.query.ref);
    }
    this.$store.commit("dashboard/SET_URL", this.$config.FILE_URL);
    await this.$store.dispatch("dashboard/initializeUserDetails", this.user);
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    inputState() {
      return this.$store.state.dashboard.inputState;
    },
  },
};
</script>

<style>
.dashboard-main-flex.home {
  /* font-family: "Poppins", sans-serif; */
  font-family: "Open Sans", sans-serif;
  background: #f3f2f8;
}

.dash-custom-drop.active {
  top: 45px;
}
.dash-custom-drop {
  z-index: 1000;
}

.dash-custom-select {
  z-index: auto;
}

.dash-custom-selecthead.location {
  width: 100%;
}

.dashboard-middle-header {
  height: auto;
}

.dashboard-v-nav {
  transition: 0.3s all;
}

.dashboard-container {
  max-width: 1200px;
}

.dash-profile-bg {
  width: 100%;
}

.dash-profile-img.pass {
  position: relative;
}

.dash-profile-img,
.dash-aside-headerpix.prof {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1c40ca;
}

.dash-profile-location {
  margin-top: 5px;
}

.dashprime-main-display a {
  text-decoration: none;
}

.display-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background-image: linear-gradient(
    to top,
    rgba(9, 17, 49, 0.63),
    rgba(255, 255, 255, 0)
  );
}

.each-nav-item {
  cursor: pointer;
}

.ero-play {
  text-decoration: none;
}

input.hide {
  opacity: 0;
  height: 0.1px;
  width: 0.1px;
  overflow: hidden;
  z-index: -1;
}
.label-input {
  cursor: pointer;
  display: inline;
  width: 45px;
}

.label-input.abs {
  position: absolute;
  right: 0;
  bottom: 0;
  width: auto;
}

.loading {
  width: 100%;
  padding: 50px;
  display: flex;
  justify-content: center;
  background: white;
  min-height: 100;
  height: 100%;
}

.nav-links.nuxt-link-exact-active.nuxt-link-active {
  color: #1c40ca;
}

.nav-links.nuxt-link-exact-active.nuxt-link-active.white {
  color: white;
}

.response-text {
  color: #1c40ca;
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
}

.response-text.error {
  color: red;
}

.spinner {
  width: 30px;
  animation: spin 1.5s linear infinite;
}

.dash-spinner.spinner {
  width: 20px;
}

.passport {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding-top: 30px;
}

.veri {
  font-size: 12px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 767px) {
  .dashboard-container {
    padding-left: 10px;
    padding-right: 10px;
  }

  .dashboard-middle-header {
    padding: 5px 0;
    height: auto;
  }
}

@media screen and (max-width: 479px) {
  .w-layout-grid.form {
    grid-template-columns: 1fr;
  }

  .dash-aside-headerpix.prof {
    display: none;
  }
}
</style>
