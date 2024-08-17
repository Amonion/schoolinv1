<template>
  <div>
    <div class="dash-profile-location">
      <div class="w-layout-grid form">
        <div>
          <div class="dash-profile-label">Who sees my result</div>
          <div class="dash-check-wrapper">
            <div @click="setResult(1)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="result == 1" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">Job offers</div>
            </div>
            <div @click="setResult(2)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="result == 2" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">Everyone</div>
            </div>
            <div @click="setResult(3)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="result == 3" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">No one</div>
            </div>
          </div>
        </div>
        <div>
          <div class="dash-profile-label">Who sees my Birth Date</div>
          <div class="dash-check-wrapper">
            <div @click="setDOB(1)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="dob == 1" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">Job offers</div>
            </div>
            <div @click="setDOB(2)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="dob == 2" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">Everyone</div>
            </div>
            <div @click="setDOB(3)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="dob == 3" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">No one</div>
            </div>
          </div>
        </div>
        <div>
          <div class="dash-profile-label">Who sees my Certificates</div>
          <div class="dash-check-wrapper">
            <div @click="setCertificates(1)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="certificates == 1" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">Job offers</div>
            </div>
            <div @click="setCertificates(2)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="certificates == 2" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">Everyone</div>
            </div>
            <div @click="setCertificates(3)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="certificates == 3" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">No one</div>
            </div>
          </div>
        </div>
        <div>
          <div class="dash-profile-label">Who sees my phone number</div>
          <div class="dash-check-wrapper">
            <div @click="setPhone(1)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="phone == 1" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">Job offers</div>
            </div>
            <div @click="setPhone(2)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="phone == 2" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">Everyone</div>
            </div>
            <div @click="setPhone(3)" class="dash-each-check">
              <div class="dash-box">
                <div v-if="phone == 3" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">No one</div>
            </div>
          </div>
        </div>
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
  </div>
</template>

<script>
import DashboardMakeReview from "./DashboardMakeReview.vue";
export default {
  components: { DashboardMakeReview },
  data() {
    return {
      result: 3,
      dob: 3,
      documents: 3,
      certificates: 3,
      phone: 3,

      isLoaded: false,
    };
  },

  methods: {
    setResult(int) {
      this.result = int;
    },

    setDOB(int) {
      this.dob = int;
    },

    setPhone(int) {
      this.phone = int;
    },

    setCertificates(int) {
      this.certificates = int;
    },

    populate(item) {
      const data = JSON.parse(JSON.stringify(item));
      this.result = data.result;
      this.certificates = data.certificates;
      this.phone = data.phone;
      this.dob = data.dob;
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

    processData() {
      const form = {
        result: this.result,
        dob: this.dob,
        phone: this.phone,
        certificates: this.certificates,
        userId: this.user.id,
      };

      const payload = {
        msg: "Note, you can change this information anytime you want.",
        warning: true,
        error: false,
        url: `/users/visibility/?id=${this.user.id}`,
        action: "post",
        dataType: "user",
        data: form,
      };
      this.$store.commit("dashboard/showModal", payload);
    },
  },

  async mounted() {
    if (this.visibility) {
      this.populate(this.visibility);
    } else {
      const result = await this.$store.dispatch(
        "dashboard/makeGET",
        `/users/visibility/?id=${this.user.id}`
      );
      this.$store.commit("dashboard/setVisibility", result.data);
      this.populate(result.data);
    }
  },

  computed: {
    onRequest() {
      return this.$store.state.dashboard.onRequest;
    },

    user() {
      return this.$store.state.auth.user;
    },

    visibility() {
      return this.$store.state.dashboard.visibility;
    },
  },
};
</script>

<style></style>
