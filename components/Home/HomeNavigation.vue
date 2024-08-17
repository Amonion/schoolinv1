<template>
  <div class="navbar" :class="{ active: isNavbarActive }">
    <div class="ome-container">
      <div class="nav-flex">
        <NuxtLink to="/" class="nav-brand w-inline-block"
          ><img
            src="/Logo.png"
            loading="lazy"
            width="130"
            alt=""
            class="nav-loo"
        /></NuxtLink>
        <img
          src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65e70e9db4c51bbad679b303_Menu.svg"
          loading="lazy"
          alt=""
          class="menu-ico"
          @click="toggleNavState"
        />
        <div class="nav-items" :class="{ active: navState }">
          <NuxtLink to="/" class="nav-links">Home</NuxtLink>
          <NuxtLink to="/services" class="nav-links">Services</NuxtLink>
          <NuxtLink to="/contact" class="nav-links">Contact</NuxtLink>
          <NuxtLink to="/faq" class="nav-links">FAQ</NuxtLink>
          <NuxtLink to="/blog" class="nav-links">Blog</NuxtLink>
          <!-- <div class="nav-links">
              <div class="mea-menu-ead">
                <div>Opportune</div>
                <img
                  src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658aa3a9dd7c62ee2cbebcbd_arrow-next-right-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="ome-dropdown"
                />
              </div>
              <div class="mea-menu ide">
                <NuxtLink to="/" class="mea-links">IT Centers</NuxtLink>
                ><NuxtLink to="/" class="mea-links">Scolarsips</NuxtLink>
                ><NuxtLink to="/" class="mea-links">Job Opportunities</NuxtLink>
              </div>
            </div> -->
          <span
            v-if="isAuthenticated"
            @click="goToDashboard"
            class="nav-links btn wite"
            >Dashboard</span
          >
          <NuxtLink v-else to="/login" class="nav-links btn wite"
            >Login</NuxtLink
          >
          <span v-if="isAuthenticated" @click="logout" class="nav-links btn"
            >Logout</span
          >
          <NuxtLink v-else to="/signup" class="nav-links btn white"
            >Sign Up</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavbarActive: false,
    };
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.scrollY;
      // Adjust the pixel value as per your requirement
      const scrollThreshold = 200;
      this.isNavbarActive = scrollPosition > scrollThreshold;
    },

    goToDashboard() {
      if (this.isAuthenticated) {
        if (this.user.status == "User") {
          // this.$router.push("/dashboard");
        } else if (this.user.status == "Staff") {
          this.$router.push("/admin");
        }
      }
    },

    toggleNavState() {
      this.$store.commit("toggleNavState");
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/");
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  computed: {
    navState() {
      return this.$store.state.navState;
    },

    user() {
      return this.$store.state.auth.user;
    },

    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style></style>
