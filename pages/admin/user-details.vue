<template>
  <div class="admin-container" v-if="user">
    <div class="admin-home-flex">
      <h2 class="admin-page-title -mb-4">
        {{ user.username }} Profile<span class="admin-page-time amount">{{
          user.school
        }}</span>
      </h2>
    </div>
    <div class="admin-plan-form w-form">
      <div class="admin-plan-form-flex">
        <div class="w-layout-grid grid-form">
          <div class="admin-input-wrapper">
            <label for="username" class="admin-input-label">Username</label
            ><input
              type="text"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="user.username"
              placeholder="Enter Username"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="name-4" class="admin-input-label">Full Name</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="user.fullName"
              placeholder="Enter Full Name"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="email" class="admin-input-label">Email</label
            ><input
              type="email"
              class="admin-text-input w-input"
              v-model="user.email"
              placeholder="Enter Email"
            />
          </div>
          <div
            v-if="user.referralType == 'Manager'"
            class="admin-input-wrapper"
          >
            <label for="pone" class="admin-input-label">Manager Level</label
            ><input
              type="number"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="user.managerLevel"
              placeholder="Enter Phone Number"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="dob" class="admin-input-label">Referral Type</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="user.referralType"
            />
          </div>

          <!-- <div class="admin-input-wrapper">
              <label for="name-5" class="admin-input-label">Gender </label>
              <div class="admin-text-input" @click="showGender = !showGender">
                <div v-if="gender">{{ gender }}</div>
                <div v-else>Select Gender</div>
                <img
                  src="/images/admin/caret-down-blue.svg"
                  loading="lazy"
                  alt=""
                  class="admin-input-icon"
                />
              </div>
              <ul
                role="list"
                class="admin-action-list input -mt-1"
                :class="{ hide: !showGender }"
              >
                <li
                  v-for="(item, int) in genders"
                  :key="int"
                  class="admin-action-listitems"
                  @click="setItem(item)"
                >
                  <div>{{ item }}</div>
                </li>
              </ul>
            </div>
            <div class="admin-input-wrapper">
              <label for="name-5" class="admin-input-label"
                >Country <span class="admin-marked">*</span>
              </label>
              <div class="admin-text-input" @click="showCountry = !showCountry">
                <div v-if="country">{{ country }}</div>
                <div v-else>Select Country</div>
                <img
                  src="/images/admin/caret-down-blue.svg"
                  loading="lazy"
                  alt=""
                  class="admin-input-icon"
                />
              </div>
              <ul
                role="list"
                class="admin-action-list input"
                :class="{ hide: !showCountry }"
              >
                <li
                  v-for="(item, int) in storePlace.countries"
                  :key="int"
                  class="admin-action-listitems"
                  @click="setCountry(item)"
                >
                  <div>{{ item.country }}</div>
                </li>
              </ul>
            </div> -->

          <div class="admin-input-wrapper">
            <label for="Password-4" class="admin-input-label">Password</label
            ><input
              type="password"
              class="admin-text-input w-input"
              maxlength="256"
              placeholder="Enter New Password"
              v-model="password"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="Password-4" class="admin-input-label"
              >New Password</label
            ><input
              type="password"
              class="admin-text-input w-input"
              maxlength="256"
              placeholder="New Password"
              v-model="newPassword"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="Password-4" class="admin-input-label"
              >Confirm Password</label
            ><input
              type="password"
              class="admin-text-input w-input"
              maxlength="256"
              placeholder="Confirm Password"
              v-model="confirmPassword"
            />
          </div>

          <div
            v-for="(item, int) in wallets"
            :key="int"
            class="admin-input-wrapper"
          >
            <div class="admin-user-wall">
              <img
                :src="`${FILE_URL}/${item.image}`"
                loading="lazy"
                width="25"
                alt=""
                class="admin-user-walleticon"
              /><label for="Password-5" class="admin-input-label">{{
                item.walletName
              }}</label
              ><label for="Password-5" class="admin-input-label bal"
                >${{ item.balance.toLocaleString("en-US") }}</label
              >
            </div>
            <div class="admin-user-walflex">
              <input
                type="text"
                class="admin-text-input address w-input"
                maxlength="256"
                v-model="item.walletAddress"
                placeholder="Enter Wallet Address"
              /><input
                type="number"
                class="admin-text-input bal w-input"
                maxlength="256"
                placeholder="Enter Amount"
                @blur="updateBalance($event, item, item.balance)"
              />
            </div>
          </div>
        </div>

        <!-- <div class="admin-validation-msg">
            Please Enter all Marked * Fields Correctly
          </div> -->

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
          <div v-else class="admin-cus-btn" @click="processData">
            <div>Submit</div>
          </div>
        </div>
      </div>
    </div>
    <div class="admin-home-flex"></div>
    <h2 class="admin-page-title -mb-4">Create Transaction</h2>

    <create-transaction
      :user="user"
      :username="user.username"
      :wallets="wallets"
    />

    <admin-transactions />
  </div>
</template>

<script>
import AdminTransactions from "../../components/AdminTransactions";
export default {
  components: { AdminTransactions },
  layout: "admin",

  data() {
    return {
      user: null,
      username: "",
      fullName: "",
      email: "",
      totalBalance: "",
      dateCreated: "",
      phoneNumber: "",
      dob: "",
      gender: "",
      country: "",
      wallets: [],

      password: "",
      newPassword: "",
      confirmPassword: "",

      onRequest: false,
      showGender: false,
      genders: ["Male", "Female", "Others"],
      showCountry: false,
      editingId: null,
    };
  },

  methods: {
    setItem(item) {
      gender.value = item;
      showGender.value = false;
    },

    setCountry(item) {
      country.value = item.country;
      showCountry.value = false;
    },

    clearInputs() {},

    updateBalance(e, item, number) {
      let amount = e.target.value * 1;
      if (!isNaN(amount)) {
        amount = amount * 1;
        const sum = number + amount;
        if (sum >= 0) {
          item.balance = sum;
        }
      }
    },

    async processData() {
      const form = {
        wallets: this.wallets,
        user: this.user,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      this.onRequest = true;

      const payload = {
        form: form,
        url: `/users/update-user/?id=${this.user.id}`,
      };

      const result = await this.$store.dispatch("admin/makePOST", payload);

      if (result) {
        this.onRequest = false;
      }
      const payload1 = {
        msg: result.data.message,
        isWarning: false,
        isError: result.data.error,
        isSuccess: !result.data.error,
        table: "",
        action: "",
        url: ``,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload1);

      if (!result.data.error) {
        this.$store.dispatch(`admin/initializeAdminDetails`);
      }
    },
  },

  async mounted() {
    const result = await this.$store.dispatch(
      "admin/makeGET",
      `/users/?id=${this.$route.query.id}`
    );
    this.user = result.data;
  },

  computed: {
    isUserAvailable() {
      return storeState.user.length > 0;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>

<style></style>
