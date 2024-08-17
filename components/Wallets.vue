<template>
  <div class="dash-total-balance">
    <div class="dash-balance-header top">
      <div class="dash-pane-title">Set Wallet</div>
    </div>
    <div class="w-form">
      <div class="w-layout-grid">
        <div v-for="(item, int) in wallets" :key="int">
          <label for="name-5">{{ item.walletName }}</label>
          <input
            v-if="walletId == item.id"
            type="text"
            class="das-profile-input w-input"
            maxlength="256"
            v-model="item.walletAddress"
            placeholder="Enter Wallet Address"
            autofocus
          />
          <input
            v-else
            type="text"
            class="das-profile-input w-input"
            maxlength="256"
            v-model="item.walletAddress"
            placeholder="Enter Wallet Address"
          />
        </div>
      </div>
      <span class="das-select-plan" @click="processData">Submit</span>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",

  data() {
    return {
      onRequest: false,
      walletId: "",
    };
  },
  methods: {
    async handleResponse(result) {
      this.onRequest = false;

      if (result.response == undefined) {
        this.showModal(result.data.message, false, true);
        await this.$store.dispatch(
          "dashboard/initializeUserDetails",
          this.user
        );
      } else {
        this.showModal(result.response.data.message, false, true);
      }
    },

    showModal(msg, warning, error) {
      const payload = {
        msg: msg,
        warning: warning,
        error: error,
      };
      this.$store.commit("dashboard/showModal", payload);
    },

    async processData() {
      const form = { wallets: this.wallets };
      const payload = {
        form: form,
        url: `/users/update-user/?id=${this.user.id}`,
      };

      const result = await this.$store.dispatch("dashboard/makePOST", payload);
      this.handleResponse(result);
    },
  },

  mounted() {
    this.walletId = this.$route.query.walletId;
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    wallets() {
      return JSON.parse(JSON.stringify(this.$store.state.dashboard.wallets));
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
