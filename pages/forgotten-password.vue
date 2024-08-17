<template>
  <div class="ero-section">
    <div class="ome-container">
      <div class="ero-flex">
        <div class="signup-form w-form">
          <div class="signup-flex">
            <div class="signup-left">
              <div class="signup-cover">
                <div class="signup-cover-div">
                  <div class="signup-text">Forgotten Password</div>
                  <div class="signup-instruction">
                    Enter the email you created your account with
                  </div>
                  <div class="signup-instruction">
                    You will receive a link to reset your password
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
              <div class="signup-text form">Forgotten Password</div>
              <div class="each-signup-wrapper">
                <label for="username" class="signup-label">Email</label
                ><input
                  class="each-signup-field w-input"
                  name="username"
                  placeholder="Ener Email"
                  type="text"
                  v-model="email"
                />
              </div>

              <div class="signup-read">
                Don't have an account?<NuxtLink to="/signup" class="click">
                  Click Here</NuxtLink
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
                  <div>Submit</div>
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
      title: `Schoolin | Forgotten Password`,
    };
  },
  data() {
    return {
      email: "",

      showResponse: false,
      isError: false,
      response: "",
      onRequest: false,

      isError: false,

      msg: "",
    };
  },
  methods: {
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
      if (input == "email") {
        if (data == "" || !data || !/^\S+@\S+\.\S+$/.test(data)) {
          this.response = "Please write a valid email.";
          this.isError = true;
          return true;
        } else {
          this.isError = false;
        }
      }
    },

    clearInputs() {
      this.email = "";
    },

    async processUserData() {
      this.setArray();
      this.checkArray.forEach((el) => {
        this.checkErrorInputs(el.name, el.data);
      });
      if (this.isError) {
        return;
      }
      const form = {
        email: this.email.trim(),
      };

      this.onRequest = true;

      try {
        const result = await this.$axios.post(
          "/users/forgotten-password",
          form
        );
        const msg = result.data.message;
        this.callResponse(msg, false);
        this.clearInputs();
      } catch (err) {
        this.callResponse(err.response.data.message, true);
      }
    },

    setArray() {
      this.checkArray = [{ name: "email", data: this.email }];
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
