<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Terms<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs his">
            <div class="admin-home-table-head pad">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-name1 banner">
                <div>Category</div>
              </div>
              <div class="admin-tl-time1 banner"><div>Title</div></div>
              <div class="admin-tl-time1 banner">
                <div>Content</div>
              </div>
              <div class="admin-tl-time1"><div>Action</div></div>
            </div>
            <div
              v-for="(item, int) in terms"
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
                      terms,
                      'terms-settings'
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
              <div class="admin-tl-name1 banner">
                <div>{{ item.category }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.title }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div v-html="truncateText(item.content)"></div>
              </div>
              <div class="admin-tl-time1">
                <img
                  @click="prepareEdit(item)"
                  src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656d1bd1b48197e8dfd3218a_edit.svg"
                  loading="lazy"
                  alt=""
                  class="admin-tb-action-icon"
                /><img
                  @click="prepareDelete(item.id)"
                  src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bcbb9998532066acd920d_trash-bin-icon%201.svg"
                  loading="lazy"
                  alt=""
                  class="admin-tb-action-icon"
                />
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
          <div class="admin-toggler">
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bd0969d843c582936cc5c_check-mark-icon%201.svg"
              loading="lazy"
              width="10"
              alt=""
            />
          </div>
          <div>Select All</div>
        </div>
        <img
          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656d1bd1b48197e8dfd3218a_edit.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
        /><img
          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656d1b880a69f9c705082ba5_copy.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
        /><img
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
            <label for="name-5" class="admin-input-label">Category</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="category"
              placeholder="Enter  Category"
            />
          </div>
          <div>
            <label for="intro-4" class="admin-input-label"
              >Title<span class="admin-marked"></span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="title"
              placeholder="Enter Title"
            />
          </div>
        </div>
        <div>
          <label for="field-3" class="admin-input-label">content</label>
          <client-only placeholder="loading...">
            <ckeditor-nuxt
              class="editor"
              v-model="content"
              :config="editorConfig"
            />
          </client-only>
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
          <div v-else @click="processData" class="admin-cus-btn">
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
      sort: "time",

      title: "",
      content: "",
      category: "",
      time: "",

      isEditing: false,
      editingId: null,
    };
  },

  methods: {
    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
    },

    formatDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.toLocaleString("default", { month: "short" });
      const year = today.getFullYear();

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
      this.$store.commit(`admin/toggleSelectAllItems`, "review-settings");
    },

    handleCheckedItems(item, selectedItems, items, type) {
      this.$store.commit("admin/handleCheckedItems", {
        item,
        selectedItems,
        items,
        type,
      });
    },

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

    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    prepareEdit(item) {
      this.title = item.title;
      this.content = item.content;
      this.category = item.category;
      this.time = this.time;
      this.isEditing = true;
      this.editingId = item.id;
    },

    showModal(msg, warning, error, success, action, url, item) {
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
        `Are you sure you want to delete this terms?`,
        true,
        false,
        false,
        `delete`,
        `/terms/?id=${id}`,
        ``
      );
    },

    clearInputs() {
      this.title = "";
      this.content = "";
      this.category = "";
      this.isEditing = false;
      this.editingId = "";
    },

    async sortByDate() {
      this.sort = this.sort == "time" ? "-time" : "time";
      this.getTerms();
    },

    async getTerms() {
      await this.$store.dispatch(
        "admin/getTerms",
        `/terms/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    async processData() {
      const form = {
        title: this.title,
        content: this.content,
        category: this.category,
        time: this.isEditing ? null : new Date().getTime(),
      };
      const url = this.isEditing
        ? `/terms/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
        : `/terms/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;

      const payload = {
        form: form,
        url: url,
      };

      this.onRequest = true;

      if (this.isEditing) {
        const result = await this.$store.dispatch("admin/makePOST", payload);
        this.resultResponse(result);
      } else {
        const result = await this.$store.dispatch("admin/makePOST", payload);
        this.resultResponse(result);
      }
    },

    resultResponse(result) {
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
        this.getTerms();
        this.clearInputs();
      }
    },
  },

  computed: {
    totalLength() {
      return this.$store.state.admin.faqLength;
    },
    selectedItems() {
      return this.$store.state.admin.selectedFaq;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.isAllFaqSelected;
    },

    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },

    terms() {
      return this.$store.state.admin.terms;
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
