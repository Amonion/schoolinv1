<template>
  <div>
    <div class="dashprime-main-display">
      <div class="dash-paytitle">Make O Level Payments</div>
      <div class="w-layout-grid dash-toppayment-grid">
        <div v-for="(item, int) in items" :key="int" class="dash-paymentflex">
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
          <div class="dash-paymentbtn" @click="confirmPayment(item.id)">
            Make Payment
          </div>
        </div>
      </div>
      <div class="dash-paytitle" style="margin-top: 20px">
        O Level Payment History
      </div>
      <div class="w-layout-grid dash-toppayment-grid">
        <dashboard-payment-history
          v-for="item in transactions"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
    <dashboard-school-payments />
  </div>
</template>

<script>
import DashboardPaymentHistory from "../../components/Dashboard/DashboardPaymentHistory.vue";
import DashboardSchoolPayments from "../../components/Dashboard/DashboardSchoolPayments.vue";
export default {
  components: { DashboardSchoolPayments, DashboardPaymentHistory },
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
      return this.$store.state.dashboard.payments;
    },

    bio() {
      return this.$store.state.dashboard.bio;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.selectedPayments;
    },

    totalLength() {
      return this.$store.state.admin.paymentLength;
    },

    url() {
      return this.$store.state.admin.modalURL;
    },

    responseMsg() {
      return this.$store.state.admin.modalMsg;
    },

    transactions() {
      return this.$store.state.dashboard.transactions;
    },

    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },
  },
};
</script>

<style></style>
