<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Signup<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
    </div>
    <div class="admin-plan-form topless w-form">
      <div class="admin-plan-form-flex">
        <div class="w-layout-grid signup-grid">
          <div
            id="w-node-_6b42f51d-9a0a-b860-2a83-21957409a746-17190892"
            class="admin-input-wrapper"
          >
            <div class="admin-table-toggleall">
              <div class="admin-toggler">
                <img
                  src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bd0969d843c582936cc5c_check-mark-icon%201.svg"
                  loading="lazy"
                  width="10"
                  alt=""
                />
              </div>
              <div>Recaptcha</div>
            </div>
          </div>
          <div
            id="w-node-_6b42f51d-9a0a-b860-2a83-21957409a74a-17190892"
            class="admin-input-wrapper"
          >
            <div class="admin-table-toggleall">
              <div class="admin-toggler">
                <img
                  src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bd0969d843c582936cc5c_check-mark-icon%201.svg"
                  loading="lazy"
                  width="10"
                  alt=""
                />
              </div>
              <div>Country</div>
            </div>
          </div>
          <div id="w-node-_6b42f51d-9a0a-b860-2a83-21957409a75e-17190892">
            <div class="admin-table-toggleall">
              <div class="admin-toggler">
                <img
                  src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bd0969d843c582936cc5c_check-mark-icon%201.svg"
                  loading="lazy"
                  width="10"
                  alt=""
                />
              </div>
              <div>Phone</div>
            </div>
          </div>
          <div id="w-node-_6b42f51d-9a0a-b860-2a83-21957409a764-17190892">
            <div class="admin-table-toggleall">
              <div class="admin-toggler">
                <img
                  src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bd0969d843c582936cc5c_check-mark-icon%201.svg"
                  loading="lazy"
                  width="10"
                  alt=""
                />
              </div>
              <div>Verify Phone</div>
            </div>
          </div>
          <div class="admin-table-toggleall">
            <div class="admin-toggler">
              <img
                src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bd0969d843c582936cc5c_check-mark-icon%201.svg"
                loading="lazy"
                width="10"
                alt=""
              />
            </div>
            <div>Verify Email</div>
          </div>
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
          <div v-else class="admin-cus-btn"><div>Submit</div></div>
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

      question: "",
      answer: "",
      bannerSubtitle: "",
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
      this.question = item.question;
      this.answer = item.answer;
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
        `Are you sure you want to delete this faq?`,
        true,
        false,
        false,
        `delete`,
        `/faq/?id=${id}`,
        ``
      );
    },

    clearInputs() {
      this.question = "";
      this.answer = "";
      this.category = "";
      this.isEditing = false;
      this.editingId = "";
    },

    async sortByDate() {
      this.sort = this.sort == "time" ? "-time" : "time";
      this.getReviews();
    },

    async getFaq() {
      await this.$store.dispatch(
        "admin/getFaq",
        `/faq/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    async processData() {
      const form = {
        question: this.question,
        answer: this.answer,
        category: this.category,
        time: this.isEditing ? null : new Date().getTime(),
      };
      const url = this.isEditing
        ? `/faq/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
        : `/faq/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;

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
        this.getFaq();
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

    faq() {
      return this.$store.state.admin.faq;
    },
  },
};
</script>
<style></style>
