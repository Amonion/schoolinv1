<script>
import HomeLoading from "../components/Home/HomeLoading.vue";
import HomeNavigation from "../components/Home/HomeNavigation.vue";
export default {
  components: { HomeNavigation, HomeLoading },
  head() {
    return {
      link: [
        { rel: "stylesheet", href: "/css/home.css" },
        { rel: "stylesheet", href: "/css/custom-home.css" },
      ],
    };
  },

  async mounted() {
    if (this.$route.query.ref) {
      localStorage.setItem("referral", this.$route.query.ref);
    }
    this.$store.commit("SET_URL", this.$config.FILE_URL);
    await this.$store.dispatch("initializeDetails");
  },

  computed: {
    hasLoaded() {
      return this.$store.state.hasLoaded;
    },
  },
};
</script>
<template>
  <div>
    <div v-if="hasLoaded" class="home-page ome">
      <div class="ome-curve"></div>
      <home-navigation />
      <Nuxt />
      <home-footer />
    </div>
    <home-loading v-else />
  </div>
</template>

<style>
.loading-dots {
  display: flex;
  justify-content: space-between;
  width: 100px; /* Adjust as needed */
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #1c40ca; /* Adjust dot color */
  border-radius: 50%;
  animation: pulse 1.5s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

.dot:nth-child(4) {
  animation-delay: 0.6s;
}

.dot:nth-child(5) {
  animation-delay: 0.8s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.eac-second-services {
  transition: 0.3s all;
}

.home-loading {
  height: 100vh;
  position: fixed;
  background: white;
  width: 100%;
  z-index: 999999;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.home-loading img {
  width: 200px;
  margin-bottom: 50px;
  animation: loadImg 1s infinite alternate ease-in-out;
}

.ome-btn.w-button {
  display: flex;
  align-items: center;
}

.ome-btn.w-button img {
  margin-left: 10px;
}

.ome-btn.w-button span {
  margin-right: 10px;
}

.service-icon-older {
  overflow: hidden;
}

.service-icon-older img {
  width: 30px;
}

.spinner {
  width: 20px;
  animation: spin 1.5s linear infinite;
}

.stats-number {
  font-size: 20px;
  text-align: center;
}

@keyframes loadImg {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
