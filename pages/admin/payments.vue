<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Payments <span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs ref">
            <div class="admin-home-table-head pad">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-time1">
                <div>Image</div>
              </div>
              <div class="admin-tl-time1">
                <div>Level</div>
              </div>
              <div class="admin-tl-time1">
                <div>Name</div>
              </div>
              <div class="admin-tl-time1">
                <div>School</div>
              </div>
              <div class="admin-tl-time1">
                <div>Amount</div>
              </div>
              <div class="admin-tl-time1">
                <div>Charges</div>
              </div>
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
                      'payment-settings'
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

              <div class="admin-tl-time1">
                <img width="80" :src="`${FILE_URL}/${item.image}`" alt="" />
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.level }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.name }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.school }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>N{{ numberWithCommas(item.amount) }}</div>
              </div>

              <div class="admin-tl-time1">
                <div>N{{ numberWithCommas(item.charges) }}</div>
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
            <label for="name-6" class="admin-input-label">Level </label>
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

          <div v-if="level == 2" class="admin-input-wrapper">
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
            <label for="name-5" class="admin-input-label">Name </label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="name"
              placeholder="Enter Name"
            />
          </div>

          <div class="admin-input-wrapper">
            <label for="name-5" class="admin-input-label">Amount </label
            ><input
              type="number"
              class="admin-text-input w-input"
              v-model="amount"
              placeholder="Enter Amount"
            />
          </div>

          <div class="admin-input-wrapper">
            <label for="name-5" class="admin-input-label">Charges </label
            ><input
              type="number"
              class="admin-text-input w-input"
              v-model="charges"
              placeholder="Enter Charges"
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
      limit: 10,
      currentPage: 1,
      sort: "-time",

      levels: [1, 2],
      level: "Select Level",
      name: "",
      amount: "",
      charges: "",
      description: "",
      schoolLevel: "",
      time: "",

      school: "Select School",
      schoolId: "",
      showSchools: false,

      showLevels: false,

      isEditing: false,
      editingId: "",
      onRequest: false,
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

    numberWithCommas(number) {
      if (isNaN(number)) {
        return 0;
      }
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
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

    formatDateToTime(date) {
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    setLevel(int) {
      this.level = int;
      this.showLevels = false;
    },

    setSchool(item) {
      this.school = item.name;
      this.schoolId = item.id;
      this.showSchools = false;
    },

    clearInputs() {
      this.school = "Select School";
      this.level = "Select Level";
      this.amount = "";
      this.charges = "";
      this.name = "";
      this.description = "";
      this.schoolId = "";
      this.editingId = "";
      this.isEditing = false;
    },

    paginate(int) {
      this.currentPage = int;
      this.$store.dispatch(
        "admin/getReferrals",
        `/referrals/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    prepareDelete(id) {
      const payload = {
        msg: `Are you sure you want to delete this Referral?`,
        isWarning: true,
        isError: false,
        isSuccess: false,
        table: "referrals",
        action: "delete",
        url: `/referrals/?id=${id}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload);
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
        // this.showModal(
        //   "Please select at least an item to edit",
        //   false,
        //   true,
        //   false,
        //   "",
        //   "",
        //   ""
        // );
        return;
      }
      this.populateData(item);

      this.isEditing = true;
      this.editingId = item.id;
    },

    duplicateData(item) {
      if (!item) {
        // this.showModal(
        //   "Please select at least an item to edit",
        //   false,
        //   true,
        //   false,
        //   "",
        //   "",
        //   ""
        // );
        return;
      }
      this.populateData(item);
    },

    populateData(item) {
      this.name = item.name;
      this.school = item.school;
      this.schoolId = item.schoolId;
      this.charges = item.charges;
      this.amount = item.amount;
      this.level = item.level;
      this.description = item.description;
      this.image = item.image;
    },

    setImage(e) {
      this.image = e.target.files[0];
    },

    async processData() {
      const form = new FormData();
      form.append("name", this.name);
      form.append("school", "Select School" ? "" : this.school);
      form.append("schoolId", this.schoolId);
      form.append("description", this.description);
      form.append("image", this.image);
      form.append("amount", this.amount);
      form.append("charges", this.charges);
      form.append("level", this.level);
      form.append("time", new Date(this.time));

      const url = this.isEditing
        ? `/payments/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}`
        : `/payments/?limit=${this.limit}&page=${this.currentPage}`;

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
      console.log(result, result.response);
      if (!result.response) {
        this.$store.commit("admin/setPayments", result.data);
        this.clearInputs();
      } else {
        // this.showModal();
      }
    },

    async getPayments() {
      const url = `/payments/?limit=${this.limit}&page=${this.currentPage}`;
      await this.$store.dispatch("admin/getPayments", url);
    },
  },

  mounted() {
    this.getPayments();
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    schools() {
      return this.$store.state.admin.schools;
    },

    items() {
      return this.$store.state.admin.payments;
    },

    selectedItems() {
      return this.$store.state.admin.selectedPayments;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.selectedPayments;
    },

    totalLength() {
      return this.$store.state.admin.paymentLength;
    },

    url() {
      return this.$store.state.admin.modalURL;
    },

    responseMsg() {
      return this.$store.state.admin.modalMsg;
    },

    showModal() {
      return this.$store.state.admin.showModal;
    },

    editorConfig() {
      return this.$store.state.editor.editorConfig;
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

<style>
.filt {
  bottom: 40px;
}
</style>
