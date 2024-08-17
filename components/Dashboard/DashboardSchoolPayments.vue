<template>
  <div class="dashprime-main-display">
    <div class="dash-paytitle">Tertiary Payments</div>

    <div class="w-layout-grid dash-toppayment-grid">
      <div v-for="item in items" :key="item.id" class="dash-paymentflex">
        <div class="dash-paymenttopflex">
          <div class="dash-paymentpix">
            <img
              src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b641054a54518496181e43_waec.jpg"
              loading="lazy"
              alt=""
              class="responsive-img"
            />
          </div>
          <div>
            <div class="dash-pament-title">{{ item.name }}</div>
            <div>N{{ formatNumber(item.amount) }}</div>
          </div>
        </div>
        <div class="dash-paymentbtn" @click="confirmPayment(item.id)">
          Make Payment
        </div>
        <div class="dash-payment-history">
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
    </div>
    <!-- <div class="dash-loading-more">
      <div class="dash-upload-holder">
        <input
          class="input-hidden w-input"
          maxlength="256"
          name="field-2"
          data-name="Field 2"
          placeholder="Example Text"
          type="text"
          id="field-2"
          required=""
        /><img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adcbcdd6e8611d02fd2423_loader-line-icon%201.svg"
          loading="lazy"
          alt=""
          class="dash-uploadicon"
        />
        <div>Loading Schools</div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
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

    async getSchoolPaymnets() {
      await this.$store.dispatch(
        "dashboard/getSchoolPayments",
        `/payments/?limit=10&page=1&schoolId=${this.user.schoolId}&level=2`
      );
    },
  },
  mounted() {
    if (this.items.length == 0) {
      this.getSchoolPaymnets();
    }
  },
  computed: {
    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    school() {
      return this.$store.state.dashboard.school;
    },

    bio() {
      return this.$store.state.dashboard.bio;
    },

    items() {
      return this.$store.state.dashboard.schoolPayments;
    },

    totalLength() {
      return this.$store.state.admin.schoolPaymentsLength;
    },
  },
};
</script>

<style></style>
