<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Banners<span class="admin-page-time">{{ formatDate() }}</span>
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
              <div class="admin-tl-time1 banner"><div>Intro</div></div>
              <div class="admin-tl-time1 banner">
                <div>Subtitle</div>
              </div>
              <div class="admin-tl-time1"><div>Time</div></div>
            </div>
            <div
              v-for="(item, int) in banners"
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
                      banners,
                      'banner-settings'
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
                  :src="`${FILE_URL}/${item.bannerImage}`"
                  loading="lazy"
                  width="90"
                  sizes="90px"
                  alt=""
                  :srcset="`${FILE_URL}/${item.bannerImage} 500w,
                    ${FILE_URL}/${item.bannerImage} 800w,
                    ${FILE_URL}/${item.bannerImage} 1080w,
                   ${FILE_URL}/${item.bannerImage} 1200w`"
                />
              </div>
              <div class="admin-tl-name1 banner">
                <div>{{ item.bannerCategory }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.bannerTitle }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.bannerIntro }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.bannerSubtitle }}</div>
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
          <div @click="toggleSelectAllItems" class="admin-toggler">
            <img
              v-if="isAllItemsSelected"
              src="/images/admin/check-blue.svg"
              loading="lazy"
              width="10"
              alt=""
            />
          </div>
          <div>Select All</div>
        </div>

        <div class="admin-action-items">
          <div class="admin-action-drop-head" @click="sortByDate">
            <div>Sort By Date</div>
            <img
              src="/images/admin/sort-blue.svg"
              loading="lazy"
              alt=""
              class="admin-action-drop"
            />
          </div>
        </div>
        <img
          @click="prepareDelete"
          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bcbb9998532066acd920d_trash-bin-icon%201.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
        />
      </div>
    </div>
    <div class="admin-plan-form w-form">
      <form class="admin-plan-form-flex">
        <div class="w-layout-grid grid-form">
          <div class="admin-input-wrapper">
            <label for="name-5" class="admin-input-label">Title </label
            ><input
              type="text"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="bannerTitle"
              placeholder="Enter Banner Title"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="name-6" class="admin-input-label">Category </label>
            <div
              class="admin-text-input"
              @click="showCategories = !showCategories"
            >
              <div>{{ bannerCategory }}</div>
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
              :class="{ hide: !showCategories }"
            >
              <li
                v-for="(item, int) in categories"
                :key="int"
                class="admin-action-listitems"
                @click="setItem(item)"
              >
                <div>{{ item }}</div>
              </li>
            </ul>
          </div>
          <div>
            <label for="intro-3" class="admin-input-label"
              >Intro<span class="admin-marked"></span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="bannerIntro"
              placeholder="Enter Banner Intro"
            />
          </div>
          <div>
            <label for="subtitle-3" class="admin-input-label">Subtitle</label
            ><input
              type="text"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="bannerSubtitle"
              placeholder="Enter Banner Subtitle"
            />
          </div>
        </div>

        <div class="admin-validation-msg">
          Please Enter all Marked * Fields Correctly
        </div>

        <div class="admin-btn-holder">
          <label id="image" class="admin-cus-btn">
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
          </label>
          <div v-if="onRequest" class="admin-cus-btn">
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656d2b5b181159eed0fa4c4c_loader-line-icon%201.svg"
              loading="lazy"
              alt=""
              class="admin-btn-icon"
            />
            <div>Processing</div>
          </div>
          <div v-else class="admin-cus-btn" @click="processData">
            <div>Submit</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",

  data() {
    return {
      onRequest: false,
      showCategories: false,

      limit: 10,
      currentPage: 1,
      sort: "time",

      bannerImage: "",
      bannerTitle: "",
      bannerIntro: "",
      bannerSubtitle: "",
      bannerCategory: "Select Category",
      categories: [
        "Home",
        "About",
        "Services",
        "Partnership",
        "Contact",
        "Signup",
        "Login",
      ],
      time: "",

      isEditing: false,
      editingId: null,
    };
  },

  methods: {
    setImage(e) {
      this.bannerImage = e.target.files[0];
    },

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

    setItem(item) {
      this.bannerCategory = item;
      this.showCategories = false;
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
      this.bannerTitle = item.bannerTitle;
      this.bannerCategory = item.bannerCategory;
      this.bannerSubtitle = item.bannerSubtitle;
      this.bannerIntro = item.bannerIntro;
      this.isEditing = true;
      this.editingId = item.id;
      this.time = item.time;
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
        `Are you sure you want to delete this banner?`,
        true,
        false,
        false,
        `delete`,
        `/banners/?id=${id}`,
        ``
      );
    },

    clearInputs() {
      this.bannerCategory = "Select Category";
      this.bannerTitle = "";
      this.bannerSubtitle = "";
      (this.bannerImage = ""), (this.bannerIntro = "");
      this.isEditing = false;
      this.editingId = "";
    },

    async sortByDate() {
      this.sort = this.sort == "time" ? "-time" : "time";
      this.getBanners();
    },

    async getBanners() {
      await this.$store.dispatch(
        "admin/getBanners",
        `/banners/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    async processData() {
      const form = new FormData();
      form.append("bannerIntro", this.bannerIntro);
      form.append("time", new Date(this.time).getTime());
      form.append("bannerSubtitle", this.bannerSubtitle);
      form.append("bannerTitle", this.bannerTitle);
      form.append("bannerImage", this.bannerImage);
      form.append("bannerCategory", this.bannerCategory);
      const url = this.isEditing
        ? `/banners/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
        : `/banners/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;

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
      console.log(result, result.response);
      if (result.response) {
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
        this.$store.commit("admin/setBanners", result.data);
        this.clearInputs();
      }
    },
  },

  computed: {
    totalLength() {
      return this.$store.state.admin.bannerLength;
    },

    selectedItems() {
      return this.$store.state.admin.selectedBanners;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.isAllBannerSelected;
    },

    banners() {
      return this.$store.state.admin.banners;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>
<style></style>

<style></style>
