<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Courses<span class="admin-page-time">{{
          formatDate(new Date().getTime())
        }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs his">
            <div class="admin-home-table-head pad">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-email1 banner">
                <div>Banner</div>
              </div>
              <div class="admin-tl-email1 banner">
                <div>Code</div>
              </div>
              <div class="admin-tl-name1 banner">
                <div>Name</div>
              </div>
              <div class="admin-tl-time1 banner"><div>Units</div></div>
              <div class="admin-tl-time1 banner"><div>Department</div></div>
              <div class="admin-tl-time1 banner">
                <div>Faculty</div>
              </div>
              <div class="admin-tl-time1"><div>Level</div></div>
            </div>
            <div
              v-for="(item, int) in courses"
              :key="int"
              class="admin-home-table-body"
              :class="{ even: int % 2 == 0 }"
            >
              <div class="admin-tl-sn2">
                <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
                <div
                  class="admin-toggler ml-1"
                  @click="
                    handleCheckedItems(
                      item,
                      selectedItems,
                      courses,
                      'course-settings'
                    )
                  "
                >
                  <img
                    v-if="item.checked"
                    src="/images/admin/check-blue.svg"
                    loading="lazy"
                    width="10"
                    alt=""
                  />
                </div>
              </div>
              <div class="admin-tl-email1 banner">
                <img
                  :src="`${FILE_URL}/${item.image}`"
                  loading="lazy"
                  width="90"
                  sizes="90px"
                  alt=""
                  :srcset="`
                      ${FILE_URL}/${item.image}  500w,
                      ${FILE_URL}/${item.image}  800w,
                      ${FILE_URL}/${item.image} 1080w,
                      ${FILE_URL}/${item.image}        1200w
                    `"
                />
              </div>
              <div class="admin-tl-email1 banner">
                {{ item.code }}
              </div>
              <div class="admin-tl-name1 banner">
                <div :class="{ suspended: item.status == 0 }">
                  {{ item.name }}
                </div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.units }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.department }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.faculty }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>
                  {{ item.level }} Level<br />
                  {{ item.semester }} Semester
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="admin-pagination">
          <img
            v-if="currentPage > 1"
            src="/images/admin/page-arrow-left-blue.svg"
            loading="lazy"
            alt=""
            class="admin-page-arrow l"
            @click="paginate(currentPage - 1)"
          />
          <div
            v-for="(item, int) in getPages(totalLength, limit)"
            :key="int"
            class="admin-pagination-items"
            :class="{ active: int + 1 == currentPage }"
            @click="paginate(int)"
          >
            {{ int + 1 }}
          </div>
          <img
            v-if="currentPage < getPages(totalLength, limit)"
            src="/images/admin/page-arrow-right-blue.svg"
            loading="lazy"
            alt=""
            class="admin-page-arrow r"
          />
          <div class="admin-pagination-items total">
            Total: {{ totalLength }}
          </div>
        </div>
      </div>
      <div class="admin-table-action">
        <div class="admin-table-toggleall">
          <div @click="toggleSelectAllItems" class="admin-toggler">
            <img
              v-if="isAllItemsSelected"
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bd0969d843c582936cc5c_check-mark-icon%201.svg"
              loading="lazy"
              width="10"
              alt=""
            />
          </div>
          <div>Select All</div>
        </div>
        <img
          @click="prepareEdit(selectedItems[selectedItems.length - 1])"
          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656d1bd1b48197e8dfd3218a_edit.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
        />
        <img
          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656d1b880a69f9c705082ba5_copy.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
          @click="duplicateData(selectedItems[selectedItems.length - 1])"
        />
        <img
          @click="approveBlog()"
          src="/images/admin/check-blue.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
        />
        <img
          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bcbb9998532066acd920d_trash-bin-icon%201.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
        />
      </div>
    </div>
    <div class="admin-plan-form w-form">
      <div class="admin-plan-form-flex">
        <div class="w-layout-grid grid-form">
          <div class="admin-input-wrapper">
            <label for="name-5" class="admin-input-label">Course Code </label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="code"
              placeholder="Enter course code"
            />
          </div>

          <div>
            <label for="intro-4" class="admin-input-label"
              >Course Name<span class="admin-marked"></span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="name"
              placeholder="Enter course name"
            />
          </div>

          <div>
            <label for="intro-4" class="admin-input-label"
              >Course Unit<span class="admin-marked"></span></label
            ><input
              type="number"
              class="admin-text-input w-input"
              v-model="units"
              placeholder="Enter course unit"
            />
          </div>

          <div class="admin-input-wrapper">
            <label for="name-6" class="admin-input-label">Course Level</label>
            <div class="admin-text-input" @click="showLevels = !showLevels">
              <div>{{ level }}</div>
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b74de84a7b6a965eb8630_caret-down.svg"
                loading="lazy"
                id="w-node-_3ce16229-7cbd-d702-f359-355777d3af4d-17190892"
                alt=""
                class="admin-input-icon"
              />
            </div>
            <ul
              role="list"
              class="admin-action-list input"
              :class="{ hide: !showLevels }"
            >
              <li
                v-for="(item, int) in levels"
                :key="int"
                class="admin-action-listitems"
                @click="setLevel(item)"
              >
                <div>{{ item }}</div>
              </li>
            </ul>
          </div>

          <div class="admin-input-wrapper">
            <label for="name-6" class="admin-input-label"
              >Course Semester</label
            >
            <div
              class="admin-text-input"
              @click="showSemesters = !showSemesters"
            >
              <div>{{ semester }}</div>
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b74de84a7b6a965eb8630_caret-down.svg"
                loading="lazy"
                id="w-node-_3ce16229-7cbd-d702-f359-355777d3af4d-17190892"
                alt=""
                class="admin-input-icon"
              />
            </div>
            <ul
              role="list"
              class="admin-action-list input"
              :class="{ hide: !showSemesters }"
            >
              <li
                v-for="(item, int) in semesters"
                :key="int"
                class="admin-action-listitems"
                @click="setSemester(item)"
              >
                <div>{{ item }}</div>
              </li>
            </ul>
          </div>

          <div class="admin-input-wrapper">
            <label for="name-6" class="admin-input-label">School </label>
            <div class="admin-text-input" @click="showSchools = !showSchools">
              <div>{{ school }}</div>
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b74de84a7b6a965eb8630_caret-down.svg"
                loading="lazy"
                id="w-node-_3ce16229-7cbd-d702-f359-355777d3af4d-17190892"
                alt=""
                class="admin-input-icon"
              />
            </div>
            <ul
              role="list"
              class="admin-action-list input"
              :class="{ hide: !showSchools }"
            >
              <li
                v-for="(item, int) in schools"
                :key="int"
                class="admin-action-listitems"
                @click="setSchool(item)"
              >
                <div>{{ item.name }}</div>
              </li>
            </ul>
          </div>

          <div class="admin-input-wrapper">
            <label for="name-6" class="admin-input-label">Faculty </label>
            <div
              class="admin-text-input"
              @click="showFaculties = !showFaculties"
            >
              <div>{{ faculty }}</div>
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b74de84a7b6a965eb8630_caret-down.svg"
                loading="lazy"
                id="w-node-_3ce16229-7cbd-d702-f359-355777d3af4d-17190892"
                alt=""
                class="admin-input-icon"
              />
            </div>
            <ul
              role="list"
              class="admin-action-list input"
              :class="{ hide: !showFaculties }"
            >
              <li
                v-for="(item, int) in faculties"
                :key="int"
                class="admin-action-listitems"
                @click="setFaculty(item)"
              >
                <div>{{ item.faculty }}</div>
              </li>
            </ul>
          </div>

          <div class="admin-input-wrapper">
            <label for="name-6" class="admin-input-label">Department </label>
            <div
              class="admin-text-input"
              @click="showDepartments = !showDepartments"
            >
              <div>{{ department }}</div>
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b74de84a7b6a965eb8630_caret-down.svg"
                loading="lazy"
                id="w-node-_3ce16229-7cbd-d702-f359-355777d3af4d-17190892"
                alt=""
                class="admin-input-icon"
              />
            </div>
            <ul
              role="list"
              class="admin-action-list input"
              :class="{ hide: !showDepartments }"
            >
              <li
                v-for="(item, int) in departments"
                :key="int"
                class="admin-action-listitems"
                @click="setDepartment(item)"
              >
                <div>{{ item.department }}</div>
              </li>
            </ul>
          </div>

          <div>
            <label for="intro-4" class="admin-input-label"
              >Video URL<span class="admin-marked"></span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="videoUrl"
              placeholder="Enter school Video"
            />
          </div>
        </div>
        <div>
          <label for="field-4" class="admin-input-label">Content</label>
          <client-only placeholder="loading...">
            <ckeditor-nuxt
              class="editor"
              v-model="description"
              :config="editorConfig"
            />
          </client-only>
        </div>

        <div class="admin-validation-msg">
          Please Enter all Marked * Fields Correctly
        </div>

        <div class="admin-btn-holder">
          <div v-if="onRequest" class="admin-cus-btn">
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656d2b5b181159eed0fa4c4c_loader-line-icon%201.svg"
              loading="lazy"
              alt=""
              class="admin-btn-icon"
            />
            <div>Processing</div>
          </div>
          <label for="banner" v-else class="admin-cus-btn">
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656d2fca0882f1e95ca0e490_cloud-data-upload-icon%201.svg"
              loading="lazy"
              alt=""
              class="admin-btn-icon"
            />
            <div>Upload Banner</div>
            <input
              type="file"
              class="admin-text-input hidden w-input"
              id="banner"
              @change="setImage"
            />
          </label>

          <div v-if="!onRequest" @click="processData" class="admin-cus-btn">
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
      onRequest: false,

      limit: 10,
      currentPage: 1,
      sort: "name",

      code: "",
      name: "",
      units: "",
      level: "Select Level",
      semester: "Select Semester",
      image: "",
      videoUrl: "",
      description: "",
      departmentId: "",

      school: "Select School",
      showSchools: false,
      faculty: "Select Faculty",
      showFaculties: false,
      department: "Select Department",
      showDepartments: false,
      showLevels: false,
      showSemesters: false,

      levels: [100, 200, 300, 400, 500],
      semesters: [1, 2],

      isEditing: false,
      editingId: null,
    };
  },

  methods: {
    setImage(e) {
      this.image = e.target.files[0];
    },

    setSchool(item) {
      this.school = item.name;
      this.showSchools = false;

      this.faculty = "Select Faculty";
      this.showFaculties = false;
      this.department = "Select Department";
      this.showDepartments = false;
      this.$store.dispatch(
        "admin/getFaculties",
        `/faculties/?limit=60&page=1&sort=faculty&schoolId=${item.id}`
      );
    },

    setFaculty(faculty) {
      this.faculty = faculty.faculty;
      this.showFaculties = false;

      this.department = "Select Department";
      this.showDepartments = false;
      this.$store.dispatch(
        "admin/getDepartments",
        `/departments/?limit=60&page=1&sort=department&facultyId=${faculty.id}`
      );
    },

    setDepartment(department) {
      this.department = department.department;
      this.departmentId = department.id;
      this.showDepartments = false;
    },

    setLevel(level) {
      this.level = level;
      this.showLevels = false;
    },

    setSemester(semester) {
      this.semester = semester;
      this.showSemesters = false;
    },

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
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

    toggleSelectAllItems() {
      this.$store.commit(`admin/toggleSelectAllItems`, "blog-settings");
    },

    handleCheckedItems(item, selectedItems, items, type) {
      this.$store.commit("admin/handleCheckedItems", {
        item,
        selectedItems,
        items,
        type,
      });
    },

    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    populateData(item) {
      this.name = item.name;
      this.level = item.level;
      this.units = item.units;
      this.semester = item.semester;
      this.code = item.code;
      this.department = item.department;
      this.departmentId = item.departmentId;
      this.faculty = item.faculty;
      this.school = item.school;
      this.image = item.image;
      this.videoUrl = item.videoUrl;
      this.description = item.description;
    },

    prepareEdit(item) {
      if (!item) {
        this.showModal(
          "Please select at least an item to edit",
          false,
          true,
          false,
          "",
          "",
          ""
        );
        return;
      }

      this.populateData(item);

      this.isEditing = true;
      this.editingId = item.id;
    },

    duplicateData(item) {
      if (!item) {
        this.showModal(
          "Please select at least an item to edit",
          false,
          true,
          false,
          "",
          "",
          ""
        );
        return;
      }
      this.populateData(item);
    },

    showModal(msg, warning, error, success, action, url) {
      const payload = {
        msg: msg,
        isWarning: warning,
        isError: error,
        isSuccess: success,
        action: action,
        url: url,
        item: this.selectedItems,
      };
      this.$store.commit(`admin/showModal`, payload);
    },

    prepareDelete(id) {
      this.showModal(
        `Are you sure you want to delete this blog?`,
        true,
        false,
        false,
        `delete`,
        `/blog/?id=${id}`,
        ``
      );
    },

    clearInputs() {
      this.code = "";
      this.units = "";
      this.school = "Select School";
      this.faculty = "Select Faculty";
      this.department = "Select Department";
      this.image = "";
      this.name = "";
      this.semester = "Select Semester";
      this.level = "Select Level";
      this.videoUrl = "";
      this.description = "";

      this.isEditing = false;
      this.editingId = "";
    },

    paginate(int) {
      this.currentPage = int;
      this.getCourses();
    },

    async approveBlog() {
      if (this.selectedItems.length == 0) {
        this.showModal(
          "Please select at least a blog to continue",
          false,
          true,
          false,
          "",
          "",
          ""
        );
        return;
      }

      this.showModal(
        "Are you sure you want to update the status of the selected blogs",
        true,
        false,
        false,
        `update`,
        `/blog/mass-update`
      );
    },

    async sortByDate() {
      this.sort = this.sort == "time" ? "-time" : "time";
      this.getBlog();
    },

    async getCourses() {
      await this.$store.dispatch(
        "admin/getCourses",
        `/courses/?limit=${this.limit}&page=${this.currentPage}`
      );
    },

    async processData() {
      const form = new FormData();
      form.append("name", this.name);
      form.append("level", this.level);
      form.append("units", this.units);
      form.append("semester", this.semester);
      form.append("code", this.code);
      form.append("department", this.department);
      form.append("departmentId", this.departmentId);
      form.append("faculty", this.faculty);
      form.append("school", this.school);
      form.append("image", this.image);
      form.append("videoUrl", this.videoUrl);
      form.append("description", this.description);
      const url = this.isEditing
        ? `/courses/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
        : `/courses/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;

      const payload = {
        form: form,
        url: url,
      };

      this.onRequest = true;
      const result = await this.$store.dispatch("admin/makePOST", payload);
      this.resultResponse(result);
    },

    resultResponse(result) {
      console.log(result, result.response);
      this.onRequest = false;
      if (!result.response) {
        this.$store.commit("admin/setCourses", result.data);
        this.clearInputs();
      } else {
        console.log(result.response);
      }
    },
  },

  async mounted() {
    if (this.totalLength == 0) {
      const result = await this.$store.dispatch(
        "admin/getCourses",
        `/courses/?limit=20&page=1&sort=name`
      );
    }
  },

  computed: {
    totalLength() {
      return this.$store.state.admin.courseLength;
    },

    selectedItems() {
      return this.$store.state.admin.selectedCourses;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.isAllCoursesSelected;
    },

    schools() {
      return this.$store.state.admin.schools;
    },

    courses() {
      return this.$store.state.admin.courses;
    },

    faculties() {
      return this.$store.state.admin.faculties;
    },

    departments() {
      return this.$store.state.admin.departments;
    },

    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },

  components: {
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
};
</script>
<style></style>
