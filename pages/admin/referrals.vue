<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Referrals<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs ref">
            <div class="admin-home-table-head pad">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-time1">
                <div>Username</div>
              </div>
              <div class="admin-tl-time1">
                <div>Type</div>
              </div>
              <div class="admin-tl-time1">
                <div>Referral</div>
              </div>
              <div class="admin-tl-time1">
                <div>Amount</div>
              </div>
              <div class="admin-tl-time1">
                <div>Wallet Name</div>
              </div>
              <div class="admin-tl-time1">
                <div>Bonus</div>
              </div>
              <div class="admin-tl-time1 banner"><div>Date</div></div>
              <div class="admin-tl-time1">
                <div>Action</div>
              </div>
            </div>
            <div
              v-for="(item, int) in referrals"
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
              <div class="admin-tl-time1">
                <div>{{ item.referralType }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.referralUsername }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>${{ numberWithCommas(item.amount) }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.walletName }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>${{ numberWithCommas(item.commission) }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>
                  {{ formatDateToTime(item.time) }} <br />{{
                    formatDate(item.time)
                  }}
                </div>
              </div>
              <div class="admin-tl-time1" @click="prepareDelete(item.id)">
                <img
                  src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bcbb9998532066acd920d_trash-bin-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="admin-tb-action-icon"
                />
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
      sort: "-time",
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

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
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

    formatDateToTime(date) {
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    paginate(int) {
      this.currentPage = int;
      this.$store.dispatch(
        "admin/getReferrals",
        `/referrals/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    prepareDelete(id) {
      const payload = {
        msg: `Are you sure you want to delete this Referral?`,
        isWarning: true,
        isError: false,
        isSuccess: false,
        table: "referrals",
        action: "delete",
        url: `/referrals/?id=${id}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload);
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

    referrals() {
      return this.$store.state.admin.referrals;
    },

    totalLength() {
      return this.$store.state.admin.referralLength;
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

<style>
.filt {
  bottom: 40px;
}
</style>
