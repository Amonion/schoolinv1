<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Staffs<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs">
            <div class="admin-home-table-head">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-img1"><div>Image</div></div>
              <div class="admin-tl-name1"><div>Name</div></div>
              <div class="admin-tl-email1"><div>Position</div></div>
              <div class="admin-tl-email1"><div>Quote</div></div>
              <div class="admin-tl-time1"><div>Actions</div></div>
            </div>
            <div
              v-for="(item, int) in staffs"
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
                      staffs,
                      'staffs-settings'
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
              <div class="admin-tl-img1">
                <div class="img-bg-60">
                  <img
                    :src="`${FILE_URL}/${item.image}`"
                    loading="lazy"
                    sizes="(max-width: 479px) 21vw, 60px"
                    :srcset="`
                      ${FILE_URL}/${item.image}   500w,
                      ${FILE_URL}/${item.image}   800w,
                      ${FILE_URL}/${item.image} 1080w,
                      ${FILE_URL}/${item.image} 1600w,
                      ${FILE_URL}/${item.image} 2000w,
                      ${FILE_URL}/${item.image} 2600w,
                      ${FILE_URL}/${item.image} 3200w,
                      ${FILE_URL}/${item.image}        3397w`"
                    alt=""
                    class="responsive-img"
                  />
                </div>
              </div>
              <div class="admin-tl-name1">
                <span class="admin-tb-username">{{ item.name }}</span>
              </div>
              <div class="admin-tl-email1">
                <div>{{ item.position }}</div>
              </div>
              <div class="admin-tl-email1">
                <div>{{ truncateText(item.quote) }}</div>
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
            <label for="name-4" class="admin-input-label">Name</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="name"
              placeholder="Enter Staff Name"
            />
          </div>
          <div>
            <label for="intro-2" class="admin-input-label"
              >Position<span class="admin-marked"></span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="position"
              placeholder="Enter Staff Position"
            />
          </div>
        </div>
        <div>
          <label for="field-4" class="admin-input-label">Quote</label
          ><textarea
            placeholder="Enter Quote"
            v-model="quote"
            class="admin-text-input w-input"
          ></textarea>
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
          <label for="image" v-else class="admin-cus-btn">
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
      sort: "time",

      image: null,
      name: "",
      position: "",
      quote: "",
      time: "",

      isEditing: false,
      editingId: null,
    };
  },

  methods: {
    setImage(e) {
      this.image = e.target.files[0];
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

    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },

    prepareEdit(item) {
      this.name = item.name;
      this.position = item.position;
      this.quote = item.quote;
      this.time = item.time;
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
        `Are you sure you want to delete this staff?`,
        true,
        false,
        false,
        `delete`,
        `/staffs/?id=${id}`,
        ``
      );
    },

    clearInputs() {
      this.name = "";
      this.position = "";
      this.quote = "";
      this.image = "";
      this.time = "";
      this.isEditing = false;
      this.editingId = "";
    },

    async sortByDate() {
      this.sort = this.sort == "time" ? "-time" : "time";
      this.getStaffs();
    },

    async getStaffs() {
      await this.$store.dispatch(
        "admin/getStaffs",
        `/staffs/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    async processData() {
      const form = new FormData();
      form.append("name", this.name);
      form.append("time", new Date(this.time).getTime());
      form.append("position", this.position);
      form.append("quote", this.quote);
      form.append("image", this.image);
      const url = this.isEditing
        ? `/staffs/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
        : `/staffs/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;

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
        this.getStaffs();
        this.clearInputs();
      }
    },
  },

  computed: {
    totalLength() {
      return this.$store.state.admin.staffLength;
    },

    selectedItems() {
      return this.$store.state.admin.selectedStaffs;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.isAllStaffSelected;
    },

    staffs() {
      return this.$store.state.admin.staffs;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>
<style></style>
