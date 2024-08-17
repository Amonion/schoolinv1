<template>
  <div class="admin-wrapper home">
    <admin-navigation />
    <div class="admin-main-wrapper">
      <div class="admin-header w-form">
        <div class="admin-flex-header">
          <div class="admin-container no-marg">
            <div class="admin-flex-header inner">
              <div class="visitors-holder">
                <div class="top-icon-wrapper left" @click="toggleNavBar">
                  <img
                    src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b63e3013607f025da5fa3_hamburger-menu-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="top-icons"
                  />
                </div>
                <img
                  src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656af59df13fc418306da738_business-team-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="top-icons big"
                />
                <div>
                  <div class="admin-subtitle">Visitors</div>
                  <div class="admin-subtitle color">128</div>
                </div>
              </div>
              <div class="top-right-flex">
                <div class="admin-top-search-wrapper">
                  <img
                    src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656adbcd94bb4d7d86401f6b_search.svg"
                    loading="lazy"
                    width="20"
                    alt=""
                  /><input
                    type="text"
                    class="admin-top-search w-input"
                    maxlength="256"
                    placeholder="Search User"
                  />
                  <ul role="list" class="admin-top-list hide">
                    <li class="top-list-item">
                      <a href="#" class="admin-top-list-link w-inline-block"
                        ><img
                          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656adf8cfc9ae6eba24e710f_user-1.svg"
                          loading="lazy"
                          alt=""
                          class="list-user-icon"
                        />
                        <div>Mathew321</div></a
                      >
                    </li>
                    <li class="top-list-item">
                      <a href="#" class="admin-top-list-link w-inline-block"
                        ><img
                          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656adf8cfc9ae6eba24e710f_user-1.svg"
                          loading="lazy"
                          alt=""
                          class="list-user-icon"
                        />
                        <div>Mathew321</div></a
                      >
                    </li>
                    <li class="top-list-item">
                      <a href="#" class="admin-top-list-link w-inline-block"
                        ><img
                          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656adf8cfc9ae6eba24e710f_user-1.svg"
                          loading="lazy"
                          alt=""
                          class="list-user-icon"
                        />
                        <div>Mathew321</div></a
                      >
                    </li>
                    <li class="top-list-item">
                      <a href="#" class="admin-top-list-link w-inline-block"
                        ><img
                          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656adf8cfc9ae6eba24e710f_user-1.svg"
                          loading="lazy"
                          alt=""
                          class="list-user-icon"
                        />
                        <div>Mathew321</div></a
                      >
                    </li>
                  </ul>
                </div>
                <div class="top-icons-wrapper">
                  <NuxtLink to="/" class="top-icon-wrapper w-inline-block"
                    ><img
                      src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b1e1a077bb0b2c708679f_house%201.svg"
                      loading="lazy"
                      alt=""
                      class="top-icons"
                  /></NuxtLink>
                  <NuxtLink
                    to="/admin/notification"
                    class="top-icon-wrapper w-inline-block"
                    ><div v-if="isNotification" class="dot"></div>
                    <img
                      src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656af1eed7e9959fd5f88392_notification-bell-icon%202.svg"
                      loading="lazy"
                      alt=""
                      class="top-icons" /></NuxtLink
                  ><NuxtLink
                    to="/admin/set-application"
                    class="top-icon-wrapper w-inline-block"
                    ><img
                      src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656af1eee57ba7b7689a2603_setting-line-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="top-icons"
                  /></NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="admin-main-body">
        <Nuxt />

        <div class="admin-footer">
          <div>
            Developed By
            <a href="#" class="admin-amonion-link">AmonionPrime</a>
          </div>
        </div>
      </div>
    </div>
    <admin-modal />
  </div>
</template>

<script>
import AdminModal from "../components/AdminModal";
export default {
  components: { AdminModal },

  head() {
    return {
      title: "Schoolin Prime Admin", // Set the page title

      link: [{ rel: "stylesheet", href: "/css/admin.css" }],
    };
  },

  methods: {
    toggleNavBar() {
      this.$store.commit("admin/toggleNavBar");
    },
  },

  async mounted() {
    this.$store.commit("admin/SET_URL", this.$config.FILE_URL);

    await this.$store.dispatch("admin/initializeAdminDetails", this.user);
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    company() {
      return this.$store.state.admin.company;
    },

    isNotification() {
      return this.$store.state.admin.isNotification;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style>
.admin-tl-time1 {
  display: flex;
}

.suspended {
  color: rgb(187, 0, 0);
}
</style>
