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
                <div class="dash-pane-title">Select Wallet To Withdraw</div>
              </div>
              <div class="das-rit-flex deposi left">
                <div class="das-wallets left">
                  <div class="das-selet-wallet text-lg font-bold">
                    Select From System
                  </div>
                  <div class="w-layout-grid dash-wallet-grid full">
                    <div
                      v-for="(item, int) in wallets"
                      :key="int"
                      class="das-each-wallet"
                      :class="{ active: item.id == wallet.id }"
                      @click="selectWallet(item)"
                    >
                      <div class="dash-wallet-ead">
                        <div>{{ item.walletName }} Balance</div>
                        <img
                          :src="`${FILE_URL}/${item.image}`"
                          loading="lazy"
                          alt=""
                          class="dash-wallet-coin"
                        />
                      </div>
                      <div class="dash-totalbalance sm">
                        ${{ numberWithCommas(item.balance) }}
                      </div>
                      <div class="dash-wallet-edits">
                        <div class="dash-wallet-range">
                          <span class="dash-wallet-span">+2.6%</span> Wallet
                          Increase
                        </div>
                        <NuxtLink
                          :to="`/dashboard/profile/?walletId=${item.id}`"
                          class="w-inline-block"
                          ><img
                            src="/images/dashboard/edit-green.svg"
                            loading="lazy"
                            width="14"
                            alt=""
                        /></NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="das-deposit-input w-form">
                <div class="das-input-form full">
                  <div class="das-input-eac">
                    <label for="amount-2" class="das-input-label"
                      >Enter Amount</label
                    ><input
                      type="number"
                      class="das-input-amount w-input"
                      v-model="amount"
                      placeholder="$100.00"
                    />
                  </div>
                </div>
                <div class="das-tb-istory">
                  <span v-if="onRequest" class="das-select-plan cursor-pointer"
                    >Processing...</span
                  >
                  <span
                    v-else
                    @click="processWithdrawal"
                    class="das-select-plan cursor-pointer"
                    >Make Withdrawal</span
                  >
                </div>
              </div>
            </div>
            <active-deposit />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActiveDeposit from "../../components/ActiveDeposit.vue";
export default {
  components: { ActiveDeposit },
  layout: "dashboard",

  data() {
    return {
      onRequest: false,
      fromBalance: false,
      wallet: "",
      amount: null,
      currency: null,

      currentPage: 1,
      limit: 10,
    };
  },
  methods: {
    selectWallet(item) {
      if (item.balance <= 0) {
        return;
      }

      this.currency = this.currencies.find((el) => el.id === item.currencyId);
      this.wallet = item;
    },

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    showModal(msg, warning, error) {
      const payload = {
        msg: msg,
        warning: warning,
        error: error,
      };
      this.$store.commit("dashboard/showModal", payload);
    },

    async processWithdrawal() {
      if (this.wallet == "") {
        this.showModal("Please select wallet", false, true);
        return;
      }

      if (this.amount < 10) {
        this.showModal(`You can not withdraw below $10`, false, true);
        return;
      }
      if (this.amount > this.wallet.balance) {
        this.showModal(
          `You can not withdraw above $${this.wallet.balance}`,
          false,
          true
        );
        return;
      }

      const form = {
        wallet: this.wallet,
        currency: this.currency,
        amount: this.amount,
        transactionType: "Withdrawal",
        user: this.user,
        time: new Date().getTime(),
        status: false,
      };

      const payload = {
        form: form,
        url: `/transactions/?page=${this.currentPage}&limit=${this.limit}&username=${this.user.username}`,
      };
      const result = await this.$store.dispatch("dashboard/makePOST", payload);
      this.handleResponse(result);
    },

    async handleResponse(result) {
      this.onRequest = false;

      if (!result.data.error) {
        this.showModal(result.data.message, false, true);
        await this.$store.dispatch(
          "dashboard/initializeUserDetails",
          this.user
        );
        setTimeout(() => {
          this.$store.commit("dashboard/hideModal");
          this.$router.push("/dashboard");
        }, 3000);
      } else {
        this.showModal(result.data.message, false, true);
      }
    },
  },

  mounted() {
    // this.walletId = this.$route.query.walletId;
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    wallets() {
      return this.$store.state.dashboard.wallets;
    },

    currencies() {
      return this.$store.state.dashboard.currencies;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
