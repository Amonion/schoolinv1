<template>
  <div v-if="showModal" @click.self="hideModal" class="das-overlay">
    <div class="das-overlay-content">
      <h1 class="das-overlay-text">
        {{ modalMsg }}
      </h1>
      <div class="dash-balance-action act">
        <div
          @click="hideModal"
          class="dash-balance-btn cont w-inline-block cursor-pointer"
        >
          <div>Cancel</div>
        </div>

        <!-- <div
          v-if="!isSuccess && !isError"
          @click="continueProcess"
          class="dash-balance-btn cont w-inline-block cursor-pointer"
        >
          <div>Continue</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async continueProcess() {
      storeState.showModal = false;
      storeState.isError = false;
      storeState.isWarning = true;
      storeState.isSuccess = false;

      let result;
      if (storeState.action == "update") {
        result = await storeState.makeUpdate(
          storeState.actionData,
          storeState.deletingURL,
          storeState.actionQuery
        );
      } else {
        result = await storeState.makeDelete();
      }

      if (result.status.value == "error") {
        storeState.responseMsg = result.error.value.data.message;
        storeState.showModal = true;
        storeState.isError = true;
        storeState.isSuccess = false;
        storeState.isWarning = false;
      } else {
        storeState.responseMsg = result.data.value.message;
        storeState.showModal = true;
        storeState.isError = false;
        storeState.isWarning = false;
        storeState.isSuccess = true;

        switch (storeState.table) {
          case "users":
            authState.user = result.data.value.data;
            break;
        }
      }
    },

    hideModal() {
      this.$store.commit("dashboard/hideModal");
    },
  },

  computed: {
    user() {
      return this.$store.getters.getUserInfo;
    },

    company() {
      return this.$store.state.dashboard.company;
    },

    modalMsg() {
      return this.$store.state.dashboard.modalMsg;
    },

    showModal() {
      return this.$store.state.dashboard.showModal;
    },

    isModalWarning() {
      return this.$store.state.dashboard.isModalWarning;
    },

    isModalError() {
      return this.$store.state.dashboard.isModalError;
    },
  },
};
</script>
<style></style>
