<template>
  <div v-if="item.status == 1" class="dash-paymentflex">
    <div class="dash-payment-history active">
      <div class="dash-pament-title">{{ item.name }}</div>

      <div class="dash-eachpayment-receipt">
        <img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b64459c3edfa5897c1fd0f_waecback.jpg"
          loading="lazy"
          alt=""
          class="dash-paymentreceipt"
        />
        <div class="dash-eachpayment-details">
          <div>N2,400</div>
          <div>23rd Jun, 202</div>
        </div>
      </div>
      <div class="dash-eachpayment-receipt">
        <img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b64459c3edfa5897c1fd0f_waecback.jpg"
          loading="lazy"
          alt=""
          class="dash-paymentreceipt"
        />
        <div class="dash-eachpayment-details">
          <div>N2,400</div>
          <div>23rd Jun, 202</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="dash-paymentflex">
    <div class="dash-paymenttopflex">
      <div class="dash-paymentpix">
        <img
          :src="`${FILE_URL}/${item.image}`"
          loading="lazy"
          alt=""
          class="dash-paymentreceipt"
        />
      </div>
      <div>
        <div class="dash-pament-title">{{ item.name }}</div>
        <div>N{{ formatNumber(item.amount * 1) }}</div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; width: 100%">
      <div class="dash-paymentbtn">Processing...</div>
      <div>{{ formatDate(item.time * 1) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      isError: false,
      response: "",
    };
  },
  methods: {
    formatNumber(number) {
      if (!number) {
        return "0.00";
      }
      const options = { style: "decimal", maximumFractionDigits: 0 };
      return number.toLocaleString("en-US", options);
    },

    checkErrorInputs(input, data) {
      if (input == "firstName") {
        if (data == "" || !data) {
          this.isError = true;
          this.response =
            "Please go to settings under Bio and set your first name.";
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "middleName") {
        if (data == "" || !data) {
          this.isError = true;
          this.response =
            "Please go to settings under Bio and set your middle name.";
          return true;
        } else {
          this.isError = false;
        }
      } else if (input === "lastName") {
        if (data == "" || !data) {
          this.isError = true;
          this.response =
            "Please go to settings under Bio and set your last name.";
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "gender") {
        if (data == "" || !data) {
          this.isError = true;
          this.response =
            "Please go to settings under Bio and set your gender.";
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "dob") {
        if (data == "" || !data || data == 0) {
          this.isError = true;
          this.response =
            "Please go to settings under Bio and set your date of birth.";
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "image") {
        if (data == "" || !data || data == 0) {
          this.isError = true;
          this.response =
            "Please go to settings under Bio and set your passport photo.";
          return true;
        } else {
          this.isError = false;
        }
      }
    },

    showModal(msg, warning, error, success) {
      const payload = {
        msg,
        warning,
        error,
        success,
      };
      this.$store.commit("dashboard/showModal", payload);
    },

    formatDate(data) {
      if (data == null || data == undefined) {
        return "N/A";
      }
      const date = new Date(data).getTime(); // Note that month is zero-indexed in JavaScript
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        suffix: (day) => {
          if (day === 1 || day === 21 || day === 31) {
            return "st";
          } else if (day === 2 || day === 22) {
            return "nd";
          } else if (day === 3 || day === 23) {
            return "rd";
          } else {
            return "th";
          }
        },
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    setArray() {
      this.checkArray = [
        { name: "firstName", data: this.bio.firstName },
        { name: "middleName", data: this.bio.middleName },
        { name: "lastName", data: this.bio.lastName },
        { name: "gender", data: this.bio.gender },
        { name: "dob", data: this.bio.dob },
        { name: "image", data: this.bio.image },
      ];
    },

    confirmPayment(id) {
      if (!this.bio) {
        this.showModal(
          "Please go to settings and complete your Bio settings",
          false,
          true,
          false
        );

        return;
      }

      this.setArray();
      for (let i = 0; i < this.checkArray.length; i++) {
        const el = this.checkArray[i];
        const result = this.checkErrorInputs(el.name, el.data);
        if (result) {
          break; // This will exit the entire loop
        }
      }

      if (this.isError) {
        this.showModal(this.response, false, true, false);
        return;
      }
      this.$router.push(
        `/dashboard/confirm-payment/?bioId=${this.user.id}&payId=${id}`
      );
    },
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    schools() {
      return this.$store.state.admin.schools;
    },

    items() {
      return this.$store.state.dashboard.transactions;
    },

    totalLength() {
      return this.$store.state.admin.transactionLength;
    },
  },
};
</script>

<style></style>
