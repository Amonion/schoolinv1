<template>
  <div class="dash-body-left">
    <div class="dash-total-balance wide">
      <div class="dash-balance-header">
        <div>Total Balance</div>
        <div class="das-balance-crypt">
          <img
            src="/images/dashboard/bitcoin.png"
            loading="lazy"
            width="28"
            alt=""
            class="dash-balance-cryptos"
          /><img
            src="/images/dashboard/ethereum.png"
            loading="lazy"
            width="28"
            alt=""
            class="dash-balance-cryptos spec"
          /><img
            src="/images/dashboard/dogecoin.png"
            loading="lazy"
            width="28"
            alt=""
            class="dash-balance-cryptos"
          /><img
            src="/images/dashboard/bitcoin.png"
            loading="lazy"
            width="28"
            alt=""
            class="dash-balance-cryptos"
          />
        </div>
      </div>
      <div class="dash-totalbalance" v-if="user">
        ${{ numberWithCommas(user.totalBalance) }}
      </div>
      <div class="dash-balance-action">
        <NuxtLink
          to="/dashboard/deposit"
          class="dash-balance-btn w-inline-block"
          ><img
            src="/images/dashboard/saving.svg"
            loading="lazy"
            alt=""
            class="dash-balance-icon"
          />
          <div>Deposit</div>
        </NuxtLink>
        <NuxtLink
          to="/dashboard/withdraw"
          class="dash-balance-btn w-inline-block"
          ><img
            src="/images/dashboard/withdraw.svg"
            loading="lazy"
            alt=""
            class="dash-balance-icon"
          />
          <div>Withdraw</div>
        </NuxtLink>
      </div>
    </div>
    <div
      v-if="plans"
      class="dash-total-balance plans wide ide"
      :class="{ sow: !route.includes('deposit') }"
    >
      <div>
        <div class="dash-balance-header">
          <div class="dash-pane-title">Investment Plans</div>
        </div>
        <div
          v-for="(item, int) in plans"
          :key="int"
          class="dash-each-plan"
          :class="{ active: item.id == selectedPlan.id }"
        >
          <div class="dash-plan-header">
            <div class="dash-plan-headflex">
              <div
                class="dash-each-planicons"
                :class="{ pink: int == 1, blue: int == 2 }"
              >
                <img
                  v-if="int == 1"
                  src="/images/dashboard/piggy.svg"
                  loading="lazy"
                  alt=""
                />
                <img
                  v-if="int == 2"
                  src="/images/dashboard/car.svg"
                  loading="lazy"
                  alt=""
                />
                <img
                  v-if="int == 0 || int > 3"
                  src="/images/dashboard/house.svg"
                  loading="lazy"
                  alt=""
                />
              </div>
              <div>
                <div class="dash-plan-title">
                  {{ numberWithCommas(item.planMinimum) }}
                </div>
                <div class="das-desc-flex">
                  <div class="das-desc-cild">
                    Min: ${{ numberWithCommas(item.planMinimum) }}
                  </div>
                  <div v-if="item.planMaximum > 0" class="das-desc-cild">
                    Max: ${{ numberWithCommas(item.planMaximum) }}
                  </div>
                  <div v-else class="das-desc-cild">Max: Unlimited</div>
                </div>
              </div>
            </div>
            <div
              class="dash-desc-percent"
              :class="{ pink: int == 1, blue: int == 2 }"
            >
              {{ item.planPercentage }}%
            </div>
          </div>
          <div class="dash-plan-stats">
            <div class="das-eac-plan-stat">
              <div class="das-desc-cild money">
                ${{ numberWithCommas(item.volume) }}
              </div>
              <div>Total Market Volume</div>
            </div>
            <div class="dash-plan-bars">
              <div
                class="das-plan-bar"
                :class="{ pink: int == 1, blue: int == 2 }"
              ></div>
            </div>
            <span
              @click="selectPlan(item)"
              class="das-select-plan cursor-pointer"
              :class="{ pink: int == 1, blue: int == 2 }"
              >Select Plan</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      route: "",
    };
  },
  methods: {
    loadScript() {
      if (!process.server) {
        let el1 = document.getElementById("translator");

        if (el1 != undefined) {
          document.body.removeChild(el1);
        }

        const scriptTranslate = document.createElement("script");

        scriptTranslate.type = "text/javascript";

        scriptTranslate.src =
          "https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=light&autoMode=false";
        scriptTranslate.async = true;

        scriptTranslate.id = "translator";
        const app = document.querySelector("#top");
        if (app) {
          app.appendChild(scriptTranslate);
        } else {
          console.error("Could not find app node to append script element");
        }
      }
    },

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    selectPlan(item) {
      this.$store.commit("dashboard/selectPlan", item);
    },
  },

  mounted() {
    this.route = this.$route.name;
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    selectedPlan() {
      return this.$store.state.dashboard.selectedPlan;
    },

    plans() {
      return this.$store.state.dashboard.plans;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style>
.dash-each-plan.active {
  background: #e4f2e7;
}
</style>
