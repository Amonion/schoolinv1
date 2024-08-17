<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Active Deposits
        <span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs active">
            <div class="admin-home-table-head pad">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-time1">
                <div>Username</div>
              </div>
              <div class="admin-tl-name1 active"><div>Currency</div></div>
              <div class="admin-tl-time1 active"><div>Amount</div></div>
              <div class="admin-tl-time1"><div>Plan</div></div>
              <div class="admin-tl-time1"><div>Remaining</div></div>
              <div class="admin-tl-time1"><div>Earnings</div></div>
              <div class="admin-tl-time1"><div>Time</div></div>
            </div>
            <div
              v-for="(item, int) in activeDeposits"
              :key="int"
              class="admin-home-table-body"
              :class="{ even: int % 2 == 0 }"
            >
              <div class="admin-tl-sn2">
                <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.username }}</div>
              </div>
              <div class="admin-tl-name1 active">
                <div>{{ item.walletName }}</div>
              </div>
              <div class="admin-tl-time1 active">
                <div>${{ item.amount.toLocaleString("en-US") }}</div>
              </div>

              <div class="admin-tl-time1">
                <div>{{ item.planName }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.daysRemaining }} Days</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.earnings }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>
                  {{ formatDateToTime(item.time) }}<br />{{
                    formatNumberToDate(item.time)
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="admin-pagination">
          <img
            v-if="currentPage > 1"
            src="/images/admin/page-arrow-left-blue.svg"
            loading="lazy"
            alt=""
            class="admin-page-arrow l"
            @click="paginate(currentPage - 1)"
          />
          <div
            v-for="(item, int) in getPages(totalLength, limit)"
            :key="int"
            class="admin-pagination-items"
            @click="paginate(int + 1)"
            :class="{ active: int + 1 == currentPage }"
          >
            {{ int + 1 }}
          </div>
          <img
            v-if="currentPage < getPages(totalLength, limit).length"
            src="/images/admin/page-arrow-right-blue.svg"
            loading="lazy"
            alt=""
            class="admin-page-arrow r"
            @click="paginate(currentPage + 1)"
          />
          <div class="admin-pagination-items total">
            Total: {{ totalLength }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",

  data() {
    return {
      limit: 10,
      currentPage: 1,
    };
  },
  methods: {
    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
    },

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

    paginate(int) {
      this.currentPage = int;
      this.$store.dispatch(
        "admin/getEmails",
        `/emails/?limit=${this.limit}&page=${this.currentPage}`
      );
    },

    formatDateToTime(date) {
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    formatDate() {
      const today = new Date();
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
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    isSuccess() {
      return this.$store.state.admin.isModalSuccess;
    },

    isWarning() {
      return this.$store.state.admin.isModalWarning;
    },

    isError() {
      return this.$store.state.admin.isModalError;
    },

    totalLength() {
      return this.$store.state.admin.activeDepositLength;
    },

    activeDeposits() {
      return this.$store.state.admin.activeDeposits;
    },

    url() {
      return this.$store.state.admin.modalURL;
    },

    responseMsg() {
      return this.$store.state.admin.modalMsg;
    },

    showModal() {
      return this.$store.state.admin.showModal;
    },
  },
};
</script>

<style></style>
