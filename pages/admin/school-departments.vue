<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Faculty<span class="admin-page-time">{{
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
                <div>Video URL</div>
              </div>
              <div class="admin-tl-name1 banner">
                <div>Name</div>
              </div>
              <div class="admin-tl-name1 banner">
                <div>Faculty</div>
              </div>
              <div class="admin-tl-time1 banner"><div>School</div></div>
            </div>
            <div
              v-for="(item, int) in items"
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
                      items,
                      'department-settings'
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
              <div class="admin-tl-name1 banner">
                <div :class="{ suspended: item.status == 0 }">
                  {{ item.department }}
                </div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.faculty }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.school }}</div>
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
          />
          <div
            v-for="(item, int) in getPages(totalLength, limit)"
            :key="int"
            class="admin-pagination-items"
            :class="{ active: int + 1 == currentPage }"
            @click="paginate(int + 1)"
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
          @click="prepareDelete"
        />
      </div>
    </div>

    <div class="admin-plan-form w-form">
      <div class="admin-plan-form-flex">
        <div class="w-layout-grid grid-form">
          <div class="admin-input-wrapper">
            <label for="name-5" class="admin-input-label">Department </label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="department"
              placeholder="Enter department"
            />
          </div>

          <div class="admin-input-wrapper">
            <label for="name-5" class="admin-input-label"
              >Department Username</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="departmentUsername"
              placeholder="Enter Department"
            />
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
            <label for="name-5" class="admin-input-label"
              >Department Video </label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="videoUrl"
              placeholder="Enter Video URL"
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
      sort: "-time",

      department: "",
      departmentUsername: "",
      faculty: "Select Faculty",
      school: "Select School",
      videoUrl: "",
      showSchools: false,
      showFaculties: false,
      description: "",
      image: "",
      schoolId: "",
      facultId: "",

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
      this.schoolId = item.id;
      this.showSchools = false;
      this.showFaculties = false;
      this.faculty = "Select Faculty";
      this.$store.dispatch(
        "admin/getFaculties",
        `/faculties/?schoolId=${item.id}&limit=200`
      );
    },

    setFaculty(item) {
      this.faculty = item.faculty;
      this.facultyId = item.id;
      this.showFaculties = false;
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

    paginate(int) {
      this.currentPage = int;
      this.getDepartments();
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

    prepareDelete() {
      this.showModal(
        `Are you sure you want to delete the selected Items?`,
        true,
        false,
        false,
        `post`,
        `/departments/delete/`,
        ``
      );
    },

    clearInputs() {
      this.faculty = "Select Faculty";
      this.school = "Select School";
      this.videoUrl = "";
      this.image = "";
      this.description = "";
      this.department = "";
      this.departmentUsername = "";

      this.isEditing = false;
      this.editingId = "";
    },

    async sortByDate() {
      this.sort = this.sort == "time" ? "-time" : "time";
      this.getDepartments();
    },

    async getDepartments() {
      await this.$store.dispatch(
        "admin/getDepartments",
        `/departments/?limit=${this.limit}&page=${this.currentPage}`
      );
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

    populateData(item) {
      this.department = item.department;
      this.faculty = item.faculty;
      this.school = item.school;
      this.schoolId = item.schoolId;
      this.videoUrl = item.videoUrl;
      this.description = item.description;
      this.facultId = item.facultyId;
      this.departmentUsername = item.departmentUsername;
    },

    async processData() {
      const form = new FormData();
      form.append("faculty", this.faculty);
      form.append("department", this.department);
      form.append("departmentUsername", this.departmentUsername);
      form.append("school", this.school);
      form.append("facultyId", this.facultyId);
      form.append("description", this.description);
      form.append("image", this.image);
      form.append("videoUrl", this.videoUrl);
      form.append("schoolId", this.schoolId);

      const url = this.isEditing
        ? `/departments/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}`
        : `/departments/?limit=${this.limit}&page=${this.currentPage}`;

      const payload = {
        form: form,
        url: url,
      };

      this.onRequest = true;
      const result = await this.$store.dispatch("admin/makePOST", payload);
      this.resultResponse(result);
    },

    resultResponse(result) {
      this.onRequest = false;
      if (!result.response) {
        this.$store.commit("admin/setDepartments", result.data);
        this.clearInputs();
      } else {
        this.showModal();
      }
    },
  },

  async mounted() {
    if (this.totalLength == 0) {
      const result = await this.$store.dispatch(
        "dashboard/makeGET",
        `/departments/?limit=${this.limit}&page=${this.currentPage}`
      );

      this.$store.commit("admin/setDepartments", result.data);
    }
  },

  computed: {
    totalLength() {
      return this.$store.state.admin.departmentLength;
    },

    selectedItems() {
      return this.$store.state.admin.selectedDepartments;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.isAllDepartmentsSelected;
    },

    schools() {
      return this.$store.state.admin.schools;
    },

    faculties() {
      return this.$store.state.admin.faculties;
    },

    items() {
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
