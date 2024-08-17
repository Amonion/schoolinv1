<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Schools<span class="admin-page-time">{{
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
                <div>Video</div>
              </div>
              <div class="admin-tl-name1 banner">
                <div>Username</div>
              </div>
              <div class="admin-tl-time1 banner"><div>Name</div></div>
              <div class="admin-tl-time1 banner"><div>Faculties</div></div>
              <div class="admin-tl-time1 banner">
                <div>Departments</div>
              </div>
              <div class="admin-tl-time1"><div>Status</div></div>
            </div>
            <div
              v-for="(item, int) in schools"
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
                      schools,
                      'school-settings'
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
                  {{ item.username }}
                </div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.name }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.faculties }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.departments }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.students }} Students</div>
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
          @click="duplicateData(selectedItems[selectedItems.length - 1])"
          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656d1b880a69f9c705082ba5_copy.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
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
            <label for="name-5" class="admin-input-label">Name </label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="name"
              placeholder="Enter school name"
            />
          </div>

          <div>
            <label for="intro-4" class="admin-input-label"
              >Username<span class="admin-marked"></span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="username"
              placeholder="Enter school username"
            />
          </div>

          <div class="admin-input-wrapper">
            <label for="name-6" class="admin-input-label">Country </label>
            <div
              class="admin-text-input"
              @click="showCountries = !showCountries"
            >
              <div>{{ country }}</div>
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
              :class="{ hide: !showCountries }"
            >
              <li
                v-for="(item, int) in countries"
                :key="int"
                class="admin-action-listitems"
                @click="setCountry(item)"
              >
                <div>{{ item.country }}</div>
              </li>
            </ul>
          </div>

          <div class="admin-input-wrapper">
            <label for="name-6" class="admin-input-label">State </label>
            <div class="admin-text-input" @click="showStates = !showStates">
              <div>{{ state }}</div>
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
              :class="{ hide: !showStates }"
            >
              <li
                v-for="(item, int) in states"
                :key="int"
                class="admin-action-listitems"
                @click="setState(item)"
              >
                <div>{{ item.state }}</div>
              </li>
            </ul>
          </div>

          <div class="admin-input-wrapper">
            <label for="name-6" class="admin-input-label">LGA </label>
            <div class="admin-text-input" @click="showLga = !showLga">
              <div>{{ lga }}</div>
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
              :class="{ hide: !showLga }"
            >
              <li
                v-for="(item, int) in lgas"
                :key="int"
                class="admin-action-listitems"
                @click="setLga(item)"
              >
                <div>{{ item.lga }}</div>
              </li>
            </ul>
          </div>

          <div class="admin-input-wrapper">
            <label for="name-5" class="admin-input-label"
              >Starting Session </label
            ><input
              type="date"
              class="admin-text-input w-input"
              v-model="startedSession"
            />
          </div>

          <div class="admin-input-wrapper">
            <label for="name-5" class="admin-input-label"
              >Current Session </label
            ><input
              type="date"
              class="admin-text-input w-input"
              v-model="currentSession"
            />
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
      sort: "-time",

      country: "Select Country",
      showCountries: false,
      state: "Select State",
      showStates: false,
      lga: "Select LGA",
      showLga: false,

      username: "",
      currentSession: "",
      startedSession: "",
      name: "",
      image: "",
      videoUrl: "",
      description: "",

      isEditing: false,
      editingId: null,
    };
  },

  methods: {
    setImage(e) {
      this.image = e.target.files[0];
    },

    setCountry(country) {
      this.country = country.country;
      this.showCountries = false;

      this.state = "Select State";
      this.showStates = false;
      this.lga = "Select LGA";
      this.showLga = false;
      this.$store.dispatch(
        "admin/getStates",
        `/places/?limit=60&page=1&sort=state&country=${country.country}&distinct=state`
      );
    },

    setState(state) {
      this.state = state.state;
      this.showStates = false;

      this.lga = "Select LGA";
      this.showLga = false;
      this.$store.dispatch(
        "admin/getLGAs",
        `/places/?limit=60&page=1&sort=lga&state=${state.state}`
      );
    },

    setLga(lga) {
      this.lga = lga.lga;
      this.showLga = false;
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
      this.username = item.username;
      this.country = item.country;
      this.state = item.state;
      this.lga = item.lga;
      this.image = item.image;
      this.videoUrl = item.videoUrl;
      this.description = item.description;
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
      this.editingId = "";
      this.isEditing = false;
      this.populateData(item);
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

      this.isEditing = true;
      this.editingId = item.id;

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
      this.name = "";
      this.username = "";
      this.country = "Select Country";
      this.state = "Select State";
      this.lga = "Select LGA";
      this.image = "";
      this.videoUrl = "";
      this.description = "";

      this.isEditing = false;
      this.editingId = "";
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

    async getBlog() {
      await this.$store.dispatch(
        "admin/getBlog",
        `/blog/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    // async setPlaces() {
    //   const imoStateLGAs = [
    //     "Akoko-Edo",
    //     "Egor",
    //     "Esan Central",
    //     "Esan North-East",
    //     "Esan South-East",
    //     "Esan West",
    //     "Etsako Central",
    //     "Etsako East",
    //     "Etsako West",
    //     "Igueben",
    //     "Ikpoba-Okha",
    //     "Oredo",
    //     "Orhionmwon",
    //     "Ovia North-East",
    //     "Ovia South-West",
    //     "Owan East",
    //     "Owan West",
    //     "Uhunmwonde",
    //   ];

    //   const payload = {
    //     form: imoStateLGAs,
    //     url: `/schools/places`,
    //   };

    //   const result = await this.$store.dispatch("dashboard/makePOST", payload);
    //   console.log(result, result.response);
    // },

    async processData() {
      const form = new FormData();
      form.append("name", this.name);
      form.append("time", this.isEditing ? undefined : new Date().getTime());
      form.append("username", this.username);
      form.append("country", this.country);
      form.append("state", this.state);
      form.append("lga", this.lga);
      form.append("image", this.image);
      form.append("videoUrl", this.videoUrl);
      form.append("description", this.description);
      const url = this.isEditing
        ? `/schools/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
        : `/schools/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;

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
        this.getBlog();
        this.clearInputs();
      }
    },
  },

  computed: {
    totalLength() {
      return this.$store.state.admin.schoolLength;
    },

    selectedItems() {
      return this.$store.state.admin.selectedSchools;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.isAllSchoolsSelected;
    },

    countries() {
      return this.$store.state.admin.countries;
    },

    states() {
      return this.$store.state.admin.states;
    },

    lgas() {
      return this.$store.state.admin.lgas;
    },

    schools() {
      return this.$store.state.admin.schools;
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
