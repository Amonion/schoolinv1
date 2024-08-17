<template>
  <div class="testimonial">
    <div class="ome-container">
      <div class="section-eader">
        <div class="section-eadin-left">
          <div class="intro-section">Users Review</div>
          <div class="section-eadin">
            We have been tested and trusted by many and we'll keep improving.
          </div>
        </div>
        <div class="section-eadin-rit">
          You can make a review about our services by creating an account, login
          and go to settings, under visibility tab you can write about your
          experience about our service.
        </div>
      </div>
      <div class="w-layout-grid testimony-rid">
        <div v-for="item in reviews" :key="item.id" class="eac-testimony">
          <div class="testimony-pix">
            <img
              :src="`${FILE_URL}/${item.image}`"
              loading="lazy"
              alt=""
              class="cover-im"
            />
          </div>
          <NuxtLink
            :to="`/dashboard/user-profile/?id=${item.id}`"
            class="section-eadin _2 color"
            >{{ item.username }}</NuxtLink
          ><img
            src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658b0e6b4d57014ed650be45_quote%201.svg"
            loading="lazy"
            alt=""
            class="quote-icon"
          />
          <div class="ot-blo-content">
            {{ item.review }}
          </div>
          <div class="testimonial-footer">
            <NuxtLink
              :to="`/dashboard/school-details/?school=${item.schoolUsername}`"
              class="section-eadin _2"
              >{{ item.schoolUsername }}</NuxtLink
            >
            <div>{{ formatNumberToDate(item.time * 1) }}</div>
          </div>
        </div>
      </div>
      <home-subscribe />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    formatNumberToDate(inputNumber) {
      if (typeof inputNumber !== "number") {
        return "Not Available";
      }

      const date = new Date(inputNumber);

      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    },
  },
  computed: {
    reviews() {
      return this.$store.state.reviews;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style>
.swipe-page,
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  width: auto;
}
</style>
