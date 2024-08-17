<template>
  <div class="admin-plan-form w-form">
    <div class="admin-plan-form-flex">
      <div class="w-layout-grid grid-form">
        <div class="admin-input-wrapper">
          <label for="name-5" class="admin-input-label">Wallet </label>
          <div class="admin-text-input" @click="showWallet = !showWallet">
            <div v-if="wallet">{{ wallet.walletName }}</div>
            <div v-else>Select Wallet</div>
            <img
              src="/images/admin/caret-down-blue.svg"
              loading="lazy"
              alt=""
              class="admin-input-icon"
            />
          </div>
          <ul
            role="list"
            class="admin-action-list input -mt-1"
            :class="{ hide: !showWallet }"
          >
            <li
              v-for="(item, int) in wallets"
              :key="int"
              class="admin-action-listitems"
              @click="setWallet(item)"
            >
              <div>{{ item.walletName }}</div>
            </li>
          </ul>
        </div>

        <div class="admin-input-wrapper">
          <label for="name-5" class="admin-input-label"
            >Plan <span class="admin-marked">*</span>
          </label>
          <div class="admin-text-input" @click="showPlans = !showPlans">
            <div v-if="plan">{{ plan.planName }}</div>
            <div v-else>Select Plan</div>
            <img
              src="/images/admin/caret-down-blue.svg"
              loading="lazy"
              alt=""
              class="admin-input-icon"
            />
          </div>
          <ul
            role="list"
            class="admin-action-list input"
            :class="{ hide: !showPlans }"
          >
            <li
              v-for="(item, int) in plans"
              :key="int"
              class="admin-action-listitems"
              @click="setPlan(item)"
            >
              <div>{{ item.planName }}</div>
            </li>
          </ul>
        </div>

        <div class="admin-input-wrapper">
          <label for="Password-4" class="admin-input-label">Date</label
          ><input
            type="date"
            class="admin-text-input w-input"
            maxlength="256"
            placeholder="Select Date"
            v-model="time"
          />
        </div>
        <div class="admin-input-wrapper">
          <label for="Password-4" class="admin-input-label">Amount</label
          ><input
            type="number"
            class="admin-text-input w-input"
            maxlength="256"
            placeholder="Enter Amount"
            v-model="amount"
            @keyup="checkAmount"
          />
        </div>
      </div>
      <div class="w-full flex justify-center mb-5 admin-input-label">
        Reinvesting
        <div class="admin-toggler ml-3" @click="reinvest = !reinvest">
          <img
            v-if="reinvest"
            src="/images/admin/check-blue.svg"
            loading="lazy"
            width="10"
            alt=""
          />
        </div>
      </div>
      <div class="admin-btn-holder">
        <div v-if="onRequest" class="admin-cus-btn">
          <img
            src="/images/admin/spinner-white.svg"
            loading="lazy"
            alt=""
            class="admin-btn-icon"
          />
          <div>Processing</div>
        </div>
        <div v-else class="admin-cus-btn" @click="processData">
          <div>Submit</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "",
      wallet: "",
      plan: "",
      amount: "",
      currentPage: 1,
      limit: 10,
      reinvest: true,

      onRequest: false,
      showWallet: false,
      showPlans: false,
    };
  },

  methods: {
    setPlan(item) {
      this.plan = item;
      this.showPlans = false;
    },

    clearInputs() {},

    checkAmount() {
      if (this.plan === "") {
        this.amount = "";
        this.showModal("Please select plan", false, true, false);
        return true;
      }
    },

    selectWallet(item, status) {
      if (status == true && item.balance == 0) {
        return;
      }

      fromBalance.value = status;
      wallet.value = item;
      dashStore.wallet.forEach((el) => {
        el.checked = false;
      });
      dashStore.currency.forEach((el) => {
        el.checked = false;
      });

      if (status == true) {
        dashStore.wallet.forEach((obj) => {
          if (obj.id === item.id) {
            obj.checked = true;
          }
        });
        currency.value = dashStore.currency.find(
          (el) => el.id === item.currencyId
        );
      } else {
        dashStore.currency.forEach((obj) => {
          if (obj.id === item.id) {
            currency.value = item;
            obj.checked = true;
          }
        });
        wallet.value = dashStore.wallet.find((el) => el.currencyId === item.id);
      }
    },

    showModal(msg, warning, error, success) {
      this.onRequest = false;
      const payload = {
        msg: msg,
        isWarning: warning,
        isError: error,
        isSuccess: success,
        table: "",
        action: "",
        url: ``,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload);
    },

    setWallet(item) {
      this.wallet = item;
      this.showWallet = false;
    },

    async processData() {
      if (this.wallet == "") {
        this.showModal("Please select wallet", false, true, false);
        return;
      }

      if (this.plan == "") {
        this.showModal("Please select plan", false, true, false);
        return;
      }

      if (this.amount < this.plan.planMinimum) {
        this.showModal(
          `You can not deposit below $${this.plan.planMinimum}`,
          false,
          true
        );
        return;
      }

      const form = {
        plan: this.plan,
        wallet: this.wallet,
        amount: this.amount,
        fromBalance: true,
        transactionType: "Deposit",
        user: this.user,
        time: new Date().getTime(),
        reinvest: this.reinvest,
      };

      const url = `/transactions/?page=${this.currentPage}&limit=${this.limit}&username=${this.username}`;

      this.onRequest = true;

      const payload = {
        form: form,
        url: url,
      };

      const result = await this.$store.dispatch("admin/makePOST", payload);
      console.log(result.response, result.data);
      if (result.response == undefined) {
        this.showModal(result.data.message, false, false, true);
        await this.$store.dispatch(`admin/initializeAdminDetails`);
      } else {
        this.showModal(result.response.data.message, false, true);
      }
    },
  },

  props: {
    wallets: {
      type: Array,
      required: true,
    },
    username: {
      type: String,
    },
    user: {
      type: Object,
    },
  },

  computed: {
    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },

    plans() {
      return this.$store.state.admin.plans;
    },
  },
};
</script>

<style></style>
