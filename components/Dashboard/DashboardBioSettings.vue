<template>
  <div>
    <div v-if="isLoaded" class="dash-profile-location">
      <div class="dashmain-more-news desc text" style="margin-top: 0">
        <textarea
          placeholder="Write your bio... Tell people about your potential."
          maxlength="5000"
          class="dash-profile-desc text w-input"
          v-model="bio"
        ></textarea>
      </div>
      <div class="w-layout-grid form">
        <div>
          <div class="dash-profile-label">First Name</div>
          <input
            class="dash-profile-input w-input"
            placeholder="First Name"
            type="text"
            v-model="firstName"
          />
        </div>
        <div>
          <div class="dash-profile-label">Middle Name</div>
          <input
            class="dash-profile-input w-input"
            placeholder="Middle Name"
            type="text"
            v-model="middleName"
          />
        </div>
        <div>
          <div class="dash-profile-label">Last Name</div>
          <input
            class="dash-profile-input w-input"
            placeholder="Last Name"
            type="text"
            v-model="lastName"
          />
        </div>
        <div>
          <div class="dash-profile-label">
            Date of Birth
            <span style="color: blue" v-if="dob && dob != 0">{{
              formatDate(dob)
            }}</span>
          </div>
          <input
            class="dash-profile-input w-input"
            placeholder="Last Name"
            type="date"
            v-model="dob"
          />
        </div>
        <div>
          <div
            id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f87cd-427cc6e7"
            class="dash-profile-label"
          >
            Gender
          </div>
          <div class="dash-check-wrapper">
            <div class="dash-each-check" @click="setGender('Male')">
              <div class="dash-box">
                <div v-if="gender == 'Male'" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">Male</div>
            </div>
            <div class="dash-each-check" @click="setGender('Female')">
              <div class="dash-box">
                <div v-if="gender == 'Female'" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">Female</div>
            </div>
            <div class="dash-each-check" @click="setGender('Others')">
              <div class="dash-box">
                <div v-if="gender == 'Others'" class="dash-box-dot"></div>
              </div>
              <div class="dash-select-headtext">Others</div>
            </div>
          </div>
        </div>
        <div>
          <div
            id="w-node-eb5c6656-00fd-f2ab-ee83-12f0665f87cd-427cc6e7"
            class="dash-profile-label"
          >
            Merital Status
          </div>
          <div class="dash-check-wrapper">
            <div class="dash-each-check" @click="setMarritalStatus('Single')">
              <div class="dash-box">
                <div
                  v-if="maritalStatus == 'Single'"
                  class="dash-box-dot"
                ></div>
              </div>
              <div class="dash-select-headtext">Single</div>
            </div>
            <div class="dash-each-check" @click="setMarritalStatus('Married')">
              <div class="dash-box">
                <div
                  v-if="maritalStatus == 'Married'"
                  class="dash-box-dot"
                ></div>
              </div>
              <div class="dash-select-headtext">Married</div>
            </div>
          </div>
        </div>
      </div>
      <div class="passport">
        <div class="dash-profile-img pass">
          <div class="display-cover">
            <label for="picture" class="label-input abs">
              <span class="material-symbols-outlined" style="color: aliceblue">
                add_a_photo
              </span>
              <input
                @change="setImage"
                type="file"
                class="hide"
                id="picture"
                accept="image/*"
              />
            </label>
          </div>
          <img
            v-if="imageUrl"
            :src="`${imageUrl}`"
            loading="lazy"
            sizes="(max-width: 479px) 55.55555725097656px, 75.55555725097656px"
            :srcset="`
                ${imageUrl}  500w,
                ${imageUrl}  800w,
                ${imageUrl}       1000w`"
            alt=""
            class="responsive-img"
          />
          <img
            v-if="image && !imageUrl"
            :src="`${FILE_URL}/${image}`"
            loading="lazy"
            sizes="(max-width: 479px) 55.55555725097656px, 75.55555725097656px"
            :srcset="`
                ${FILE_URL}/${image}  500w,
                ${FILE_URL}/${image}  800w,
                ${FILE_URL}/${image}       1000w`"
            alt=""
            class="responsive-img"
          />
          <span
            v-if="!imageUrl && !image"
            class="material-symbols-outlined"
            style="color: aliceblue; font-size: 60px"
          >
            account_circle
          </span>
        </div>
        <div v-if="!image" class="dash-username" style="margin-top: 5px">
          Kindly upload a private passport photograph
        </div>
      </div>
      <div class="dash-paymentbtn set" v-if="onRequest">
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

      <!-- <div class="dash-show-response error">Please Select course to add</div> -->
    </div>

    <dashboard-loading v-else />
  </div>
</template>

<script>
import DashboardLoading from "./DashboardLoading.vue";
export default {
  components: { DashboardLoading },
  data() {
    return {
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      gender: "",
      maritalStatus: "",
      bio: "",
      image: "",
      imageUrl: "",
      bioObj: "",
      isLoaded: false,
    };
  },

  methods: {
    setGender(gender) {
      this.gender = gender;
    },

    setMarritalStatus(status) {
      this.maritalStatus = status;
    },

    setImage(e) {
      this.image = e.target.files[0];

      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imageUrl = reader.result;
      });
      reader.readAsDataURL(file);
    },

    isBelow16YearsOfBirth(dateOfBirth) {
      const dob = new Date(dateOfBirth).getTime();

      const today = new Date().getTime();

      const diffMs = today - dob;

      const age = diffMs / (1000 * 60 * 60 * 24 * 365.25);

      console.log(age);

      return age < 16;
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

    formatDate(data) {
      if (data == null || data == undefined) {
        return "N/A";
      }
      const date = new Date(this.dob * 1).getTime(); // Note that month is zero-indexed in JavaScript
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

    populateData(item) {
      this.bio = item.bio;
      this.firstName = item.firstName;
      this.middleName = item.middleName;
      this.lastName = item.lastName;
      this.gender = item.gender;
      this.maritalStatus = item.maritalStatus;
      this.dob = item.dob;
      this.image = item.image;
      this.isLoaded = true;
    },

    processData() {
      const age = this.isBelow16YearsOfBirth(this.dob);

      if (age || !this.dob) {
        this.showPopUp(
          "Sorry you can't be less than 16 years of age",
          true,
          false,
          true
        );
        return;
      }
      const form = new FormData();
      if (!this.firstName) {
        this.showPopUp(
          "Sorry please fill in your first name",
          true,
          false,
          true
        );
        return;
      }
      if (!this.middleName) {
        this.showPopUp(
          "Sorry please fill in your middle name",
          true,
          false,
          true
        );
        return;
      }
      if (!this.lastName) {
        this.showPopUp(
          "Sorry please fill in your last name",
          true,
          false,
          true
        );
        return;
      }
      if (!this.gender) {
        this.showPopUp("Sorry please fill in your gender", true, false, true);
        return;
      }
      if (!this.maritalStatus) {
        this.showPopUp(
          "Sorry please select your marital status",
          true,
          false,
          true
        );
        return;
      }
      if (!this.bio) {
        this.showPopUp(
          "Sorry please fill in small description in your bio",
          true,
          false,
          true
        );
        return;
      }
      if (!this.image) {
        this.showPopUp(
          "Sorry please upload a passport photo of your face",
          true,
          false,
          true
        );
        return;
      }

      if (!this.bioObj.firstName) {
        form.append("firstName", this.firstName);
      }
      if (!this.bioObj.middleName) {
        form.append("middleName", this.middleName);
      }
      if (!this.bioObj.lastName) {
        form.append("lastName", this.lastName);
      }
      if (!this.bioObj.dob || this.bioObj.dob == 0) {
        form.append("dob", Number(new Date(this.dob).getTime()));
      }
      if (!this.bioObj.gender) {
        form.append("gender", this.gender);
      }
      if (!this.bioObj.maritalStatus) {
        form.append("maritalStatus", this.maritalStatus);
      }

      form.append("bio", this.bio);
      form.append("image", this.image);

      const payload = {
        msg: "Note, some of these information can only be changed through customer support.",
        warning: true,
        error: false,
        url: `/users/bio/?id=${this.user.id}`,
        action: "post",
        dataType: "user",
        data: form,
      };
      this.$store.commit("dashboard/showModal", payload);
    },
  },

  async mounted() {
    if (this.userBio) {
      const item = JSON.parse(JSON.stringify(this.userBio));
      this.populateData(item);
    } else {
      const result = await this.$store.dispatch(
        "dashboard/makeGET",
        `/users/bio/?id=${this.user.id}`
      );

      this.$store.commit("dashboard/setUserBio", result.data);
      const item = JSON.parse(JSON.stringify(this.userBio));
      this.populateData(item);
    }
  },

  computed: {
    onRequest() {
      return this.$store.state.dashboard.onRequest;
    },

    user() {
      return this.$store.state.auth.user;
    },

    userBio() {
      return this.$store.state.dashboard.userBio;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
