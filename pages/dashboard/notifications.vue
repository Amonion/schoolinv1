<template>
  <div>
    <dashboard-navigation />
    <div class="dash-body">
      <div class="dash-container">
        <div class="dash-bodyflex">
          <dashboard-aside />

          <div class="dash-body-right">
            <div class="dash-total-balance profile">
              <div class="dash-balance-header top">
                <div class="dash-pane-title">Notification</div>
              </div>
              <div
                v-for="(item, int) in notifications"
                :key="int"
                class="das-eac-notice"
              >
                <img
                  src="/Logo.png"
                  loading="lazy"
                  width="123"
                  alt=""
                  class="das-notice-loo"
                />
                <div class="das-notice-wrapper">
                  <div class="das-notice-title">{{ item.title }}</div>
                  <div class="das-notice-text" v-html="item.content"></div>
                  <div class="das-notice-time">
                    {{ formatTimeToAMPM(item.time) }}
                    {{ formatDate(item.time) }}
                  </div>
                </div>
              </div>

              <div class="das-tb-paination">
                <img
                  v-if="currentPage > 1"
                  src="/images/dashboard/arrow-left.svg"
                  loading="lazy"
                  alt=""
                  class="das-painate-arrow"
                  @click="pagination(currentPage - 1)"
                />
                <div
                  @click="pagination(int + 1)"
                  class="das-painate"
                  :class="{ active: int + 1 == currentPage }"
                  v-for="(item, int) in getPages(totalLength, limit)"
                  :key="int"
                >
                  {{ int + 1 }}
                </div>

                <img
                  v-if="currentPage < getPages(totalLength, limit)"
                  src="/images/dashboard/arrow-right.svg"
                  loading="lazy"
                  alt=""
                  class="das-painate-arrow"
                  @click="pagination(currentPage + 1)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",

  data() {
    return {
      limit: 10,
      currentPage: 1,
    };
  },

  methods: {
    formatDate(time = new Date().getTime()) {
      const today = new Date(time);
      const day = today.getDate();
      const month = today.toLocaleString("default", { month: "short" });
      const year = today.getFullYear();

      const addOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return day + "th";
        } else {
          switch (day % 10) {
            case 1:
              return day + "st";
            case 2:
              return day + "nd";
            case 3:
              return day + "rd";
            default:
              return day + "th";
          }
        }
      };

      const formattedDate = `${addOrdinalSuffix(day)} ${month}, ${year}`;
      return formattedDate;
    },

    formatTimeToAMPM(time = new Date().getTime()) {
      if (typeof time !== "number") {
        return "Invalid timestamp";
      }

      const date = new Date(time);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
    },

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(i);
      }
      return pages.length;
    },

    pagination(int) {
      this.currentPage = int;
      this.getNotifications();
    },

    async getNotifications() {
      const result = await this.$store.dispatch(
        "dashboard/getNotifications",
        `/notifications/?limit=10&page=1&sort=-time&username=${this.user.username}`
      );
    },
  },

  computed: {
    user() {
      return this.$store.getters.getUserInfo;
    },

    company() {
      return this.$store.state.dashboard.company;
    },

    notifications() {
      return this.$store.state.dashboard.notifications;
    },

    totalLength() {
      return this.$store.state.dashboard.notificationLength;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
