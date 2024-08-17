<template>
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
                    Carefully fill in all the input fields to create and account
                  </div>
                  <div class="signup-instruction">
                    Ensure you verify your email after signing up.
                  </div>
                  <img
                    src="/Logo-White.png"
                    loading="lazy"
                    alt=""
                    class="logo"
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
                <label for="username" class="signup-label">Username</label
                ><input
                  class="each-signup-field w-input"
                  name="username"
                  placeholder="Ener Username"
                  type="text"
                  v-model="username"
                />
              </div>

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

              <div class="signup-read">
                Don't have an account?<NuxtLink to="/signup" class="click">
                  Click Here</NuxtLink
                >
              </div>
              <div class="signup-read">
                Fogotten password?<NuxtLink
                  to="/forgotten-password"
                  class="click"
                >
                  Click Here</NuxtLink
                >
              </div>

              <div class="btn-holder">
                <div v-if="onRequest" class="ome-btn">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8bd35f885fb184f5da056_loader-line-icon%201.svg"
                    loading="lazy"
                    alt=""
                    class="btn-icon spinning-icon spinner"
                  />
                  <div>Processing</div>
                </div>
                <div v-else class="ome-btn" @click="processUserData">
                  <div>Login</div>
                </div>
              </div>
              <div v-if="showResponse" class="msg" :class="{ error: isError }">
                {{ response }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomeNav from "../components/HomeNav.vue";
export default {
  components: { HomeNav },
  layout: "home",
  head() {
    return {
      title: `Schoolin | Login`,
    };
  },
  data() {
    return {
      username: "",
      password: "",
      complete: true,
      showPassword: false,

      competitionId: "",

      showResponse: false,
      isError: false,
      response: "",
      onRequest: false,

      isChecked: false,
      isError: false,

      usernameError: false,
      passwordError: false,
      msg: "",
    };
  },
  methods: {
    loadScript() {
      if (!process.server) {
        let el = document.getElementById("script");

        if (el != undefined) {
          document.body.removeChild(el);
        }

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "/script/home.js";
        script.async = true;
        script.id = "script";
        const app = document.querySelector("#footer");
        if (app) {
          app.appendChild(script);
        } else {
          console.error("Could not find app node to append script element");
        }
      }
    },

    callResponse(msg, state) {
      this.response = msg;
      this.isError = state;
      this.showResponse = true;
      this.onRequest = false;
      setTimeout(() => {
        this.showResponse = false;
      }, 6000);
    },

    checkErrorInputs(input, data) {
      if (input == "username") {
        if (
          data == "" ||
          !data ||
          data.length < 2 ||
          !/^[a-zA-Z0-9]+$/.test(data)
        ) {
          this.msg = ".username must be at least 2 caracters";
          this.isError = true;
          this.usernameError = true;
          return;
        } else {
          const parent = this.$el.querySelector(".username");
          this.msg = "";
          this.isError = false;
          this.usernameError = false;
        }
      } else if (input == "password") {
        if (data == "" || !data || data.length < 4) {
          this.msg = "password must be at least 4 caracters";
          this.isError = true;
          this.usernameError = true;
          return;
        } else {
          this.msg = "";
          this.isError = false;
          this.usernameError = false;
        }
      }
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    processUserData() {
      this.setArray();
      this.checkArray.forEach((el) => {
        this.checkErrorInputs(el.name, el.data);
      });
      if (this.isError) {
        return;
      }
      const form = {
        username: this.username.trim(),
        password: this.password.trim(),
      };

      this.onRequest = true;
      this.handleLogin(form);
    },

    async handleLogin(form) {
      try {
        const result = await this.$auth.loginWith("local", { data: form });
        const user = result.data.user;
        if (user.status == "Staff") {
          this.$router.push("/admin");
        }
        else if (this.competitionId) {
          this.$router.push(
            `/dashboard/competition-details/?id=${this.competitionId}`
          );
        } else {
          this.$router.push("/dashboard");
        }
        await this.$store.dispatch("dashboard/initializeUserDetails", user);
      } catch (err) {
        this.callResponse(err.response.data.message, true);
      }
    },

    setArray() {
      this.checkArray = [
        { name: "username", data: this.username },
        { name: "password", data: this.password },
      ];
    },
  },

  mounted() {
    // this.loadScript();
    const query = this.$route.query;
    // if (query.competitionId) {
    //   this.competitionId = query.competitionId;
    //   console.log(query);
    // }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
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
