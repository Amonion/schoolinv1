<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Manager<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs his">
            <table class="w-full">
              <thead>
                <tr class="admin-home-table-head pad">
                  <td>S/N</td>
                  <td>Level</td>
                  <td>Personal</td>
                  <td>Referral</td>
                  <td>Bonus</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, int) in managers"
                  :key="int"
                  class="admin-home-table-body even"
                >
                  <td class="flex">
                    <div>{{ int + 1 }}</div>
                    <div
                      class="admin-toggler ml-1"
                      @click="
                        handleCheckedItems(
                          item,
                          selectedManagers,
                          managers,
                          'manager-settings'
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
                  </td>
                  <td>{{ item.level }}</td>
                  <td>{{ numberWithCommas(item.personal) }}</td>
                  <td>${{ numberWithCommas(item.referral) }}</td>
                  <td>${{ numberWithCommas(item.bonus) }}</td>
                  <td class="flex">
                    <img
                      @click="prepareEdit(item)"
                      src="/images/admin/edit-blue.svg"
                      loading="lazy"
                      alt=""
                      class="admin-tb-action-icon"
                    /><img
                      @click="prepareDelete(item.id)"
                      src="/images/admin/delete-red.svg"
                      loading="lazy"
                      alt=""
                      class="admin-tb-action-icon"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
            <label for="name-5" class="admin-input-label">Level</label
            ><input
              type="number"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="level"
              placeholder="Enter Level"
            />
          </div>
          <div>
            <label for="intro-4" class="admin-input-label"
              >Personal<span class="admin-marked"></span></label
            ><input
              type="number"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="personal"
              placeholder="Enter Personal Amount"
            />
          </div>
          <div>
            <label for="intro-4" class="admin-input-label"
              >Referral<span class="admin-marked"></span></label
            ><input
              type="number"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="referral"
              placeholder="Enter Referral Amount"
            />
          </div>
          <div>
            <label for="intro-4" class="admin-input-label"
              >Bonus<span class="admin-marked"></span></label
            ><input
              type="number"
              class="admin-text-input w-input"
              v-model="bonus"
              placeholder="Enter Bonus"
            />
          </div>
        </div>
        <div>
          <label for="field-3" class="admin-input-label">Instruction</label
          ><textarea
            placeholder="Enter Instruction"
            v-model="instruction"
            class="admin-text-input w-input"
          ></textarea>
        </div>

        <div class="admin-validation-msg">
          Please Enter all Marked * Fields Correctly
        </div>
        <div class="admin-btn-holder">
          <div v-if="onRequest" class="admin-cus-btn spinner">
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

      level: 0,
      personal: 0,
      referral: 0,
      bonus: 0,
      instruction: "",
      onRequest: false,
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

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(i);
      }
      return pages.length;
    },

    clearInputs() {
      this.level = 0;
      this.personal = 0;
      this.referral = 0;
      this.bonus = 0;
      this.instruction = "";

      this.isEditing = false;
      this.editingId = null;
    },

    prepareEdit(item) {
      this.level = item.level;
      this.personal = item.personal;
      this.referral = item.referral;
      this.bonus = item.bonus;
      this.instruction = item.instruction;
      this.isEditing = true;
      this.editingId = item.id;
    },

    prepareDelete(id) {
      const payload = {
        msg: `Are you sure you want to delete this management?`,
        isWarning: true,
        isError: false,
        isSuccess: false,
        table: "manager",
        action: "delete",
        url: `/manager/?id=${id}&limit=${this.limit}&page=${this.currentPage}`,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload);
    },

    async processData() {
      const form = {
        level: this.level,
        personal: this.personal,
        referral: this.referral,
        bonus: this.bonus,
        instruction: this.instruction,
      };

      this.onRequest = true;

      let result;

      if (this.isEditing) {
        const payload = {
          form: form,
          url: `/manager/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}`,
        };
        result = await this.$store.dispatch("admin/makePOST", payload);
        this.handleResponse(result);
      } else {
        const payload = {
          form: form,
          url: `/manager/?limit=${this.limit}&page=${this.currentPage}`,
        };
        result = await this.$store.dispatch("admin/makePOST", payload);
        this.handleResponse(result);
      }
    },

    handleResponse(result) {
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
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    managers() {
      return this.$store.state.admin.managers;
    },

    selectedManagers() {
      return this.$store.state.admin.selectedManagers;
    },

    totalLength() {
      return this.$store.state.admin.managerLength;
    },

    isAllPlansSelected() {
      return this.$store.state.admin.isAllPlansSelected;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>
<style></style>
