<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Application<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
    </div>
    <div class="admin-plan-form w-form">
      <div class="admin-plan-form-flex">
        <div class="w-layout-grid grid-form">
          <div class="admin-input-wrapper">
            <label for="name-4" class="admin-input-label"
              >Application Name</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="company.companyName"
              placeholder="Enter Website Name"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="name-4" class="admin-input-label">Domain</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="company.companyDomain"
              placeholder="Enter Website URL"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="name-4" class="admin-input-label">System Email</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="company.systemEmail"
              placeholder="Enter Website Email"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="name-4" class="admin-input-label">Address</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="company.companyAddress"
              placeholder="Enter Company Address"
            />
          </div>

          <div class="admin-input-wrapper">
            <label for="name-4" class="admin-input-label">Phone</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="company.companyPhone"
              placeholder="Enter Website Phone"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="name-4" class="admin-input-label">Bank Name</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="company.companyBank"
              placeholder="Enter Bank Name"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="members" class="admin-input-label">Account Name</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="company.companyAccountName"
              placeholder="Enter Account Name"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="members-2" class="admin-input-label"
              >Account Number</label
            ><input
              type="tel"
              class="admin-text-input w-input"
              v-model="company.companyAccountNumber"
              placeholder="Enter Account Number"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="members-3" class="admin-input-label"
              >Active Members</label
            ><input
              type="number"
              class="admin-text-input w-input"
              v-model="company.activeMembers"
              placeholder="Enter Registered Members"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="members-3" class="admin-input-label"
              >Daily Increase</label
            ><input
              type="number"
              class="admin-text-input w-input"
              v-model="company.dailyIncrease"
              placeholder="Enter Daily Increase"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="Password" class="admin-input-label">Password</label
            ><input
              type="password"
              class="admin-text-input w-input"
              v-model="oldPassword"
              placeholder="Enter Old Password"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="Password-3" class="admin-input-label"
              >New Password</label
            ><input
              type="password"
              class="admin-text-input w-input"
              v-model="password"
              placeholder="Enter New Password"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="Password-2" class="admin-input-label"
              >Confirm Password</label
            ><input
              type="password"
              class="admin-text-input w-input"
              v-model="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <div class="admin-btn-holder">
          <div v-if="onRequest" class="admin-cus-btn">
            <img
              src="/images/admin/spinner-white.svg"
              loading="lazy"
              alt=""
              class="admin-btn-icon"
            />
            <div>Processing</div>
          </div>
          <div @click="reset" class="admin-cus-btn">
            <div>Reset Company</div>
          </div>
          <div @click="processData" class="admin-cus-btn">
            <div>Submit</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",

  data() {
    return {
      oldPassword: "",
      password: "",
      confirmPassword: "",
      onRequest: "",
    };
  },
  methods: {
    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
    },

    formatNumberToDate(inputNumber) {
      if (typeof inputNumber !== "number") {
        return "Not Available";
      }

      const date = new Date(inputNumber);

      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    },

    formatDateToTime(date) {
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    formatDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.toLocaleString("default", { month: "short" });
      const year = today.getFullYear();

      // Function to add ordinal suffix to the day
      const addOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return day + "th";
        } else {
          switch (day % 10) {
            case 1:
              return day + "st";
            case 2:
              return day + "nd";
            case 3:
              return day + "rd";
            default:
              return day + "th";
          }
        }
      };

      const formattedDate = `${addOrdinalSuffix(day)} ${month}, ${year}`;
      return formattedDate;
    },

    async processData() {
      if (this.password !== this.confirmPassword) {
        this.showModal(
          "Please correct, passwords are not the same",
          false,
          true,
          false
        );
        return;
      }

      const form = {
        password: this.password,
        oldPassword: this.oldPassword,
        confirmPassword: this.confirmPassword,
        company: this.company,
        id: this.user.id,
      };

      this.onRequest = true;
      const payload = {
        form: form,
        url: `/company/?id=${this.company.id}`,
      };
      const result = await this.$store.dispatch("admin/makePOST", payload);
      this.handleResponse(result);
    },

    reset() {
      this.showModal(
        `Are you sure you want to delete every records and reset the company?`,
        true,
        false,
        false,

        `mass-delete`,
        `/company/reset`
      );
    },

    handleResponse(result) {
      this.onRequest = false;
      if (result.response) {
        this.showModal(
          result.response.data.message,
          false,
          result.response.data.error,
          !result.response.data.error
        );
      }

      if (result.data) {
        this.showModal(
          "Company was updated successfully",
          false,
          result.data.error,
          !result.data.error
        );
        if (!result.data.error) {
          this.$store.dispatch(`admin/initializeAdminDetails`);
        }
      }
    },

    showModal(msg, warning, error, success, action, url) {
      const payload = {
        msg: msg,
        isWarning: warning,
        isError: error,
        isSuccess: success,
        table: "",
        action: action,
        url: url,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload);
    },
  },

  computed: {
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

    company() {
      return JSON.parse(JSON.stringify(this.$store.state.admin.company));
    },

    url() {
      return this.$store.state.admin.modalURL;
    },

    responseMsg() {
      return this.$store.state.admin.modalMsg;
    },
  },
};
</script>

<style></style>
