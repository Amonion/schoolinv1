<template>
  <div>
    <div v-if="isLoaded" class="dashprime-main-display">
      <div class="dash-paytitle confirm">Confirm Payments</div>
      <div class="dash-confirm-wrap">
        <div class="dash-confirm-title">Name of Payer</div>
        <div>{{ bio.firstName }} {{ bio.middleName }} {{ bio.lastName }}</div>
      </div>
      <div v-if="school" class="dash-confirm-wrap">
        <div class="dash-confirm-title">Mat No.</div>
        <div>{{ this.user.matNo }}</div>
      </div>
      <div v-if="school" class="dash-confirm-wrap">
        <div class="dash-confirm-title">Level.</div>
        <div>{{ level }}</div>
      </div>
      <div v-if="school" class="dash-confirm-wrap">
        <div class="dash-confirm-title">Department</div>
        <div>{{ school.department }}</div>
      </div>
      <div class="dash-confirm-wrap">
        <div class="dash-confirm-title">Payment for:</div>
        <div>{{ payment.name }}</div>
      </div>
      <div class="dash-confirm-wrap">
        <div class="dash-confirm-title">Payment Amount:</div>
        <div>N{{ formatNumber(payment.amount * 1) }}</div>
      </div>
      <div class="dash-confirm-wrap">
        <div class="dash-confirm-title">Payment Charge:</div>
        <div>N{{ formatNumber(payment.charges * 1) }}</div>
      </div>
      <div class="dash-confirm-wrap">
        <div class="dash-confirm-title">Total Amount:</div>
        <div>N{{ formatNumber(payment.amount * 1 + payment.charges * 1) }}</div>
      </div>
      <div class="dash-confirm-wrap">
        <div class="dash-confirm-title">Payment for Session</div>
        <div class="dash-custom-select">
          <div class="dash-custom-selecthead" @click="showYears = !showYears">
            <div>{{ year }}</div>
            <img
              src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
              loading="lazy"
              alt=""
              class="dash-select-icon"
            />
          </div>
          <div class="dash-custom-drop" :class="{ active: showYears }">
            <div
              v-for="(item, int) in getYearPairs()"
              :key="int"
              class="dash-custom-selecthead drop"
            >
              <div @click="selectYear(item, int)">{{ item }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="dash-confirm-wrap">
        <div class="dash-confirm-title">Confirm Payment</div>
        <div class="dash-paymentbtn" @click="payWithPaystack">Make Payment</div>
      </div>
    </div>
    <dashboard-loading v-else />
  </div>
</template>

<script>
import DashboardLoading from "../../components/Dashboard/DashboardLoading.vue";
export default {
  components: { DashboardLoading },
  layout: "dashboard",
  data() {
    return {
      bio: "",
      payment: "",
      level: 0,
      isLoaded: false,
      showYears: false,
      year: "Select Year",
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

    showModal(msg, warning, error, success) {
      const payload = {
        msg,
        warning,
        error,
        success,
      };
      this.$store.commit("dashboard/showModal", payload);
    },

    //     const paymentForm = document.getElementById('paymentForm');
    // paymentForm.addEventListener("submit", payWithPaystack, false);

    async sendPayment(form) {
      const payload = {
        form: form,
        url: `/transactions`,
      };
      const result = await this.$store.dispatch("dashboard/makePOST", payload);
      if (result.data) {
        alert(
          "Your payment is successful, it will take 48 hours to complete the process, thanks."
        );
        this.$router.push("/dashboard/payments");
      } else {
        alert("Sorry, something went wrong, payment could not be processed");
      }
    },

    payWithPaystack(e) {
      if (this.year == "Select Year") {
        this.showModal("Please select year of payment", false, true, false);
        return;
      }

      e.preventDefault();

      const user = this.user;
      const payment = this.payment;
      const sendPayment = this.sendPayment.bind(this); // Bind the correct context to sendPayment

      let handler = PaystackPop.setup({
        key: this.company.testKey, // Replace with your public key
        email: this.user.email,
        amount: (this.payment.amount * 1 + this.payment.charges * 1) * 100,
        ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
          alert("Window closed.");
        },
        callback: async function (response) {
          const form = {
            username: user.username,
            userId: user.id,
            email: user.email,
            amount: payment.amount,
            level: payment.level,
            year: this.level,
            image: payment.image,
            charges: payment.charges,
            time: new Date().getTime(),
            name: payment.name,
            paymentId: payment.id,
          };
          sendPayment(form);
        },
      });

      handler.openIframe();
    },

    selectYear(item, num) {
      const int = this.school.level * 1 - num * 100;

      if (int == 0) {
        const payload = {
          msg: "Sorry your cannot go blow 100 level",
          warning: false,
          error: true,
        };
        this.$store.commit("dashboard/showModal", payload);
        return;
      }
      this.level = int;
      this.year = item;
      this.showYears = false;
    },

    getYearPairs(startYear = 2000) {
      const currentYear = new Date().getFullYear();
      const pairs = [];

      for (let year = startYear; year < currentYear; year++) {
        pairs.push(`${year}/${year * 1 + 1}`);
      }

      return pairs.reverse();
    },
  },

  async mounted() {
    const bioId = this.$route.query.bioId;
    const payId = this.$route.query.payId;
    if (bioId) {
      const result = await this.$store.dispatch(
        "dashboard/makeGET",
        `/users/bio/?id=${bioId}`
      );
      this.bio = result.data;
    }
    if (payId) {
      const result = await this.$store.dispatch(
        "dashboard/makeGET",
        `/payments/?id=${payId}`
      );

      if (result) {
        this.isLoaded = true;
        this.payment = result.data;
      }
    }
  },

  computed: {
    company() {
      return this.$store.state.dashboard.company;
    },

    school() {
      this.level = this.$store.state.dashboard.userSchool.level;
      return this.$store.state.dashboard.userSchool;
    },

    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style></style>
