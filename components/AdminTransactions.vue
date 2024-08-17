<template>
  <div v-if="totalLength > 0" class="admin-plan-form w-form">
    <div class="admin-users-tb-wrapper">
      <div class="admin-users-scroll">
        <div v-if="transactions.length > 0" class="admin-users-tbs his">
          <div class="admin-home-table-head pad">
            <div class="admin-tl-sn2"><div>S/N</div></div>
            <div class="admin-tl-email1 active">
              <div>Username</div>
            </div>
            <div class="admin-tl-name1 active"><div>Symbol</div></div>
            <div class="admin-tl-time1 active"><div>Amount</div></div>
            <div class="admin-tl-time1"><div>Type</div></div>
            <div class="admin-tl-time1"><div>Plan</div></div>
            <div class="admin-tl-time1"><div>Time</div></div>
          </div>
          <div
            v-for="(item, int) in transactions"
            :key="int"
            class="admin-home-table-body"
            :class="{ even: int % 2 == 0 }"
          >
            <div class="admin-tl-sn2">
              <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
            </div>
            <div class="admin-tl-email1 active">
              <div>{{ item.username }}</div>
            </div>
            <div class="admin-tl-name1 active">
              <img
                :src="`${FILE_URL}/uploads/${item.image}`"
                loading="lazy"
                alt=""
                class="admin-tb-wallet"
              />
            </div>
            <div class="admin-tl-time1 active">
              <div>${{ item.amount.toLocaleString("en-US") }}</div>
            </div>
            <div class="admin-tl-time1">
              <div>{{ item.transactionType }}</div>
            </div>
            <div class="admin-tl-time1">
              <div v-if="item.planName">{{ item.planName }}</div>
              <div v-else>Not Available</div>
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
        <div class="admin-pagination-items total">Total: {{ totalLength }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",

  data() {
    return {
      transactions: [],
      totalLength: 0,
      limit: 10,
      currentPage: 1,
      sort: "-time",
      pages: [],
    };
  },

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

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
    },

    async getTransactions() {
      const result = await this.$store.dispatch(
        "admin/makeGET",
        `/transactions/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}&username=${this.$route.query.username}`
      );
      this.transactions = result.data.data;
      this.totalLength = result.data.totalLength;
    },

    paginate(int) {
      this.currentPage = int;
      this.getTransactions();
    },

    formatDateToTime(date) {
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    async processData() {
      const form = {
        wallets: this.wallets,
        user: this.user,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      this.onRequest = true;

      const payload = {
        form: form,
        url: `/users/update-user/?id=${this.user.id}`,
      };

      const result = await this.$store.dispatch("admin/makePOST", payload);

      if (result) {
        this.onRequest = false;
      }
      const payload1 = {
        msg: result.data.message,
        isWarning: false,
        isError: result.data.error,
        isSuccess: !result.data.error,
        table: "",
        action: "",
        url: ``,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload1);

      if (!result.data.error) {
        this.$store.dispatch(`admin/initializeAdminDetails`);
      }
    },
  },

  async mounted() {
    this.getTransactions();
  },

  computed: {
    isUserAvailable() {
      return storeState.user.length > 0;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>
<style></style>
