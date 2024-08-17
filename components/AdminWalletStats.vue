<template>
  <div class="admin-home-visitos-pane trans">
    <div class="admin-subtitle color">Wallet Status</div>
    <div class="admin-title2 bottom10">
      Net Balance
      <span class="admin-h-total"
        >${{ numberWithCommas(totalDeposit - totalWithdrawal) }}</span
      >
    </div>
    <div class="admin-home-table-body bordered">
      <div class="admin-tl-name1">
        <div class="admin-trans-statsletters">Active Deposits</div>
      </div>
      <div class="admin-tl-time1 visit">
        <div class="text-green">${{ numberWithCommas(activeDeposits) }}</div>
      </div>
    </div>

    <div class="admin-home-table-body bordered">
      <div class="admin-tl-name1">
        <div class="admin-trans-statsletters">Pending Deposits</div>
      </div>
      <div class="admin-tl-time1 visit">
        <div class="text-block">${{ numberWithCommas(pendingDeposit) }}</div>
      </div>
    </div>

    <div class="admin-home-table-body bordered">
      <div class="admin-tl-name1">
        <div class="admin-trans-statsletters">Total Deposits</div>
      </div>
      <div class="admin-tl-time1 visit">
        <div class="text-green">${{ numberWithCommas(totalDeposit) }}</div>
      </div>
    </div>

    <div class="admin-home-table-body bordered">
      <div class="admin-tl-name1">
        <div class="admin-trans-statsletters">Pending Withdrawal</div>
      </div>
      <div class="admin-tl-time1 visit">
        <div class="text-block">${{ numberWithCommas(pendingWithdrawal) }}</div>
      </div>
    </div>

    <div class="admin-home-table-body bordered">
      <div class="admin-tl-name1">
        <div class="admin-trans-statsletters">Total Withdrawal</div>
      </div>
      <div class="admin-tl-time1 visit">
        <div class="text-green">${{ numberWithCommas(totalWithdrawal) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pendingDeposit: 0,
      totalDeposit: 0,
      totalWithdrawal: 0,
      pendingWithdrawal: 0,
    };
  },
  methods: {
    numberWithCommas(number) {
      if (number < 0) {
        return 0;
      }
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },
  },

  async mounted() {
    const pending = await this.$store.dispatch(
      "admin/makeGET",
      `/transactions/?limit=200&page=1&status=0`
    );
    const approved = await this.$store.dispatch(
      "admin/makeGET",
      `/transactions/?limit=200&page=1&status=1`
    );

    for (let i = 0; i < pending.data.data.length; i++) {
      const el = pending.data.data[i];
      if (el.transactionType == "Deposit") {
        this.pendingDeposit += el.amount;
      }
      if (el.transactionType == "Withdrawal") {
        this.pendingWithdrawal += el.amount;
      }
    }

    for (let i = 0; i < approved.data.data.length; i++) {
      const el = approved.data.data[i];
      if (el.transactionType == "Deposit") {
        this.totalDeposit += el.amount;
      }
      if (el.transactionType == "Withdrawal") {
        this.totalWithdrawal += el.amount;
      }
    }
  },

  computed: {
    // pendingDeposit() {
    //   let amount = 0;
    //   for (let i = 0; i < this.currencies.length; i++) {
    //     const el = this.currencies[i];
    //     amount += el.pendingDeposit;
    //   }
    //   return amount;
    // },

    activeDeposits() {
      return this.$store.state.admin.totalActiveDeposits;
    },
  },
};
</script>

<style></style>
