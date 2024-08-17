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
                <div class="dash-pane-title">Select Wallet</div>
              </div>
              <div class="das-rit-flex deposi">
                <div class="das-wallets">
                  <div class="das-selet-wallet text-lg font-bold">
                    Select From Wallet
                  </div>
                  <div class="w-layout-grid dash-wallet-grid select">
                    <div
                      v-for="(item, int) in wallets"
                      :key="int"
                      class="das-each-wallet"
                      :class="{ active: wallet.id == item.id && fromBalance }"
                      @click="selectWallet(item, true)"
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

                <div class="das-wallets">
                  <div class="das-selet-wallet text-lg font-bold">
                    Select From System
                  </div>
                  <div class="w-layout-grid dash-wallet-grid select">
                    <div
                      v-for="(item, int) in currencies"
                      :key="int"
                      class="das-each-wallet"
                      :class="{
                        active: currency.id == item.id && !fromBalance,
                      }"
                      @click="selectWallet(item, false)"
                    >
                      <div class="dash-wallet-ead">
                        <div>{{ item.name }} Balance</div>
                        <img
                          :src="`${FILE_URL}/${item.image}`"
                          loading="lazy"
                          alt=""
                          class="dash-wallet-coin"
                        />
                      </div>
                      <div class="dash-totalbalance sm">100%</div>
                      <div class="dash-wallet-edits">
                        <div class="dash-wallet-range">
                          <span class="dash-wallet-span">+2.6%</span> Wallet
                          Increase
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="das-deposit-input w-form">
                <div class="das-input-form">
                  <div class="das-input-eac">
                    <label for="amount" class="das-input-label"
                      >Enter Amount</label
                    ><input
                      type="number"
                      class="das-input-amount w-input"
                      maxlength="256"
                      v-model="amount"
                      placeholder="$100.00"
                      @keyup="calculateProfit"
                      @focus="checkAmount"
                    />
                  </div>
                  <div class="das-input-eac">
                    <label for="amount-2" class="das-input-label"
                      >Calculated Profit</label
                    >
                    <div class="das-input-calculator">
                      <div class="das-profits">
                        <div>Daily</div>
                        <img
                          src="/images/dashboard/dailyTime.svg"
                          loading="lazy"
                          alt=""
                          class="das-profit-icons"
                        />
                        <div class="das-deposit-proft">${{ dailyProfit }}</div>
                      </div>
                      <div class="das-profits">
                        <div>Weekly</div>
                        <img
                          src="/images/dashboard/weeklyTime.svg"
                          loading="lazy"
                          alt=""
                          class="das-profit-icons"
                        />
                        <div class="das-deposit-proft">${{ weeklyProfit }}</div>
                      </div>
                      <div class="das-profits">
                        <div>Montly</div>
                        <img
                          src="/images/dashboard/monthlyTime.svg"
                          loading="lazy"
                          alt=""
                          class="das-profit-icons"
                        />
                        <div class="das-deposit-proft">
                          ${{ monthlyProfit }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span
                    class="das-select-plan cursor-pointer"
                    @click="deposit('Deposit')"
                    >Make Deposit</span
                  ><span
                    class="das-select-plan topup cursor-pointer"
                    @click="deposit('Top')"
                    >Top Up</span
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
import ActiveDeposit from "../../components/ActiveDeposit";
export default {
  components: { ActiveDeposit },
  layout: "dashboard",

  data() {
    return {
      currentPage: 1,
      activeLevel: 1,
      limit: 10,

      fromBalance: false,
      wallet: "",
      amount: null,
      currency: "",
      amount: null,

      dailyProfit: 0,
      weeklyProfit: 0,
      monthlyProfit: 0,
    };
  },

  methods: {
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

    calculateProfit() {
      this.dailyProfit = (
        this.amount *
        this.selectedPlan.planPercentage *
        0.01
      ).toFixed(2);

      this.weeklyProfit = (
        this.amount *
        7 *
        this.selectedPlan.planPercentage *
        0.01
      ).toFixed(2);

      this.monthlyProfit = (
        this.amount *
        30 *
        this.selectedPlan.planPercentage *
        0.01
      ).toFixed(2);
    },

    checkAmount() {
      if (this.selectedPlan === "") {
        this.amount = null;
        const payload = {
          msg: "Please select plan",
          warning: false,
          error: true,
        };
        this.$store.commit("dashboard/showModal", payload);
        return true;
      }
    },

    selectWallet(item, status) {
      if (status == true && item.balance == 0) {
        return;
      }

      this.wallet = "";
      this.currency = "";

      this.fromBalance = status;
      if (status == true) {
        this.currency = this.currencies.find((el) => el.id === item.currencyId);
        this.wallet = item;
      } else {
        this.currency = item;
        this.wallet = this.wallets.find((el) => el.currencyId === item.id);
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

    deposit(type) {
      if (this.wallet == "") {
        this.showModal("Please select wallet", false, true);
        return;
      }

      if (this.selectedPlan == "") {
        this.showModal("Please select plan", false, true);
        return;
      }

      if (this.amount < this.selectedPlan.planMinimum) {
        this.showModal(
          `You can not ${type} below $${this.selectedPlan.planMinimum}`,
          false,
          true
        );
        return;
      }

      if (this.amount > this.wallet.balance && this.fromBalance == true) {
        this.showModal(
          `You have insufficient funds in your ${this.wallet.walletName}`,
          false,
          true
        );
        return;
      }
      this.$router.push(
        `/dashboard/confirm-deposit/?currencyId=${this.currency.id}&fromBalance=${this.fromBalance}&walletId=${this.wallet.id}&amount=${this.amount}&planId=${this.selectedPlan.id}&type=${type}`
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

    wallets() {
      return this.$store.state.dashboard.wallets;
    },

    plans() {
      return this.$store.state.dashboard.plans;
    },

    currencies() {
      return this.$store.state.dashboard.currencies;
    },

    selectedPlan() {
      return this.$store.state.dashboard.selectedPlan;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
