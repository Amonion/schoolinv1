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
                <div class="dash-pane-title">Confirm &amp; Make Payment</div>
              </div>

              <div v-if="scanner" class="dash-payment">
                <div id="qrcode"></div>

                <div v-if="!fromBalance" class="dash-plan-stats">
                  <div class="das-eac-plan-stat wallet">
                    <div>Scan te code above or copy te wallet below</div>
                  </div>
                  <div v-if="currency" class="das-ref-linkinput w-form">
                    <div class="dash-ref-link wallet">
                      <input
                        type="text"
                        class="dash-ref-input w-input"
                        maxlength="256"
                        v-model="address"
                        id="address"
                      /><img
                        src="/images/dashboard/copy-white.svg"
                        loading="lazy"
                        width="21"
                        alt=""
                        class="dash-ref-copy"
                        @click="copyAddress"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="das-tb-scroll">
                <div class="das-tb-istory">
                  <div class="dash-trans-table">
                    <div class="das-sn"><div>S/N</div></div>
                    <div class="das-td20"><div>Description</div></div>
                    <div class="das-td20 payment"><div>Details</div></div>
                  </div>
                  <div class="dash-trans-table body even">
                    <div class="das-sn"><div>1</div></div>
                    <div class="das-td20"><div>Transaction</div></div>
                    <div class="das-td20 payment" v-if="route">
                      <div v-if="route.query">{{ route.query.type }}</div>
                    </div>
                  </div>
                  <div class="dash-trans-table body">
                    <div class="das-sn"><div>2</div></div>
                    <div class="das-td20"><div>Wallet Name</div></div>
                    <div v-if="currency" class="das-td20 payment">
                      <div>{{ currency.name }}</div>
                      <img
                        :src="`${FILE_URL}/${currency.image}`"
                        loading="lazy"
                        alt=""
                        class="dash-wallet-coin"
                      />
                    </div>
                  </div>
                  <div class="dash-trans-table body even">
                    <div class="das-sn"><div>3</div></div>
                    <div class="das-td20"><div>Plan Duration</div></div>
                    <div v-if="plan" class="das-td20 payment">
                      {{ plan.planDuration }} Days
                    </div>
                  </div>
                  <div v-if="route" class="dash-trans-table body">
                    <div class="das-sn"><div>4</div></div>
                    <div class="das-td20"><div>Amount</div></div>
                    <div v-if="route.query" class="das-td20 payment">
                      ${{ numberWithCommas(route.query.amount) }}
                    </div>
                  </div>

                  <div v-if="route" class="dash-trans-table body even">
                    <div class="das-sn"><div>5</div></div>
                    <div class="das-td20"><div>Daily Profit</div></div>
                    <div v-if="plan" class="das-td20 payment">
                      ${{
                        numberWithCommas(
                          (plan.planPercentage * route.query.amount) / 100
                        )
                      }}
                      @{{ plan.planPercentage }}%
                    </div>
                  </div>

                  <div v-if="route" class="dash-trans-table body">
                    <div class="das-sn"><div>6</div></div>
                    <div class="das-td20"><div>Net Profit</div></div>
                    <div v-if="plan" class="das-td20 payment">
                      ${{
                        numberWithCommas(
                          (plan.planPercentage *
                            route.query.amount *
                            plan.planDuration) /
                            100
                        )
                      }}
                    </div>
                  </div>

                  <div v-if="route" class="dash-trans-table body even">
                    <div class="das-sn"><div>7</div></div>
                    <div class="das-td20"><div>Total Return</div></div>
                    <div v-if="plan" class="das-td20 payment">
                      ${{
                        numberWithCommas(
                          (plan.planPercentage *
                            route.query.amount *
                            plan.planDuration) /
                            100 +
                            route.query.amount * 1
                        )
                      }}
                    </div>
                  </div>

                  <div class="dash-trans-table body">
                    <div class="das-sn"><div>7</div></div>
                    <div class="das-td20"><div>Created At</div></div>
                    <div class="das-td20 payment">
                      {{ formatDate() }} <br />
                      {{ formatTimeToAMPM(new Date().getTime()) }}
                    </div>
                  </div>

                  <div class="dash-trans-table body even">
                    <div class="das-sn"><div>8</div></div>
                    <div class="das-td20"><div>Expires At</div></div>
                    <div v-if="plan" class="das-td20 payment">
                      {{
                        formatDate(
                          new Date().getTime() + plan.planDuration * 86400000
                        )
                      }}
                      <br />
                      {{ formatTimeToAMPM(new Date().getTime()) }}
                    </div>
                  </div>

                  <div class="das-tb-istory">
                    <span
                      v-if="onRequest"
                      class="das-select-plan cursor-pointer"
                      >Processing...</span
                    >
                    <span
                      v-else
                      @click="processDeposit"
                      class="das-select-plan cursor-pointer"
                      >Make Deposit</span
                    >
                  </div>
                </div>
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
      plan: "",
      wallet: null,
      currency: null,
      amount: 0,
      scanner: true,
      address: "",
      planName: "",
      walletName: "",
      route: "",

      currentPage: 1,
      limit: 10,

      onRequest: false,
    };
  },

  methods: {
    setValues() {
      plan.value = dashStore.plan.find(
        (el) => el.id === route.query.planId * 1
      );
      amount.value = route.query.amount * 1;
      currency.value = dashStore.currency.find(
        (el) => el.id === route.query.currencyId * 1
      );
      wallet.value = dashStore.wallet.find(
        (el) => el.id === route.query.walletId * 1
      );
      dashStore.plan.forEach((el) => {
        if (el.id === route.query.planId * 1) {
          planName.value = el.planName;
        }
      });

      dashStore.wallet.forEach((el) => {
        if (el.id === route.query.walletId * 1) {
          walletName.value = el.walletName;
        }
      });
    },

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

    async generateCode() {
      if (process.client) {
        const qrContainer = document.getElementById("qrcode");
        const size = 200;
        const plan = await this.$store.dispatch(
          "dashboard/makeGET",
          `/plans/?id=${this.$route.query.planId}`
        );
        this.plan = plan.data;

        const wallet = await this.$store.dispatch(
          "dashboard/makeGET",
          `/wallets/?id=${this.$route.query.walletId}`
        );
        this.wallet = wallet.data;
        const result = await this.$store.dispatch(
          "dashboard/makeGET",
          `/currency/?id=${this.$route.query.currencyId}`
        );
        if (result.data) {
          this.currency = result.data;

          const googleChartsApiUrl = `https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${this.currency.address}`;
          this.address = this.currency.address;
          const img = new Image();
          img.src = googleChartsApiUrl;
          img.width = size;
          img.height = size;

          if (this.fromBalance == false) {
            qrContainer.appendChild(img);
          }
        }
      }
    },

    copyAddress() {
      const inputElement = document.getElementById("address");
      inputElement.select();
      window.getSelection().removeAllRanges();
    },

    async processDeposit() {
      const form = {
        plan: this.plan,
        wallet: this.wallet,
        currency: this.currency,
        amount: this.$route.query.amount,
        fromBalance: this.fromBalance,
        transactionType: this.$route.query.type,
        status: false,
        user: this.user,
        time: new Date().getTime(),
      };

      this.onRequest = true;
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
        this.showModal(error.value.message, false, true);
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
  },

  mounted() {
    this.generateCode();
    this.route = this.$route;
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    fromBalance() {
      return this.$route.query.fromBalance == "true" ? true : false;
    },

    wallets() {
      return this.$store.state.dashboard.wallets;
    },

    currencies() {
      return this.$store.state.dashboard.currencies;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
