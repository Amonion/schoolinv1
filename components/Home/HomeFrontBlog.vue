<template>
  <div
    id="w-node-_85477d6f-8e03-88ae-a2e5-80ede5041efd-e22bd156"
    class="eac-blo"
  >
    <div class="eac-blo-pix">
      <img
        @src="`${FILE_URL}/${item.image}`"
        loading="lazy"
        sizes="(max-width: 767px) 92vw, (max-width: 991px) 94vw, (max-width: 1279px) 90vw, 900.0000610351562px"
        :srcset="`
                    ${FILE_URL}/${item.image}   500w,
                    ${FILE_URL}/${item.image}   800w,
                    ${FILE_URL}/${item.image} 1080w,
                    ${FILE_URL}/${item.image}        1200w`"
        @alt="item.title"
        class="cover-im"
      />
    </div>
    <div class="blo-details">
      <div class="eac-blo-details">
        <img
          src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658b03d654e8303376376f80_person-fill%201.svg"
          loading="lazy"
          alt=""
          class="blo-icon"
        />
        <div>{{ item.author }}</div>
      </div>
      <div class="eac-blo-details">
        <img
          src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658b03d68630109395e7f870_clock-timing-icon%201.svg"
          loading="lazy"
          alt=""
          class="blo-icon"
        />
        <div>{{ time }}</div>
      </div>
      <div class="eac-blo-details">
        <img
          src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658b069380fccf87137cef78_chat-dots%201.svg"
          loading="lazy"
          alt=""
          class="blo-icon"
        />
        <div>{{ formatNumber(item.comments) }}</div>
      </div>
    </div>

    <nuxt-link
      :to="`/dashboard/post-details/?id=${item.id}`"
      class="section-eadin _2"
      >{{ item.title }}</nuxt-link
    >
    <div
      class="ot-blo-content _2"
      v-html="truncateText(item.content, 150)"
    ></div>
    <div class="spacer">
      <nuxt-link
        :to="`/dashboard/post-details/?id=${item.id}`"
        class="read-more active w-inline-block"
        ><div>Read More</div>
        <img
          src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ab3e2463e79c196a608a0_arrow-wite.svg"
          loading="lazy"
          alt=""
          class="read-more-icon"
      /></nuxt-link>
      <nuxt-link to="/dashboard" class="cateory">{{ item.category }}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      time: "",
    };
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    formatNumber(number) {
      if (isNaN(number)) {
        return 0;
      }
      return number.toLocaleString("en-US");
    },

    getTime(time) {
      const now = new Date();
      const postedTime = new Date(time);
      const diff = now.getTime() - postedTime.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30); // Approximation, not exact
      const years = Math.floor(days / 365);

      if (years > 0) {
        return years === 1 ? "1 year" : `${years} years`;
      } else if (months > 0) {
        return months === 1 ? "1 month" : `${months} months`;
      } else if (weeks > 0) {
        return weeks === 1 ? "1 week" : `${weeks} weeks`;
      } else if (days > 0) {
        return days === 1 ? "1 day" : `${days} days`;
      } else if (hours > 0) {
        return hours === 1 ? "1 hr" : `${hours} hrs`;
      } else if (minutes > 0) {
        return minutes === 1 ? "1 mins" : `${minutes} mins ago`;
      } else {
        return "now";
      }
    },

    updateClock(time) {
      const t = this.getTime(time);
      this.time = t;
    },

    initializeClock(time) {
      setInterval(() => {
        this.updateClock(time);
      }, 1000);
    },
  },
  mounted() {
    this.initializeClock(this.item.time * 1);
  },
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    payments() {
      return this.$store.state.payments;
    },

    tutorials() {
      return this.$store.state.tutorials;
    },

    blogs() {
      return this.$store.state.blogs;
    },

    competitions() {
      return this.$store.state.competitions;
    },

    competitors() {
      return this.$store.state.competitors;
    },
  },
};
</script>

<style>
.spacer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
