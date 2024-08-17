<template>
  <div class="dash-total-balance trans">
    <div class="das-rit-flex trans">
      <div class="dash-plan-title">Active Deposits</div>
    </div>
    <div v-if="activeDepositLength > 0" class="das-active-deposit">
      <eeach-active-deposit
        :item="item"
        v-for="(item, int) in activeDeposits"
        :key="int"
      />
    </div>
    <h1 v-else class="dash-nothing">SORRY, NO ACTIVE DEPOSIT YET</h1>
  </div>
</template>

<script>
export default {
  computed: {
    activeDepositLength() {
      return this.$store.state.dashboard.activeDepositLength;
    },

    activeDeposits() {
      return this.$store.state.dashboard.activeDeposits;
    },
  },
};
</script>

<style></style>
