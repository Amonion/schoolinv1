<template>
  <div id="hero-slide" class="ero-section">
    <div class="ome-container">
      <div class="ero-flex">
        <h1 class="eadin1">
          Schoolin Prime, Simplified Payments,<br />Seamless Transactions
        </h1>
        <div class="ome-text intro">
          Say goodbye to long queues and paperwork. With our online payment
          system, students can easily manage their school fees, clearance fees,
          and other expenses from the comfort of their homes.
        </div>
        <NuxtLink to="/signup" class="ome-btn w-inline-block"
          ><div>Get Started</div></NuxtLink
        >
        <div
          data-delay="6000"
          data-animation="slide"
          class="hero-slide w-slider"
          data-autoplay="true"
          data-easing="ease-in-out-cubic"
          data-hide-arrows="false"
          data-disable-swipe="false"
          data-autoplay-limit="0"
          data-nav-spacing="3"
          data-duration="1500"
          data-infinite="true"
        >
          <div class="hero-slid-mask w-slider-mask">
            <div
              v-for="item in banners"
              :key="item.id"
              class="hero-slides w-slide"
            >
              <img
                :src="`${FILE_URL}/${item.bannerImage}`"
                loading="lazy"
                sizes="(max-width: 479px) 96vw, (max-width: 767px) 95vw, 700.0000610351562px"
                :srcset="`
                  ${FILE_URL}/${item.bannerImage},
                  ${FILE_URL}/${item.bannerImage}       800w`"
                alt=""
                class="cover-im"
              />
              <div class="ero-cover">
                <span class="ero-link">{{ item.bannerTitle }} </span>
              </div>
            </div>
          </div>
          <div class="left-arrow w-slider-arrow-left">
            <div class="w-icon-slider-left"></div>
          </div>
          <div class="right-arrow w-slider-arrow-right">
            <div class="w-icon-slider-right"></div>
          </div>
          <div class="w-slider-nav w-round"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    };
  },
  methods: {
    loadScript() {
      if (!process.server) {
        let el1 = document.getElementById("script");

        if (el1 == null) {
          const script = document.createElement("script");

          script.type = "text/javascript";

          script.src = "/script/home.js";

          script.id = "script";
          const app = document.querySelector("#hero-slide");
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
    setInterval(() => {
      if (!this.active) {
        if (this.totalLength > 0) {
          this.loadScript();
          this.active = true;
        }
      }
    }, 1000);
  },

  computed: {
    totalLength() {
      return this.$store.state.bannerLength;
    },

    banners() {
      const result = this.$store.state.banners;
      const banners = [];
      result.forEach((el) => {
        if (el.bannerCategory == "Home") {
          banners.push(el);
        }
      });
      return banners;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style></style>
