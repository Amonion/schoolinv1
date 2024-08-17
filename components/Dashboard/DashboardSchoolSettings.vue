<template>
  <div>
    <div v-if="isLoaded" class="dash-profile-location">
      <!-- <div class="dashboard-slider-headline prof">My Info...</div> -->
      <div class="w-layout-grid">
        <div>
          <div class="dash-profile-label">Country of School</div>
          <div class="dash-custom-select">
            <div
              @click="showCountries = !showCountries"
              class="dash-custom-selecthead location"
            >
              <div class="dash-select-headtext">{{ country }}</div>
              <img
                src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                loading="lazy"
                alt=""
                class="dash-select-icon"
              />
            </div>
            <div class="dash-custom-drop" :class="{ active: showCountries }">
              <div
                v-for="item in countries"
                :key="item.id"
                class="dash-custom-selecthead drop"
                @click="setCountry(item)"
              >
                {{ item.country }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="dash-profile-label">State of School</div>
          <div class="dash-custom-select">
            <div
              @click="showStates = !showStates"
              class="dash-custom-selecthead location"
            >
              <div class="dash-select-headtext">{{ state }}</div>
              <img
                src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                loading="lazy"
                alt=""
                class="dash-select-icon"
              />
            </div>
            <div class="dash-custom-drop" :class="{ active: showStates }">
              <div
                @click="setState(item)"
                v-for="item in states"
                :key="item.id"
                class="dash-custom-selecthead drop"
              >
                {{ item.state }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="dash-profile-label">LGA of School</div>
          <div class="dash-custom-select">
            <div
              @click="showLga = !showLga"
              class="dash-custom-selecthead location"
            >
              <div class="dash-select-headtext">{{ lga }}</div>
              <img
                src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                loading="lazy"
                alt=""
                class="dash-select-icon"
              />
            </div>
            <div class="dash-custom-drop" :class="{ active: showLga }">
              <div
                @click="setLga(item)"
                v-for="item in lgas"
                :key="item.id"
                class="dash-custom-selecthead drop"
              >
                {{ item.lga }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="dash-profile-label">School</div>
          <div class="dash-custom-select">
            <div
              @click="showSchools = !showSchools"
              class="dash-custom-selecthead location"
            >
              <div class="dash-select-headtext">{{ school }}</div>
              <img
                src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                loading="lazy"
                alt=""
                class="dash-select-icon"
              />
            </div>
            <div class="dash-custom-drop" :class="{ active: showSchools }">
              <div
                @click="setSchool(item)"
                v-for="item in schools"
                :key="item.id"
                class="dash-custom-selecthead drop"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="dash-profile-label">Faculty</div>
          <div class="dash-custom-select">
            <div
              @click="showFaculties = !showFaculties"
              class="dash-custom-selecthead location"
            >
              <div class="dash-select-headtext">{{ faculty }}</div>
              <img
                src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                loading="lazy"
                alt=""
                class="dash-select-icon"
              />
            </div>
            <div class="dash-custom-drop" :class="{ active: showFaculties }">
              <div
                @click="setFaculty(item)"
                v-for="item in faculties"
                :key="item.id"
                class="dash-custom-selecthead drop"
              >
                {{ item.faculty }}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="dash-profile-label">Department</div>
          <div class="dash-custom-select">
            <div
              @click="showDepartments = !showDepartments"
              class="dash-custom-selecthead location"
            >
              <div class="dash-select-headtext">{{ department }}</div>
              <img
                src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                loading="lazy"
                alt=""
                class="dash-select-icon"
              />
            </div>
            <div class="dash-custom-drop" :class="{ active: showDepartments }">
              <div
                @click="setDepartment(item)"
                v-for="item in departments"
                :key="item.id"
                class="dash-custom-selecthead drop"
              >
                {{ item.department }}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="dash-profile-label">Level</div>
          <div class="dash-custom-select">
            <div
              @click="showLevels = !showLevels"
              class="dash-custom-selecthead location"
            >
              <div class="dash-select-headtext">{{ level }}</div>
              <img
                src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
                loading="lazy"
                alt=""
                class="dash-select-icon"
              />
            </div>
            <div class="dash-custom-drop" :class="{ active: showLevels }">
              <div
                @click="setLevel(item)"
                v-for="item in levels"
                :key="item"
                class="dash-custom-selecthead drop"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="dash-profile-label">Mat. Number</div>
          <input
            class="dash-profile-input w-input"
            placeholder="Enter Mat Number"
            type="text"
            v-model="matNo"
          />
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
    </div>
    <dashboard-loading v-else />
  </div>
</template>

<script>
export default {
  data() {
    return {
      onRequest: false,

      country: "Select Country",
      showCountries: false,
      state: "Select State",
      showStates: false,
      lga: "Select LGA",
      showLga: false,
      school: "Select School",
      showSchools: false,
      faculty: "Select Faculty",
      showFaculties: false,
      facultyObj: "",
      department: "Select Department",
      matNo: "",
      departmentObj: "",
      showDepartments: false,
      schoolObj: "",
      levels: [100, 200, 300, 400, 500],
      level: "Select Level",
      showLevels: false,

      response: "",
      isLoaded: false,
      isEditing: false,
      editingId: null,
    };
  },

  methods: {
    setCountry(country) {
      this.country = country.country;
      this.showCountries = false;

      this.state = "Select State";
      this.showStates = false;
      this.lga = "Select LGA";
      this.showLga = false;
      this.$store.dispatch(
        "dashboard/getStates",
        `/places/?limit=60&page=1&sort=state&country=${country.country}&distinct=state`
      );
    },

    setState(state) {
      this.state = state.state;
      this.showStates = false;

      this.lga = "Select LGA";
      this.showLga = false;
      this.$store.dispatch(
        "dashboard/getLgas",
        `/places/?limit=60&page=1&sort=lga&state=${state.state}`
      );
    },

    setLga(lga) {
      this.lga = lga.lga;
      this.showLga = false;

      this.school = "Select School";
      this.showSchools = false;
      this.$store.dispatch(
        "dashboard/getSchools",
        `/schools/?limit=60&page=1&sort=lga&lga=${lga.lga}`
      );
    },

    setSchool(school) {
      this.schoolObj = school;
      this.showSchools = false;
      this.school = school.name;

      this.faculty = "Select Faculty";
      this.showFaculties = false;
      this.$store.dispatch(
        "dashboard/getFaculties",
        `/faculties/?limit=60&page=1&schoolId=${school.id}`
      );
    },

    setFaculty(item) {
      this.facultyObj = item;
      this.showFaculties = false;
      this.faculty = item.faculty;

      this.department = "Select Department";
      this.showDepartments = false;
      this.$store.dispatch(
        "dashboard/getDepartments",
        `/departments/?limit=60&page=1&facultyId=${item.id}`
      );
    },

    setDepartment(item) {
      this.departmentObj = item;
      this.showDepartments = false;
      this.department = item.department;
      this.departmentObj = item;

      this.level = "Select Level";
      this.showLevels = false;
    },

    setLevel(level) {
      this.level = level;
      this.showLevels = false;
    },

    formatDate(time) {
      const today = new Date(time);
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

    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    showModal(msg, error, success, warning, action, data, dataType, url) {
      const payload = {
        msg: msg,
        warning: warning,
        error: error,
        success: success,
        url: url,
        action: action,
        dataType: dataType,
        data: data,
      };
      this.$store.commit("dashboard/showModal", payload);
    },

    checkErrorInputs(input, data) {
      if (input == "country") {
        if (data == "Select Country") {
          this.isError = true;
          this.response = "Please select country to continue.";
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "state") {
        if (data == "Select State") {
          this.isError = true;
          this.response = "Please select state to continue.";
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "lga") {
        if (data == "Select Lga") {
          this.isError = true;
          this.response = "Please select lga to continue.";
          return true;
        } else {
          this.isError = false;
        }
      } else if (input == "school") {
        if (data == "Select School") {
          this.isError = true;
          this.response = "Please select school to continue.";
          return true;
        } else {
          this.isError = false;
        }
      }
    },

    populateData(item) {
      this.country = item.country ? item.country : "Select Country";
      this.state = item.state ? item.state : "Select State";
      this.lga = item.lga ? item.lga : "Select LGA";
      this.school = item.school ? item.school : "Select School";
      this.faculty = item.faculty ? item.faculty : "Select Faculty";
      this.department = item.department ? item.department : "Select Department";
      this.level = item.level ? item.level : "Select Level";
      this.schoolObj = item;
      this.isLoaded = true;
    },

    setArray() {
      this.checkArray = [
        { name: "country", data: this.country },
        { name: "state", data: this.state },
        { name: "lga", data: this.lga },
        { name: "school", data: this.school },
      ];
    },

    processData() {
      const form = new FormData();
      if (this.country == "Select Country") {
        this.showPopUp(
          "Sorry please select in your country",
          true,
          false,
          true
        );
        return;
      }
      if (this.state == "Select State") {
        this.showPopUp("Sorry please select in your state", true, false, true);
        return;
      }
      if (this.lga == "Select LGA") {
        this.showPopUp(
          "Sorry please select in your school lga",
          true,
          false,
          true
        );
        return;
      }
      if (this.school == "Select School") {
        this.showPopUp("Sorry please select in your school", true, false, true);
        return;
      }
      if (this.faculty == "Select Faculty") {
        this.showPopUp(
          "Sorry please select in your faculty",
          true,
          false,
          true
        );
        return;
      }
      if (this.department == "Select Department") {
        this.showPopUp(
          "Sorry please select in your department",
          true,
          false,
          true
        );
        return;
      }
      if (this.level == "Select Level") {
        this.showPopUp("Sorry please select in your level", true, false, true);
        return;
      }

      form.append("country", this.country);
      form.append("state", this.state);
      form.append("lga", this.lga);
      form.append("school", this.school);
      form.append("schoolId", this.schoolObj.id);
      form.append("schoolUsername", this.schoolObj.username);
      form.append("faculty", this.faculty);
      form.append("facultyId", this.facultyObj.id);
      form.append("duration", this.facultyObj.duration);
      form.append("department", this.department);
      form.append("matNo", this.matNo);
      form.append("departmentId", this.departmentObj.id);
      form.append("username", this.user.username);
      form.append("level", this.level);
      form.append("time", new Date().getTime());

      const payload = {
        msg: "Note, some of these information can only be changed through customer support.",
        warning: true,
        error: false,
        url: `/users/school/?id=${this.user.id}`,
        action: "post",
        dataType: "user",
        data: form,
      };
      this.$store.commit("dashboard/showModal", payload);
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

    resultResponse(result) {
      // console.log(result, result.response);
      this.onRequest = false;
      if (result.response !== undefined) {
        this.showModal(
          result.response.data.message,
          false,
          true,
          false,
          "",
          "",
          ""
        );
      } else {
        console.log(result.response);
      }
    },
  },

  async mounted() {
    // console.log(this.userSchool);
    if (this.userSchool) {
      const item = JSON.parse(JSON.stringify(this.userSchool));
      this.populateData(item);
    } else {
      const result = await this.$store.dispatch(
        "dashboard/makeGET",
        `/users/school/?limit=40&page=1&id=${this.user.id}`
      );
      if (!result.data) {
        this.isLoaded = true;
      } else {
        this.$store.commit("dashboard/setUserSchool", result.data);
        const item = JSON.parse(JSON.stringify(this.userSchool));
        this.populateData(item);
      }
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    userSchool() {
      return this.$store.state.dashboard.userSchool;
    },

    countries() {
      return this.$store.state.dashboard.countries;
    },

    states() {
      return this.$store.state.dashboard.states;
    },

    lgas() {
      return this.$store.state.dashboard.lgas;
    },

    schools() {
      return this.$store.state.dashboard.schools;
    },

    faculties() {
      return this.$store.state.dashboard.faculties;
    },

    departments() {
      return this.$store.state.dashboard.departments;
    },
  },
};
</script>

<style></style>
