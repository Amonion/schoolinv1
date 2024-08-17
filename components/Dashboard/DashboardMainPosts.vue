<template>
  <div
    class="displayed-posts"
    style="
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      overflow-x: auto;
    "
  >
    <div
      v-for="item in blogs"
      :key="item.id"
      class="dashprime-main-display gridPost"
      style="background: transparent; margin-right: 10px"
    >
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
          <div class="dashboard-main-slides w-slide">
            <img
              :src="`${FILE_URL}/${item.image}`"
              loading="lazy"
              sizes="(max-width: 479px) 88vw, (max-width: 767px) 91vw, (max-width: 1279px) 69vw, 811.1111450195312px"
              :srcset="`
                ${FILE_URL}/${item.image} 500w,
                ${FILE_URL}/${item.image}       612w`"
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
              <div style="flex-wrap: wrap" class="dashboard-slide-details">
                <div class="dashboard-headline-categories">
                  <div>Education</div>
                  <div class="dashboard-slide-dot">.</div>
                  <div>Politics</div>
                </div>
                <news-details
                  :comment="item"
                  style="width: 100%; margin-top: 10px"
                />
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
  </div>
</template>

<script>
import NewsDetails from "./NewsDetails.vue";
export default {
  components: { NewsDetails },
  methods: {
    details(id) {
      this.$router.push(`/dashboard/post-details/?id=${id}`);
    },
  },
  computed: {
    blogs() {
      return this.$store.state.dashboard.gridBlogs;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style>
.displayed-posts {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dashprime-main-display.gridPost {
  padding: 0;
  width: 23%;
  min-width: 200px;
  margin-right: 10px;
}

@media screen and (max-width: 479px) {
  .dashboard-main-slides {
    height: 50vh;
  }
}
</style>
