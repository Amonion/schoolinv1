<template>
  <div>
    <dashboard-navigation />
    <div class="dash-body">
      <div class="dash-container">
        <div class="dash-bodyflex">
          <dashboard-aside />
          <div class="dash-body-right">
            <div class="dash-total-balance">
              <div class="dash-balance-header top">
                <div class="dash-pane-title">Earnings</div>
              </div>
              <div v-if="earningLength > 0" class="das-tb-scroll">
                <div class="das-tb-istory earnin">
                  <div class="dash-trans-table">
                    <div class="das-sn"><div>S/N</div></div>
                    <div class="das-td20"><div>Wallet</div></div>
                    <div class="das-td20"><div>Currency</div></div>
                    <div class="das-td20"><div>Amount</div></div>
                    <div class="das-td20"><div>Time</div></div>
                  </div>
                  <div
                    v-for="(item, int) in earnings"
                    :key="int"
                    class="dash-trans-table body"
                    :class="{ even: int % 2 == 0 }"
                  >
                    <div class="das-sn">
                      <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
                    </div>
                    <div class="das-td20">
                      <div>{{ item.walletName }}</div>
                    </div>
                    <div class="das-td20">
                      <img
                        :src="`${FILE_URL}/${item.image}`"
                        loading="lazy"
                        alt=""
                        class="dash-wallet-coin"
                      />
                    </div>
                    <div class="das-td20">
                      <div>${{ numberWithCommas(item.earning) }}</div>
                    </div>
                    <div class="das-td20 time">
                      <div>
                        {{ formatTimeToAMPM(item.time) }}<br />{{
                          formatDate(item.time)
                        }}
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
                      v-for="(item, int) in getPages(earningLength, limit)"
                      :key="int"
                    >
                      {{ int + 1 }}
                    </div>

                    <img
                      v-if="currentPage < getPages(earningLength, limit)"
                      src="/images/dashboard/arrow-right.svg"
                      loading="lazy"
                      alt=""
                      class="das-painate-arrow"
                      @click="pagination(currentPage + 1)"
                    />
                  </div>
                </div>
              </div>
              <h1 v-else class="dash-nothing">SORRY, NO EARNINGS YET</h1>
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
      address: "",
      currentPage: 1,
      limit: 10,
    };
  },
  methods: {
    pagination(int) {
      currentPage.value = int;
      getEarnings();
    },

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    formatDate(time = new Date().getTime()) {
      const today = new Date(time);
      const day = today.getDate();
      const month = today.toLocaleString("default", { month: "short" });
      const year = today.getFullYear();

      // Function to add ordinal suffix to the day
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

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(i);
      }
      return pages.length;
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

    async getEarnings() {
      const result = await this.$store.dispatch(
        "dashboard/getEearnings",
        `/notifications/?limit=10&page=1&sort=-time&username=${this.user.username}`
      );
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    earnings() {
      return this.$store.state.dashboard.earnings;
    },
    earningLength() {
      return this.$store.state.dashboard.earningLength;
    },
    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
