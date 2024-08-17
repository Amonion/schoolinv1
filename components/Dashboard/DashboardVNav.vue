<template>
  <div
    @click.self="toggleNav"
    class="dashboard-v-nav"
    :class="{ active: navState }"
  >
    <div class="nav_inn">
      <nuxt-link to="/" class="dashboard-brand w-inline-block"
        ><img src="/Logo.png" loading="lazy" alt="" /></nuxt-link
      ><nuxt-link
        to="/dashboard"
        class="each-nav-item w-inline-block"
        :class="{ active: route == 'dashboard' }"
        ><img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65ab98c2b391d6db6a34649a_Dashboard.svg"
          loading="lazy"
          alt=""
          class="dash-vnav-icon"
        />
        <div>Prime</div></nuxt-link
      ><nuxt-link
        to="/dashboard/profile"
        class="each-nav-item w-inline-block"
        :class="{ active: route == 'dashboard-profile' }"
        ><img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65ab9cd4becdc4e575cb2489_Person.svg"
          loading="lazy"
          alt=""
          class="dash-vnav-icon"
        />
        <div>Profile</div></nuxt-link
      ><nuxt-link
        to="/dashboard/payments"
        class="each-nav-item w-inline-block"
        :class="{ active: route == 'dashboard-payments' }"
        ><img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65ab9e7281d0be4e021be09b_Payment.svg"
          loading="lazy"
          alt=""
          class="dash-vnav-icon"
        />
        <div>Payments</div></nuxt-link
      ><nuxt-link to="/" class="each-nav-item w-inline-block"
        ><img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65ab9e7287de502385abcc60_Report%20Card.svg"
          loading="lazy"
          alt=""
          class="dash-vnav-icon"
        />
        <div>Results</div></nuxt-link
      ><nuxt-link to="/" class="each-nav-item w-inline-block"
        ><img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65ab9cd4ae2374485a97ebac_Notifications.svg"
          loading="lazy"
          alt=""
          class="dash-vnav-icon"
        />
        <div>Notifications</div></nuxt-link
      ><nuxt-link to="/" class="each-nav-item w-inline-block"
        ><img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65ab9e72c0436e01dc64b371_ID%20Verified.svg"
          loading="lazy"
          alt=""
          class="dash-vnav-icon"
        />
        <div>CV Maker</div></nuxt-link
      ><nuxt-link
        to="/dashboard/settings"
        class="each-nav-item w-inline-block"
        :class="{ active: route == 'dashboard-settings' }"
        ><img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65ab9cd4a76a2cf028188e3f_Settings.svg"
          loading="lazy"
          alt=""
          class="dash-vnav-icon"
        />
        <div>Settings</div></nuxt-link
      ><span @click="logout" class="each-nav-item last w-inline-block"
        ><img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65ab9cd468ecdb6286d1a46d_Logout.svg"
          loading="lazy"
          alt=""
          class="dash-vnav-icon"
        />
        <div>Logout</div></span
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleNav() {
      this.$store.commit("dashboard/toggleNav");
    },
    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },
  },
  computed: {
    route() {
      return this.$store.state.dashboard.route;
    },

    navState() {
      return this.$store.state.dashboard.navState;
    },
  },
};
</script>

<style>
.dashboard-brand {
  margin-left: 20px;
}
</style>
