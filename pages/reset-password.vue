<template>
  <div>
    <div class="ero-section">
      <div class="ome-container">
        <div class="ero-flex">
          <div class="signup-form w-form">
            <div class="signup-flex">
              <div class="signup-left">
                <div class="signup-cover">
                  <div class="signup-cover-div">
                    <div class="signup-text">Sign Up</div>
                    <div class="signup-instruction">
                      Carefully fill in all the input fields to create and
                      account
                    </div>
                    <div class="signup-instruction">
                      Ensure you verify your email after signing up.
                    </div>
                    <img
                      src="/Logo-White.png"
                      loading="lazy"
                      alt=""
                      class="logo mt-auto"
                    />
                  </div>
                </div>
                <img
                  src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658acc269aed817e6009eb5a_chemistry-beakers_27c5571306.jpg"
                  loading="lazy"
                  sizes="(max-width: 479px) 100vw, (max-width: 991px) 47vw, 398.888916015625px"
                  srcset="
                    https://assets-global.website-files.com/6589c40c00518a27e22bd153/658acc269aed817e6009eb5a_chemistry-beakers_27c5571306-p-500.jpg   500w,
                    https://assets-global.website-files.com/6589c40c00518a27e22bd153/658acc269aed817e6009eb5a_chemistry-beakers_27c5571306-p-800.jpg   800w,
                    https://assets-global.website-files.com/6589c40c00518a27e22bd153/658acc269aed817e6009eb5a_chemistry-beakers_27c5571306-p-1080.jpg 1080w,
                    https://assets-global.website-files.com/6589c40c00518a27e22bd153/658acc269aed817e6009eb5a_chemistry-beakers_27c5571306.jpg        1200w
                  "
                  alt=""
                  class="cover-im"
                />
              </div>
              <div class="signup-right">
                <div class="signup-text form">Sign Up</div>
                <div class="each-signup-wrapper">
                  <label for="password" class="signup-label">Password</label
                  ><img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8c295321868de025e7b97_eye-look-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="password-icon"
                    v-if="showPassword"
                    @click="togglePasswordVisibility"
                  />
                  <img
                    v-else
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8c295f1b955b8ebafda3b_hide-private-hidden-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="password-icon"
                    @click="togglePasswordVisibility"
                  />
                  <input
                    class="each-signup-field w-input"
                    v-model="password"
                    placeholder="Ener Password"
                    :type="passwordFieldType"
                  />
                </div>
                <div class="each-signup-wrapper">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8c295321868de025e7b97_eye-look-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="password-icon"
                    v-if="showPassword"
                    @click="togglePasswordVisibility"
                  />
                  <img
                    v-else
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8c295f1b955b8ebafda3b_hide-private-hidden-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="password-icon"
                    @click="togglePasswordVisibility"
                  />
                  <label for="password-2" class="signup-label"
                    >Confirm Password</label
                  >
                  <input
                    class="each-signup-field w-input"
                    v-model="confirmPassword"
                    :type="passwordFieldType"
                    placeholder="Confirm Password"
                  />
                </div>
                <div class="signup-read">
                  Already have an account?<NuxtLink to="/login" class="click">
                    Click Here</NuxtLink
                  >
                </div>
                <div>
                  By submitting this form, you have agreed to our?<NuxtLink
                    to="/terms"
                    class="click"
                  >
                    Terms &amp; Conditions</NuxtLink
                  >
                </div>
                <div class="btn-holder">
                  <div v-if="onRequest" class="ome-btn">
                    <img
                      src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8bd35f885fb184f5da056_loader-line-icon%201.svg"
                      loading="lazy"
                      alt=""
                      class="btn-icon spinning-icon"
                    />
                    <div>Processing</div>
                  </div>
                  <div v-else class="ome-btn" @click="processUserData">
                    <div>Sign Up</div>
                  </div>
                </div>
                <div
                  v-if="showResponse"
                  class="msg"
                  :class="{ error: isError }"
                >
                  {{ response }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "home",
  head() {
    return {
      title: `Schoolin | Sign Up`,
    };
  },
  data() {
    return {
      response: "",
      isError: false,
      showResponse: false,
      onRequest: false,
      showPassword: false,

      phoneNumber: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isChecked: false,

      referral: "",

      signup: "",
    };
  },

  methods: {
    checkErrorInputs(input, data) {
      if (input == "username") {
        if (data == "" || !data || data.length < 2 || !/^\w+$/.test(data)) {
          this.isError = true;
          this.response = "Username must be at least 2 characters long.";
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "email") {
        if (data == "" || !data || !/^\S+@\S+\.\S+$/.test(data)) {
          this.response = "Please write a valid email.";
          this.isError = true;
          return true;
        } else {
          this.isError = false;
        }
      } else if (input === "phoneNumber") {
        if (!data || data.length < 11 || !/^[0-9+]+$/.test(data)) {
          this.response = "Please enter a valid phone number.";
          this.isError = true;
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "password") {
        if (data == "" || !data || data.length < 4) {
          this.response = "Password must be at least 4 characters long.";
          this.isError = true;
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "confirmPassword") {
        if (data != this.password || data == "") {
          this.response = "Passwords do not match.";
          this.isError = true;
          return true;
        } else {
          this.isError = false;
        }
      }
    },

    callResponse(msg, state) {
      this.response = state
        ? msg
        : "Congratulations... Your registration is successful. You will be redirected to login page.";
      this.isError = state;
      this.showResponse = true;
      this.onRequest = false;
      if (!state) {
        setTimeout(() => {
          this.showResponse = false;
          this.$router.push("/login");
        }, 6000);
      }
    },

    clearInputs() {
      this.username = "";
      this.phoneNumber = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.isChecked = false;
    },

    setArray() {
      this.checkArray = [
        { name: "username", data: this.username },
        { name: "email", data: this.email },
        { name: "phoneNumber", data: this.phoneNumber },
        { name: "password", data: this.password },
        { name: "confirmPassword", data: this.confirmPassword },
      ];
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    async processUserData() {
      this.setArray();
      for (let i = 0; i < this.checkArray.length; i++) {
        const el = this.checkArray[i];
        const result = this.checkErrorInputs(el.name, el.data);
        if (result) {
          break; // This will exit the entire loop
        }
      }

      if (this.isError) {
        this.showResponse = true;
        return;
      }

      const form = {
        username: this.username,
        email: this.email,
        phoneNumber: this.phoneNumber,
        dateCreated: new Date().getTime(),
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      this.onRequest = true;

      try {
        const result = await this.$axios.post("/users/sign", form);
        console.log(result);
        const msg = result.data.message;
        this.callResponse(msg, false);
        this.clearInputs();
      } catch (err) {
        console.log(err.response);
        this.callResponse(err.response.data.message, true);
      }
    },
  },

  computed: {
    countries() {
      return this.$store.state.registrationDetails.countries;
    },

    passwordFieldType() {
      return this.showPassword ? "text" : "password";
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style></style>
