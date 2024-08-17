<template>
  <div v-if="isLoaded" class="dash-profile-resultmain">
    <div
      class="dashboard-slider-headline prof"
      style="display: flex; width: 100%"
    >
      My Result
      <span style="margin-left: auto" class="dash-result-top gp"
        >CGPA {{ cgpa }}</span
      >
    </div>
    <div class="dash-profile-resulthead">
      <div class="dash-profile-resulttop">
        <div class="dash-result-top gp">GPA {{ gpa }}</div>
        <div class="dash-result-top">
          {{ secondCourses.length + courses.length }} Courses
        </div>
        <div class="dash-result-top">{{ units + units2 }} Units</div>
      </div>
      <div class="dash-custom-select">
        <div
          class="dash-custom-selecthead"
          @click="showSessions = !showSessions"
        >
          <div>{{ session }}</div>
          <img
            src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65b11d8f17e8b72dc91d4584_CaretDownFill.svg"
            loading="lazy"
            alt=""
            class="dash-select-icon"
          />
        </div>
        <div class="dash-custom-drop" :class="{ active: showSessions }">
          <div
            v-for="(item, int) in sessions"
            :key="int"
            class="dash-custom-selecthead drop"
            @click="selectSession(item, int + 1)"
          >
            <div>{{ item }}</div>
          </div>
        </div>
      </div>
    </div>

    <div style="width: 100%; overflow: auto">
      <div class="dash-profile-result">
        <div class="dash-profile-resultth">
          <div class="dash-result-sn">S/N</div>
          <div class="dash-result-course">Course</div>
          <div class="dash-result-norm">Unit</div>
          <div class="dash-result-norm">Score</div>
          <div class="dash-result-norm">Grade</div>
          <div class="dash-result-norm">Point</div>
          <div class="dash-result-norm">C. Point</div>
        </div>
        <div
          v-for="(item, int) in courses"
          :key="item.id"
          :class="{ even: int % 2 == 0 }"
          class="dash-profile-resultbd"
        >
          <div class="dash-result-sn">{{ int + 1 }}</div>
          <div class="dash-result-course">
            {{ item.name }} <br />{{ item.code }}
          </div>
          <div class="dash-result-norm">{{ item.units }}</div>
          <input
            class="dash-result-course input w-input"
            placeholder="30"
            type="number"
            v-model="item.score"
            @keyup="setResult(item, 1)"
            @change="setResult(item, 1)"
          />
          <div class="dash-result-norm">{{ item.grade }}</div>
          <div class="dash-result-norm">{{ item.point }}</div>
          <div class="dash-result-norm">{{ item.cGrade }}</div>
        </div>
        <div class="dash-profile-resultbd total">
          <div class="dash-result-sn">{{ courses.length }}</div>
          <div class="dash-result-course">Total</div>
          <div class="dash-result-norm">{{ units }} Units</div>
          <div class="dash-result-norm">GP {{ gp }}</div>
          <div class="dash-result-norm">1</div>
          <div class="dash-result-norm side">
            <div class="dash-numerator">{{ totalPoints }}</div>
            <div class="dash-denom">{{ units }}</div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center">
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
        <div @click="processData(1)" class="dash-paymentbtn set" v-else>
          Save First Semester
        </div>
      </div>
    </div>

    <div style="width: 100%; overflow: auto; margin-top: 50px">
      <div class="dash-profile-result">
        <div class="dash-profile-resultth">
          <div class="dash-result-sn">S/N</div>
          <div class="dash-result-course">Course</div>
          <div class="dash-result-norm">Unit</div>
          <div class="dash-result-norm">Score</div>
          <div class="dash-result-norm">Grade</div>
          <div class="dash-result-norm">Point</div>
          <div class="dash-result-norm">C. Point</div>
        </div>
        <div
          v-for="(item, int) in secondCourses"
          :key="item.id"
          :class="{ even: int % 2 == 0 }"
          class="dash-profile-resultbd"
        >
          <div class="dash-result-sn">{{ int + 1 }}</div>
          <div class="dash-result-course">
            {{ item.name }} <br />{{ item.code }}
          </div>
          <div class="dash-result-norm">{{ item.units }}</div>
          <input
            class="dash-result-course input w-input"
            placeholder="30"
            type="number"
            v-model="item.score"
            @keyup="setResult(item, 2)"
            @change="setResult(item, 2)"
          />
          <div class="dash-result-norm">{{ item.grade }}</div>
          <div class="dash-result-norm">{{ item.point }}</div>
          <div class="dash-result-norm">{{ item.cGrade }}</div>
        </div>
        <div class="dash-profile-resultbd total">
          <div class="dash-result-sn">{{ secondCourses.length }}</div>
          <div class="dash-result-course">Total</div>
          <div class="dash-result-norm">{{ units }} Units</div>
          <div class="dash-result-norm">GP {{ gp2 }}</div>
          <div class="dash-result-norm">1</div>
          <div class="dash-result-norm side">
            <div class="dash-numerator">{{ totalPoints2 }}</div>
            <div class="dash-denom">{{ units2 }}</div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center">
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
        <div @click="processData(2)" class="dash-paymentbtn set" v-else>
          Save Second Semester
        </div>
      </div>
    </div>
  </div>
  <div class="dashboard-slider-headline prof" v-else style="margin-top: 50px">
    Go to settings under school and fill in your school details correctly
  </div>
</template>

<script>
export default {
  data() {
    return {
      onRequest: false,

      courses: [],
      secondCourses: [],
      units: 0,
      units2: 0,
      totalPoints: 0,
      totalPoints2: 0,
      gp: 0,
      gp2: 0,
      cgpa: 0,
      cgpas: [],
      showCountries: false,
      session: "2023/2024",
      sessions: [
        "2023/2024",
        "2022/2023",
        "2021/2022",
        "2020/2021",
        "2019/2020",
        "2018/2019",
        "2017/2018",
      ],
      selectedSession: "Select Session",
      showSessions: false,
      state: "Select State",
      gpa: 0,
      paginate: false,
      response: "",
      isLoaded: false,
      isEditing1: false,
      isEditing2: false,
      editingId: null,
    };
  },

  methods: {
    selectSession(session, int) {
      this.showSessions = false;
      this.getPreviousCourse(int);
    },

    setResultGrade(item) {
      if (item.score < 40) {
        item.grade = "F";
        item.point = 0;
      } else if (item.score >= 40 && item.score < 50) {
        item.grade = "D";
        item.point = 2;
      } else if (item.score >= 50 && item.score < 60) {
        item.grade = "C";
        item.point = 3;
      } else if (item.score >= 60 && item.score < 70) {
        item.grade = "B";
        item.point = 4;
      } else if (item.score >= 70) {
        item.grade = "A";
        item.point = 5;
      }
      item.cGrade = item.point * 1 * item.units * 1;
    },

    setCGPA(cgpas) {
      this.cgpas = cgpas;
      let gpa = 0;
      for (let i = 0; i < cgpas.length; i++) {
        const el = cgpas[i];
        gpa += el.gpa * 1;
      }
      this.cgpa = 0;
      this.cgpa = (gpa / cgpas.length).toFixed(2);
    },

    setResult(item, int) {
      this.setResultGrade(item);

      if (int == 1) {
        this.totalPoints = 0;
        for (let i = 0; i < this.courses.length; i++) {
          const el = this.courses[i];
          this.totalPoints += el.units * 1 * el.point * 1;
        }
        this.gp = ((this.totalPoints / this.units) * 1).toFixed(2);
      } else {
        this.totalPoints2 = 0;

        for (let i = 0; i < this.secondCourses.length; i++) {
          const el = this.secondCourses[i];
          this.totalPoints2 += el.units * 1 * el.point * 1;
        }

        this.gp2 = ((this.totalPoints2 / this.units) * 1).toFixed(2);
      }

      this.gpa = (
        (this.totalPoints + this.totalPoints2) /
        (this.units + this.units2)
      ).toFixed(2);

      for (let i = 0; i < this.cgpas.length; i++) {
        const el = this.cgpas[i];
        if (el.level == item.level) {
          this.cgpas[i].gpa = this.gpa;
          this.setCGPA(this.cgpas);
        }
      }
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

    populateData(item) {
      this.courses = item;

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

    arrangeCourse(courses, gp, gpa) {
      const data = [];
      for (let i = 0; i < courses.length; i++) {
        const form = {};
        const el = courses[i];
        form.state = this.userSchool.state;
        form.id = el.id;
        form.cgpas = JSON.stringify(this.cgpas);
        form.semester = el.semester;
        form.level = el.level;
        form.code = el.code;
        form.schoolId = this.userSchool.schoolId;
        form.faculty = this.userSchool.faculty;
        form.facultyId = this.userSchool.facultyId;
        form.department = this.userSchool.department;
        form.departmentId = this.userSchool.departmentId;
        form.session = this.session;
        form.time = new Date().getTime();
        form.name = el.name;
        form.courseId = el.id;
        form.units = el.units;
        form.gp = gp * 1;
        form.gpa = gpa;
        form.score = el.score * 1;
        form.username = this.user.username;
        form.userId = this.user.id;
        data.push(form);
      }
      return data;
    },

    processData(int) {
      let course = [];
      if (int == 1) {
        course = this.arrangeCourse(this.courses, this.gpa, this.cgpa);
      } else {
        course = this.arrangeCourse(this.secondCourses, this.gpa2, this.cgpa);
      }

      // const form = new FormData();
      const url =
        this.isEditing1 || this.isEditing2 ? "/results/update" : `/results`;

      const payload = {
        msg:
          int == 1
            ? "Note, you are about to update your first semester result"
            : "Note, you are about to update your second semester result",
        warning: true,
        error: false,
        url: url,
        action: "post",
        dataType: "user",
        data: course,
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
      console.log(result, result.response);
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

    async getAndSetCourses(school, int) {
      let level = 0;
      for (let i = 0; i < this.sessions.length; i++) {
        const el = this.sessions[i];
        if (el == this.session) {
          level = school.level * 1 - i * 100;
        }
      }

      const result = await this.$store.dispatch(
        "dashboard/makeGET",
        `/courses/?limit=40&page=1&semester=${int}&departmentId=${school.departmentId}&level=${level}`
      );
      this.isEditing1 = false;
      this.isEditing2 = false;
      const courses = result.data.data;
      if (int == 1) {
        this.courses = courses;
        this.$store.commit("dashboard/setCourses", result);
      } else {
        this.secondCourses = courses;
        this.$store.commit("dashboard/setCourses2", result);
      }

      for (let i = 0; i < courses.length; i++) {
        if (int == 1) {
          this.units += courses[i].units * 1;
          this.totalPoints += courses[i].point * 1;
        } else {
          this.units2 += courses[i].units * 1;
          this.totalPoints += courses[i].point * 1;
        }
      }
    },

    setSemesterCourses(result) {
      this.courses = JSON.parse(JSON.stringify(result));
      let point = 0;
      let units = 0;
      for (let i = 0; i < this.courses.length; i++) {
        const el = this.courses[i];
        units += el.units * 1;
        this.setResultGrade(this.courses[i]);
        point += el.units * 1 * el.point * 1;
      }
      this.totalPoints = point;
      this.units = units;
      this.gp = ((this.totalPoints / this.units) * 1).toFixed(2);
      this.gpa = ((this.gp * 1 + this.gp2 * 1) / 2).toFixed(2);
      this.isEditing1 = true;
    },

    setSemesterCourses2(result) {
      this.secondCourses = JSON.parse(JSON.stringify(result));
      let points = 0;
      let units = 0;
      for (let i = 0; i < this.secondCourses.length; i++) {
        const el = this.secondCourses[i];
        units += el.units * 1;
        this.setResultGrade(this.secondCourses[i]);
        points += el.units * 1 * el.point * 1;
      }
      this.totalPoints2 = points;
      this.units2 = units;
      this.gp2 = ((this.totalPoints2 / this.units2) * 1).toFixed(2);
      console.log(this.gp, this.gp2);

      this.isEditing2 = true;
      this.gpa = ((this.gp * 1 + this.gp2 * 1) / 2).toFixed(2);
    },

    async setSemesterResults(semester, int, school) {
      this.setCGPA(JSON.parse(school.cgpa));
      if (semester.length == 0) {
        const result = await this.$store.dispatch(
          "dashboard/makeGET",
          `/results/?limit=40&page=1&semester=${int}&session=${this.session}&userId=${this.user.id}`
        );

        if (result.data?.data?.length == 0) {
          this.getAndSetCourses(school, int);
        } else {
          if (int == 1) {
            this.$store.commit("dashboard/setCourses", result);
            this.$store.commit("dashboard/setFirstSemester", result);
            this.setSemesterCourses(result.data?.data);
          } else {
            this.$store.commit("dashboard/setCourses2", result);
            this.$store.commit("dashboard/setSecondSemester", result);
            this.setSemesterCourses2(result.data?.data);
          }
        }
      } else {
        let courses = [];
        if (int == 1) {
          this.setSemesterCourses(semester);
        } else {
          this.setSemesterCourses2(semester);
        }
      }
    },

    async setCourse(school) {
      this.units = 0;
      this.units2 = 0;
      this.totalPoints = 0;
      this.totalPoints2 = 0;
      this.gpa = 0;
      this.$store.commit("dashboard/setUserSchool", school);
      this.isLoaded = true;

      if (this.paginate) {
        this.setSemesterResults([], 1, school);
        this.setSemesterResults([], 2, school);
      } else {
        this.setSemesterResults(this.firstSemester, 1, school);
        this.setSemesterResults(this.secondSemester, 2, school);
      }
    },

    async getPreviousCourse(num) {
      this.paginate = true;
      const int = num * 100;

      if (this.userSchool.level * 1 - int < 0) {
        const payload = {
          msg: "Sorry your cannot go blow 100 level",
          warning: false,
          error: true,
        };
        this.$store.commit("dashboard/showModal", payload);
        return;
      }
      this.session = session;
      this.setCourse(this.userSchool);
      this.isLoaded = true;
    },
  },

  async mounted() {
    if (!this.userSchool) {
      const schoolData = await this.$store.dispatch(
        "dashboard/makeGET",
        `/users/school/?limit=40&page=1&id=${this.user.id}`
      );

      if (schoolData.data) {
        this.setCourse(schoolData.data);
      } else if (this.userSchool) {
        this.setCourse(this.userSchool);
      }
    } else {
      this.setCourse(this.userSchool);
    }
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    firstSemester() {
      return this.$store.state.dashboard.firstSemester;
    },

    secondSemester() {
      return this.$store.state.dashboard.secondSemester;
    },

    userCourses() {
      return JSON.parse(
        JSON.stringify(this.$store.state.dashboard.userCourses)
      );
    },

    userCourses2() {
      return JSON.parse(
        JSON.stringify(this.$store.state.dashboard.userCourses2)
      );
    },

    userSchool() {
      return this.$store.state.dashboard.userSchool;
    },
  },
};
</script>

<style></style>
