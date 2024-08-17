<template>
  <div
    @click.self="hideModal"
    class="admin-overlay"
    :class="{ hide: !showModal }"
  >
    <div class="admin-overlay-content">
      <div class="admin-title2">Operation Feedback</div>
      <img
        v-if="isSuccess"
        src="/images/admin/success-green.svg"
        loading="lazy"
        alt=""
        class="admin-modal-icon"
      /><img
        v-if="isError"
        src="/images/admin/error-red.svg"
        loading="lazy"
        alt=""
        class="admin-modal-icon"
      /><img
        v-if="isWarning"
        src="/images/admin/warning-yellow.svg"
        loading="lazy"
        alt=""
        class="admin-modal-icon"
      />
      <div
        class="admin-small-msg"
        :class="{
          success: isSuccess,
          error: isError,
          warning: isWarning,
        }"
      >
        {{ responseMsg }}
      </div>

      <div class="admin-modal-actions">
        <div @click="hideModal" class="admin-cus-btn">
          <div>Cancel</div>
        </div>
        <div v-if="isWarning" class="admin-cus-btn" @click="proceed">
          <div>Continue</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hideModal() {
      this.$store.commit("admin/hideModal");
    },

    async proceed() {
      this.$store.commit("admin/hideModal");
      let result;
      if (this.action == "update" || this.action == "mass-delete") {
        const payload = {
          url: this.url,
          form: this.item,
        };

        result = await this.$store.dispatch("admin/makePOST", payload);
      } else {
        result = await this.$store.dispatch("admin/makeDELETE", this.url);
      }

      console.log(result.response, result.data);

      if (result.response) {
        const payload = {
          msg: result.response.data.message,
          isWarning: false,
          isError: result.response.data.error,
          isSuccess: !result.response.data.error,
          table: "",
          action: "",
          url: ``,
          item: "",
        };
        this.$store.commit(`admin/showModal`, payload);
      } else {
        this.$store.dispatch(
          `admin/getBlog`,
          `/blog/?limit=30&page=1&sort=-time`
        );
        this.$store.dispatch(
          `admin/getUsers`,
          `/users/?limit=10&page=1&sort=dateCreated`
        );
      }
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    isSuccess() {
      return this.$store.state.admin.isModalSuccess;
    },

    isWarning() {
      return this.$store.state.admin.isModalWarning;
    },

    isError() {
      return this.$store.state.admin.isModalError;
    },

    action() {
      return this.$store.state.admin.modalAction;
    },

    item() {
      return this.$store.state.admin.modalItem;
    },

    url() {
      return this.$store.state.admin.modalURL;
    },

    responseMsg() {
      return this.$store.state.admin.modalMsg;
    },

    showModal() {
      return this.$store.state.admin.showModal;
    },
  },
};
</script>

<style></style>
