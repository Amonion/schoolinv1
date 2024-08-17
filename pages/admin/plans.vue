<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Plans<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs">
            <div class="admin-home-table-head">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-name1"><div>Name</div></div>
              <div class="admin-tl-email1"><div>Period</div></div>
              <div class="admin-tl-time1"><div>Duration</div></div>
              <div class="admin-tl-time1"><div>Percent</div></div>
              <div class="admin-tl-time1"><div>Maximum</div></div>
              <div class="admin-tl-time1"><div>Minimum</div></div>
              <div class="admin-tl-time1 plan"><div>Actions</div></div>
            </div>
            <div
              v-for="(item, int) in plans"
              :key="int"
              class="admin-home-table-body plan"
              :class="{ even: int % 2 == 0 }"
            >
              <div class="admin-tl-sn2">
                <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
                <div
                  class="admin-toggler ml-1"
                  @click="
                    handleCheckedItems(
                      item,
                      selectedPlans,
                      plans,
                      'plan-settings'
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
              <div class="admin-tl-name1">
                <div>{{ item.planName }}</div>
              </div>
              <div class="admin-tl-email1">
                <div>{{ item.planPeriod }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.planDuration }} Days</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.planPercentage }}%</div>
              </div>
              <div class="admin-tl-time1">
                <div>${{ item.planMaximum }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>${{ item.planMinimum }}</div>
              </div>
              <div class="admin-tl-time1 plan">
                <img
                  @click="prepareEdit(item)"
                  src="/images/admin/edit-blue.svg"
                  loading="lazy"
                  alt=""
                  class="admin-tb-action-icon"
                />
                <img
                  @click="prepareDelete(item.id)"
                  src="/images/admin/delete-red.svg"
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
        /><img
          src="/images/admin/copy-blue.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
        /><img
          src="/images/admin/delete-red.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
        />
      </div>
    </div>
    <div class="admin-plan-form w-form">
      <div name="email-form-2" class="admin-plan-form-flex">
        <div class="w-layout-grid grid-form">
          <div class="admin-input-wrapper">
            <label for="name-2" class="admin-input-label"
              >Plan Name <span class="admin-marked">*</span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              placeholder="Enter Plan Name"
              v-model="planName"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="name-2" class="admin-input-label"
              >Plan Period <span class="admin-marked">*</span></label
            >
            <div
              class="admin-text-input listing"
              @click="showPeriod = !showPeriod"
            >
              <div>{{ planPeriod }}</div>
              <img
                src="/images/admin/caret-down-blue.svg"
                loading="lazy"
                id="w-node-_3ce16229-7cbd-d702-f359-355777d3af4d-17190892"
                alt=""
                class="admin-input-icon"
              />
            </div>
            <ul
              role="list"
              class="admin-action-list input"
              :class="{ hide: !showPeriod }"
            >
              <li
                v-for="(item, int) in periods"
                :key="int"
                class="admin-action-listitems"
                @click="setItem(item)"
              >
                <div>{{ item.name }}</div>
              </li>
            </ul>
          </div>
          <div>
            <label for="duration-2" class="admin-input-label"
              >Plan Duration (in days)<span class="admin-marked">*</span></label
            ><input
              type="number"
              class="admin-text-input w-input"
              maxlength="256"
              placeholder="Enter Plan Duration"
              v-model="planDuration"
            />
          </div>
          <div id="w-node-_6dd8fd10-d573-f7f3-867e-87c958ac7955-17190892">
            <label for="percent-2" class="admin-input-label"
              >Plan Percentage <span class="admin-marked">*</span></label
            ><input
              type="number"
              class="admin-text-input w-input"
              maxlength="256"
              placeholder="Enter Plan Percentage"
              v-model="planPercentage"
            />
          </div>
          <div>
            <label for="minimum-2" class="admin-input-label"
              >Plan Mimimum <span class="admin-marked">*</span></label
            ><input
              type="number"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="planMinimum"
              placeholder="Enter Plan Minimum"
            />
          </div>
          <div>
            <label for="maximum-2" class="admin-input-label">Plan Maximum</label
            ><input
              type="number"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="planMaximum"
              placeholder="Enter Plan Maximum"
            />
          </div>
          <div>
            <label for="description-2" class="admin-input-label"
              >Plan Description</label
            ><input
              type="text"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="planDescription"
              placeholder="Enter Plan Maximum"
            />
          </div>
          <div>
            <label for="tags-2" class="admin-input-label">Plan Tags</label
            ><input
              type="text"
              class="admin-text-input w-input"
              maxlength="256"
              placeholder="Eg Free Visa, Yearly Bonus, New Car. etc"
              v-model="planTags"
            />
          </div>
        </div>
        <div class="admin-validation-msg">
          Please Enter all Marked * Fields Correctly
        </div>
        <div class="admin-btn-holder">
          <div v-if="onRequest" class="admin-cus-btn">
            <img
              src="/images/admin/spinner-white.svg"
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

      showPeriod: false,
      periods: [
        { name: "Daily", time: 86400000 },
        { name: "Weekly", time: 604800000 },
        { name: "Monthly", time: 2592000000 },
      ],
      onRequest: false,
      planName: "",
      planPeriod: "Select Plan Period",
      planDuration: 5,
      planMinimum: 0,
      planMaximum: 0,
      planPercentage: 0,
      planDescription: "",
      planTags: "",
      planCycle: 86400000,

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

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
    },

    clearInputs() {
      planName = "";
      planPeriod = "Select Plan Period";
      planDuration = 5;
      planMinimum = 0;
      planMaximum = 0;
      planPercentage = 0;
      planDescription = "";
      planTags = "";
      planCycle = 86400000;

      isEditing = false;
      editingId = null;
    },

    async sortByDate() {
      this.sort = this.sort == "dateCreated" ? "-dateCreated" : "dateCreated";
      await this.$store.dispatch(
        "admin/getUsers",
        `/users/?sort=${this.sort}&limit=${this.limit}&page=${this.currentPage}`
      );
    },

    async sendEmail() {
      const form = { users: storeState.user, email: email.value };

      const result = await storeState.makePost(
        form,
        `emails/users`,
        `?send=true`
      );

      if (result.status.value == "error") {
        storeState.responseMsg = result.error.value.data.message;
        storeState.showModal = true;
        storeState.isError = true;
        storeState.isSuccess = false;
        storeState.isWarning = false;
      } else {
        storeState.responseMsg = result.data.value.message;
        storeState.showModal = true;
        storeState.isError = false;
        storeState.isWarning = false;
        storeState.isSuccess = true;

        clearInputs();
      }
    },

    prepareDelete(id) {
      const payload = {
        msg: `Are you sure you want to delete this Plan?`,
        isWarning: true,
        isError: false,
        isSuccess: false,
        table: "plans",
        action: "delete",
        url: `/plans/?id=${id}&limit=${this.limit}&page=${this.currentPage}`,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload);
    },

    setItem(item) {
      this.planPeriod = item.name;
      this.planCycle = item.time;
      this.showPeriod = false;
    },

    prepareEdit(item) {
      this.planName = item.planName;
      this.planPeriod = item.planPeriod;
      this.planDuration = item.planDuration;
      this.planMinimum = item.planMinimum;
      this.planMaximum = item.planMaximum;
      this.planPercentage = item.planPercentage;
      this.planCycle = item.planCycle;
      this.planTags = item.planTags;
      this.planDescription = item.planDescription;
      this.isEditing = true;
      this.editingId = item.id;
    },

    clearInputs() {
      this.planName = "";
      this.planTags = "";
      this.planDescription = "";
      this.planPeriod = "Select Plan Period";
      this.planDuration = 0;
      this.planMinimum = 0;
      this.planMaximum = 0;
      this.planCycle = 86400000;
      this.planPercentage = 0;
      this.isEditing = false;
      this.editingId = "";
    },

    async processData() {
      if (this.planPeriod == "Select Plan Period") {
        this.showModal("Please Select Plan Period", false, true, false);
        return;
      }

      if (this.planName == "") {
        this.showModal("Please enter plan name", false, true, false);
        return;
      }

      const form = new FormData();
      form.append("planName", this.planName);
      form.append("time", new Date().getTime());
      form.append("planPeriod", this.planPeriod);
      form.append("planDuration", this.planDuration);
      form.append("planMaximum", this.planMaximum);
      form.append("planMinimum", this.planMinimum);
      form.append("planPercentage", this.planPercentage);
      form.append("planTags", this.planTags);
      form.append("planDescription", this.planDescription);
      form.append("planCycle", this.planCycle);

      this.onRequest = true;

      let result;

      if (this.isEditing) {
        const payload = {
          form: form,
          url: `/plans/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}`,
        };
        result = await this.$store.dispatch("admin/makePOST", payload);
        this.handleResponse(result);
      } else {
        const payload = {
          form: form,
          url: `/plans/?limit=${this.limit}&page=${this.currentPage}`,
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

    plans() {
      return this.$store.state.admin.plans;
    },

    selectedPlans() {
      return this.$store.state.admin.selectedPlans;
    },

    totalLength() {
      return this.$store.state.admin.planLength;
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
