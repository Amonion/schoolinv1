<template>
  <div id="main-slide" class="dashprime-main-display">
    <div
      data-delay="7000"
      data-animation="fade"
      class="dashboard-main-slider w-slider"
      data-autoplay="true"
      data-easing="ease"
      data-hide-arrows="false"
      data-disable-swipe="false"
      data-autoplay-limit="0"
      data-nav-spacing="3"
      data-duration="1500"
      data-infinite="true"
    >
      <div class="dashboard-slider-mask w-slider-mask">
        <div
          v-for="item in blogs"
          :key="item.id"
          class="dashboard-main-slides w-slide"
        >
          <img
            :src="`${FILE_URL}/${item.image}`"
            loading="lazy"
            sizes="(max-width: 479px) 88vw, (max-width: 767px) 91vw, (max-width: 1279px) 69vw, 811.1111450195312px"
            :srcset="`
              ${FILE_URL}/${item.image} 500w,
              ${FILE_URL}/${item.image}      612w`"
            alt=""
            class="responsive-img"
          />
          <div class="slide-cover">
            <nuxt-link
              :to="`/dashboard/post-details/?id=${item.id}&display=${item.display}`"
              class="dashboard-slider-headline"
              style="font-size: 16px; line-height: 21px"
            >
              {{ item.title }}
            </nuxt-link>
            <div class="dashboard-slide-details">
              <div class="dashboard-headline-categories">
                <div>Education</div>
                <div class="dashboard-slide-dot">.</div>
                <div>Politics</div>
              </div>
              <news-details :comment="item" />
            </div>
          </div>
        </div>
      </div>
      <div class="left-arrow w-slider-arrow-left">
        <div class="w-icon-slider-left"></div>
      </div>
      <div class="right-arrow w-slider-arrow-right">
        <div class="w-icon-slider-right"></div>
      </div>
      <div class="slide-nav w-slider-nav w-round"></div>
    </div>
  </div>
</template>

<script>
import NewsDetails from "./NewsDetails.vue";
export default {
  components: { NewsDetails },
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

          script.src = "/script/dashboard.js";

          script.id = "script";
          const app = document.querySelector("#main-slide");
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
        if (this.blogs.length > 0) {
          this.loadScript();
          this.active = true;
        }
      }
    }, 1000);
  },

  computed: {
    blogs() {
      return this.$store.state.dashboard.blogs;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
