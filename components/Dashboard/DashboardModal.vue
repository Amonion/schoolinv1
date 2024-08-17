<template>
  <div class="pop-wrap" :class="{ active: showModal }" @click.self="hideModal">
    <div class="pop-up">
      <div class="text-block">
        {{ modalMsg }}
      </div>
      <div class="pop-btns" v-if="!error && !success">
        <div class="pop-btn" @click="hideModal">Cancel</div>
        <div class="pop-btn" @click="processData">Proceed</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hideModal() {
      this.$store.commit("dashboard/hideModal");
    },

    toggleRequest() {
      this.$store.commit("dashboard/toggleOnRequest");
    },

    async processData() {
      if (this.action == "post") {
        const payload = {
          form: this.data,
          url: this.url,
        };

        this.hideModal();
        this.toggleRequest();
        const result = await this.$store.dispatch(
          "dashboard/makePOST",
          payload
        );

        this.handleResponse(result);

        console.log(result, result.response);
      }
    },

    showPopUp(msg, error, success, warning) {
      const payload = {
        msg,
        error,
        success,
        warning,
      };
      this.$store.commit("dashboard/showModal", payload);
    },

    handleResponse(result) {
      this.toggleRequest();
      if (result.response) {
        this.showPopUp(result.response.data.message, true, false, false);
      } else {
        this.showPopUp(result.data.message, true, false, false);
      }
    },
  },
  computed: {
    showModal() {
      return this.$store.state.dashboard.showModal;
    },

    user() {
      return this.$store.state.auth.user;
    },

    modalMsg() {
      return this.$store.state.dashboard.modalMsg;
    },

    data() {
      return this.$store.state.dashboard.data;
    },

    warning() {
      return this.$store.state.dashboard.modalWarning;
    },

    error() {
      return this.$store.state.dashboard.modalError;
    },

    success() {
      return this.$store.state.dashboard.modalSuccess;
    },
    url() {
      return this.$store.state.dashboard.url;
    },
    action() {
      return this.$store.state.dashboard.action;
    },
  },
};
</script>

<style></style>
