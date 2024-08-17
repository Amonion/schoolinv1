<template>
  <div class="eac-events">
    <div class="compete-im">
      <img
        :src="`${FILE_URL}/${item.image}`"
        loading="lazy"
        sizes="(max-width: 479px) 100vw, (max-width: 767px) 95vw, 200.00001525878906px"
        :srcset="`
                  ${FILE_URL}/${item.image}   500w,
                  ${FILE_URL}/${item.image}   800w,
                  ${FILE_URL}/${item.image} 1080w,
                  ${FILE_URL}/${item.image}        1200w
                `"
        alt=""
        class="cover-im"
      />
    </div>
    <div class="compete-topic">
      <div class="compete-info-left">
        <div class="compete-price">
          <div class="comepete-course">{{ item.course }}</div>
          <div class="compete-topics no">N{{ formatNumber(item.price) }}</div>
        </div>
        <div class="compete-topics">
          {{ item.title }}
        </div>
        <div class="compete-flex">
          <nuxt-link
            :to="`/dashboard/competition-details/?id=${item.id}`"
            class="compete-link"
            >Join Now</nuxt-link
          >
          <div class="count-down">
            {{ days }}<span class="time">d</span> {{ hours
            }}<span class="time">h</span> : {{ minutes
            }}<span class="time">m</span> : {{ seconds
            }}<span class="time">s</span>
          </div>
        </div>
      </div>
      <div class="w-layout-grid compete-rid">
        <div class="compete-rid-flex">
          <div class="compete-icon-older">
            <img
              src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ad5045bddf78fa195d7d5_graduation-cap-icon%201.svg"
              loading="lazy"
              alt=""
              class="compete-rid-icon"
            />
          </div>
          <div class="compete-eadin">Schools</div>
          <div class="compete-value">{{ formatNumber(item.shcools) }}</div>
        </div>
        <div class="compete-rid-flex">
          <div class="compete-icon-older">
            <img
              src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ad4eb9aed817e600ee492_people-fill%201.svg"
              loading="lazy"
              alt=""
              class="compete-rid-icon"
            />
          </div>
          <div class="compete-eadin">Students</div>
          <div class="compete-value">{{ formatNumber(item.students) }}</div>
        </div>
        <div class="compete-rid-flex">
          <div class="compete-icon-older">
            <img
              src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ab32a00518a27e2a3a523_book%201.svg"
              loading="lazy"
              alt=""
              class="compete-rid-icon"
            />
          </div>
          <div class="compete-eadin">Questions</div>
          <div class="compete-value">{{ formatNumber(item.questions) }}</div>
        </div>
      </div>
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
      seconds: "",
      minutes: "",
      hours: "",
      days: "",
    };
  },

  methods: {
    formatNumber(number) {
      if (isNaN(number)) {
        return 0;
      }
      return number.toLocaleString("en-US");
    },

    getTimeRemaining(time) {
      const total = Date.parse(new Date(time)) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    },

    updateClock(time) {
      const t = this.getTimeRemaining(time);
    },

    initializeClock(time) {
      setInterval(() => {
        this.updateClock(time);
      }, 1000);
    },
  },

  mounted() {
    this.initializeClock(this.item.restarting * 1);
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style>
.compete-topic {
  justify-content: space-between;
}
</style>
