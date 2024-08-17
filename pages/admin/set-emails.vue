<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Emails<span class="admin-page-time"> {{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs his">
            <div class="admin-home-table-head pad">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-email1 banner">
                <div>Banner</div>
              </div>
              <div class="admin-tl-name1 banner">
                <div>Template</div>
              </div>
              <div class="admin-tl-time1 banner"><div>Title</div></div>
              <div class="admin-tl-time1 banner">
                <div>Content</div>
              </div>
              <div class="admin-tl-time1"><div>Greetings</div></div>
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
                      selectedEmails,
                      items,
                      'email-settings'
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
                  :src="`${FILE_URL}/uploads/${item.image}`"
                  loading="lazy"
                  width="50"
                  sizes="50px"
                  alt=""
                  :srcset="`
                    ${FILE_URL}/uploads/${item.image}   500w,
                    ${FILE_URL}/uploads/${item.image}   800w,
                    ${FILE_URL}/uploads/${item.image} 1080w,
                    ${FILE_URL}/uploads/${item.image}        1200w`"
                />
              </div>
              <div class="admin-tl-name1 banner">
                <div>{{ item.template }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.title }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div v-html="`${truncateText(item.content, 50)}`"></div>
              </div>
              <div class="admin-tl-time1">
                {{ item.greetings }}
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
            @click="paginate(int + 1)"
            :class="{ active: int + 1 == currentPage }"
          >
            {{ int + 1 }}
          </div>
          <img
            v-if="currentPage < getPages(totalLength, limit).length"
            src="/images/admin/page-arrow-right-blue.svg"
            loading="lazy"
            alt=""
            class="admin-page-arrow r"
            @click="paginate(currentPage + 1)"
          />
          <div class="admin-pagination-items total">
            Total: {{ totalLength }}
          </div>
        </div>
      </div>

      <div class="admin-table-action">
        <div class="admin-table-toggleall">
          <div class="admin-toggler">
            <img
              src="/images/admin/check-blue.svg"
              loading="lazy"
              width="10"
              alt=""
            />
          </div>
          <div>Select All</div>
        </div>
        <img
          src="/images/admin/edit-blue.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
          @click="prepareEdit(selectedEmails[selectedEmails.length - 1])"
        /><img
          src="/images/admin/copy-blue.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
          @click="copyData(selectedEmails[selectedEmails.length - 1])"
        /><img
          src="/images/admin/delete-red.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
        />
      </div>
    </div>

    <div class="admin-email-form w-form">
      <div class="admin-plan-form-flex">
        <div class="w-layout-grid grid-form">
          <div class="admin-input-wrapper">
            <label for="name-5" class="admin-input-label">Title </label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="title"
              placeholder="Enter Banner Title"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="name-5" class="admin-input-label">Template </label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="template"
              placeholder="Enter Template"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="name-5" class="admin-input-label">Greetings </label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="greetings"
              placeholder="Enter Greetings"
            />
          </div>
        </div>
        <div>
          <label for="field-4" class="admin-input-label">Content</label>
          <client-only placeholder="loading...">
            <ckeditor-nuxt
              class="editor"
              v-model="content"
              :config="editorConfig"
            />
          </client-only>
        </div>
        <div class="admin-validation-msg">
          Please Enter all Marked * Fields Correctly
        </div>
        <div class="admin-btn-holder">
          <!-- <label id="image" class="admin-cus-btn">
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656d2fca0882f1e95ca0e490_cloud-data-upload-icon%201.svg"
              loading="lazy"
              alt=""
              class="admin-btn-icon"
            />
            <div>Upload Image</div>
            <input
              type="file"
              class="admin-text-input hidden w-input"
              id="image"
              @change="setImage"
            />
          </label> -->
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
            <div>Upload Image</div>
            <input
              type="file"
              class="admin-text-input hidden w-input"
              id="banner"
              @change="setImage"
            />
          </label>
          <div v-if="!onRequest" class="admin-cus-btn" @click="processData">
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
      limit: 10,
      sort: "dateCreated",
      currentPage: 1,

      onRequest: false,
      image: "",
      title: "",
      template: "",
      content: "",
      greetings: "",

      isEditing: false,
      editingId: null,
    };
  },

  methods: {
    formatNumberToDate(inputNumber) {
      if (typeof inputNumber !== "number") {
        return "Not Available";
      }

      const date = new Date(inputNumber);

      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    },

    formatDateToTime(date) {
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    formatDate() {
      const today = new Date();
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

    setItem(item) {
      this.selectedEmail = item.title;
      this.showEmails = false;
      this.email = item;
    },

    toggleSelectAllItems() {
      this.$store.commit(`admin/toggleSelectAllItems`, "user-settings");
    },

    handleCheckedItems(item, selectedItems, items, type) {
      this.$store.commit("admin/handleCheckedItems", {
        item,
        selectedItems,
        items,
        type,
      });
    },

    paginate(int) {
      this.currentPage = int;
      this.$store.dispatch(
        "admin/getEmails",
        `/emails/?limit=${this.limit}&page=${this.currentPage}`
      );
    },

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
    },

    async sortByDate() {
      this.sort = this.sort == "dateCreated" ? "-dateCreated" : "dateCreated";
      await this.$store.dispatch(
        "admin/getUsers",
        `/users/?sort=${this.sort}&limit=${this.limit}&page=${this.currentPage}`
      );
    },

    setImage(e) {
      this.image = e.target.files[0];
    },

    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    duplicateData(item) {
      this.title = item.title;
      this.image = item.image;
      this.template = item.template;
      this.greetings = item.greetings;
      this.content = item.content;
    },

    copyData(item) {
      this.isEditing = false;
      this.editingId = "";
      this.duplicateData(item);
    },

    prepareEdit(item) {
      this.isEditing = true;
      this.editingId = item.id;
      this.duplicateData(item);
    },

    clearInputs() {
      this.title = "";
      this.content = "";
      this.image = "";
      this.greetings = "";
      this.template = "";

      this.isEditing = false;
      this.editingId = "";
    },

    async processData() {
      const form = new FormData();
      form.append("title", this.title);
      form.append("content", this.content);
      form.append("image", this.image);
      form.append("template", this.template);
      form.append("greetings", this.greetings);

      this.onRequest = true;
      const payload = {
        form: form,
        url: this.isEditing
          ? `/emails/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}`
          : `/emails/?limit=${this.limit}&page=${this.currentPage}`,
      };
      const result = await this.$store.dispatch("admin/makePOST", payload);
      this.handleResponse(result);
    },

    handleResponse(result) {
      console.log(result, result.response);
      this.onRequest = false;
      if (result.response) {
        this.showModal(
          result.response.data.message,
          false,
          result.response.data.error,
          !result.response.data.error
        );
      }

      if (result.data) {
        this.showModal(
          result.data.message,
          false,
          result.data.error,
          !result.data.error
        );
        if (!result.data.error) {
          this.clearInputs();
          this.$store.dispatch(`admin/initializeAdminDetails`);
        }
      }
    },

    showModal(msg, warning, error, success) {
      const payload = {
        msg: msg,
        isWarning: warning,
        isError: error,
        isSuccess: success,
        table: "",
        action: "",
        url: ``,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload);
    },
  },

  computed: {
    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },

    items() {
      return this.$store.state.admin.emails;
    },

    selectedEmails() {
      return this.$store.state.admin.selectedEmails;
    },

    totalLength() {
      return this.$store.state.admin.emailLength;
    },

    isAllEmailSelected() {
      return this.$store.state.admin.isAllEmailSelected;
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
