<template>
  <div>
    <dashboard-main-news />
    <!-- <dashboard-polls /> -->
    <dashboard-main-posts />
    <div style="display: flex; width: 100%; justify-content: center">
      <nuxt-link to="/dashboard/posts" class="dash-load-more"
        >View More...</nuxt-link
      >
    </div>

    <each-posts v-for="post in posts" :key="post.id" :post="post" />

    <div class="dash-load-more">Load More...</div>
    <div class="dash-loading-more">
      <div class="dash-upload-holder">
        <input
          class="input-hidden w-input"
          maxlength="256"
          name="field-2"
          data-name="Field 2"
          placeholder="Example Text"
          type="text"
          id="field-2"
          required=""
        /><img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adcbcdd6e8611d02fd2423_loader-line-icon%201.svg"
          loading="lazy"
          alt=""
          class="dash-uploadicon"
        />
        <div>Processing</div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardMainNews from "../../components/Dashboard/DashboardMainNews.vue";
import DashboardMainPosts from "../../components/Dashboard/DashboardMainPosts.vue";
import DashboardPolls from "../../components/Dashboard/DashboardPolls.vue";
import EachPosts from "../../components/Dashboard/EachPosts.vue";
export default {
  components: {
    DashboardPolls,
    DashboardMainPosts,
    DashboardMainNews,
    EachPosts,
  },
  layout: "dashboard",

  data() {
    return {
      currentPage: 1,
      limit: 10,
      transactionTypes: ["All", "Withdrawal", "Deposit", "Top"],
      showTransactions: false,
      selectedType: "Select Transaction",

      activeDeposit: 0,
      totalDeposit: 0,
      totalWithdrawal: 0,
      pendingDeposit: 0,
      pendingWithdrawal: 0,
    };
  },

  methods: {
    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    copyRefLink() {
      const inputElement = document.getElementById("refs");
      inputElement.select();
      document.execCommand("copy");
      // window.getSelection().removeAllRanges();
    },

    async selectTransaction(item) {
      this.selectedType = item;
      this.showTransactions = false;
      let type;
      if (item == "All") {
        type = ``;
      } else {
        type = `transactionType=${item}`;
      }

      await this.$store.dispatch(
        "dashboard/getTransactions",
        `/transactions/?${type}&username=${this.user.username}&limit=${this.limit}&page=${this.currentPage}`
      );
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

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(i);
      }
      return pages.length;
    },
  },

  mounted() {
    const payload = {
      type: "posts",
      id: 0,
    };
    this.$store.commit("dashboard/setInput", payload);
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    posts() {
      return this.$store.state.dashboard.posts;
    },

    company() {
      return this.$store.state.dashboard.company;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
