<template>
  <div>
    <div v-if="isLoaded" class="review-holder">
      <div class="dashmain-more-news desc text" style="margin-top: 0">
        <textarea
          placeholder="Make a review about our service..."
          maxlength="5000"
          class="dash-profile-desc text w-input"
          v-model="review"
        ></textarea>
      </div>
      <div v-if="onRequest" class="dash-paymentbtn set">
        <img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65bb854b487243fe15d855c0_loader-line%20(1).svg"
          loading="lazy"
          width="29"
          alt=""
          class="dash-spinner spinner"
        />
        <div>Processing...</div>
      </div>
      <div @click="processData" class="dash-paymentbtn set" v-else>Submit</div>
    </div>
    <dashboard-loading v-else />
  </div>
</template>

<script>
import DashboardLoading from "./DashboardLoading.vue";
export default {
  components: { DashboardLoading },
  data() {
    return {
      review: "",
      bioObj: "",
      isLoaded: false,
    };
  },

  methods: {
    showPopUp(msg, error, success, warning) {
      const payload = {
        msg,
        error,
        success,
        warning,
      };
      this.$store.commit("dashboard/showModal", payload);
    },

    async processData() {
      const form = new FormData();
      form.append("review", this.review);
      form.append("time", new Date().getTime());

      const payload = {
        url: `/reviews/?id=${this.user.id}`,
        form: form,
      };
      this.$store.commit("dashboard/toggleOnRequest");

      const result = await this.$store.dispatch("dashboard/makePOST", payload);
      this.handleResponse(result);
      console.log(result, result.response);
    },

    handleResponse(result) {
      this.$store.commit("dashboard/toggleOnRequest");
      if (result.response) {
        this.showPopUp(result.response.data.message, true, false, false);
      } else {
        this.showPopUp(result.data.message, false, true, false);
      }
    },
  },

  async mounted() {
    // if (this.item) {
    //   this.isLoaded = true;
    //   this.review = JSON.parse(JSON.stringify(this.item.review));
    // } else {
    //   const result = await this.$store.dispatch(
    //     "dashboard/makeGET",
    //     `/reviews/?userId=${this.user.id}`
    //   );
    //   this.review = result.data.data[0].review;
    //   this.$store.commit("dashboard/setReview", result.data);
    //   if (this.review) {
    //     this.isLoaded = true;
    //   }
    // }
  },

  computed: {
    onRequest() {
      return this.$store.state.dashboard.onRequest;
    },

    user() {
      return this.$store.state.auth.user;
    },

    item() {
      return this.$store.state.dashboard.review;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style>
.review-holder {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 40px;
}
</style>
