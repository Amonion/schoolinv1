<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Blogs<span class="admin-page-time">{{
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
              <div class="admin-tl-name1 banner">
                <div>Category</div>
              </div>
              <div class="admin-tl-time1 banner"><div>Title</div></div>
              <div class="admin-tl-time1 banner"><div>Subtitle</div></div>
              <div class="admin-tl-time1 banner">
                <div>Time</div>
              </div>
              <div class="admin-tl-time1"><div>Analytics</div></div>
            </div>
            <div
              v-for="(item, int) in blog"
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
                      blog,
                      'blog-settings'
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
              <div class="admin-tl-name1 banner">
                <div :class="{ suspended: item.status == 0 }">
                  {{ item.category }}
                </div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.title }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.subtitle }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ formatDate(item.time * 1) }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>
                  {{ item.comments }} Comments <br />
                  {{ item.views }} Views
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
          @click="prepareCopy(selectedItems[selectedItems.length - 1])"
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
            <label for="name-5" class="admin-input-label">Title </label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="title"
              placeholder="Enter Post Title"
            />
          </div>

          <div>
            <label for="intro-4" class="admin-input-label"
              >Category<span class="admin-marked"></span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="category"
              placeholder="Enter Post Category"
            />
          </div>

          <div>
            <label for="intro-4" class="admin-input-label"
              >Blog Type<span class="admin-marked"></span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="blogType"
              placeholder="Enter Post Type"
            />
          </div>

          <div>
            <label for="subtitle-4" class="admin-input-label">Subtitle</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="subtitle"
              placeholder="Enter Post Subtitle"
            />
          </div>
          <div>
            <label for="subtitle-4" class="admin-input-label">Author</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="author"
              placeholder="Enter Post Author"
            />
          </div>
          <div>
            <label for="subtitle-4" class="admin-input-label">Time</label
            ><input
              type="date"
              class="admin-text-input w-input"
              v-model="time"
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

      limit: 20,
      currentPage: 1,
      sort: "-time",

      title: "",
      subtitle: "",
      category: "",
      author: "",
      blogType: "",
      banner: "",
      content: "",
      time: "",

      isEditing: false,
      editingId: null,
    };
  },

  methods: {
    setImage(e) {
      this.banner = e.target.files[0];
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

    duplicate(item) {
      this.title = item.title;
      this.subtitle = item.subtitle;
      this.category = item.category;
      this.author = item.author;
      this.blogType = item.blogType;
      this.banner = item.banner;
      this.content = item.content;
      this.time = new Date(item.time).getTime();
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
      this.duplicate(item);

      this.isEditing = true;
      this.editingId = item.id;
    },

    prepareCopy(item) {
      this.duplicate(item);
      this.isEditing = false;
      this.editingId = "";
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

    paginate(int) {
      this.currentPage = int;
      this.getBlog();
    },

    clearInputs() {
      this.title = "";
      this.subtitle = "";
      this.category = "";
      this.author = "";
      this.blogType = "";
      this.banner = "";
      this.content = "";
      this.time = "";

      this.isEditing = false;
      this.editingId = "";
      this.$store.commit("admin/clearBlog");
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

    async processData() {
      const form = new FormData();
      form.append("title", this.title);
      form.append(
        "time",
        this.time == "" ? undefined : new Date(this.time).getTime()
      );
      form.append("category", this.category);
      form.append("subtitle", this.subtitle);
      form.append("author", this.author);
      form.append("blogType", this.blogType);
      form.append("image", this.banner);
      form.append("content", this.content);
      const url = this.isEditing
        ? `/blog/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
        : `/blog/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;

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
      return this.$store.state.admin.blogLength;
    },

    selectedItems() {
      return this.$store.state.admin.selectedBlog;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.isAllBlogSelected;
    },

    blog() {
      return this.$store.state.admin.blogs;
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
