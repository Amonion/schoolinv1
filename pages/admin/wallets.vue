<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Wallets<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs">
            <div class="admin-home-table-head">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-name1 rev"><div>Image</div></div>
              <div class="admin-tl-email1 wallet"><div>Name</div></div>
              <div class="admin-tl-time1 plan"><div>Symbol</div></div>
              <div class="admin-tl-time1 rev"><div>Address</div></div>
              <div class="admin-tl-time1 plan"><div>Actions</div></div>
            </div>
            <div
              v-for="(item, int) in currencies"
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
                      selectedWallets,
                      wallets,
                      'wallet-settings'
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
              <div class="admin-tl-name1 rev">
                <img
                  :src="`${FILE_URL}/${item.image}`"
                  loading="lazy"
                  alt=""
                  class="admin-tb-wallet"
                />
              </div>
              <div class="admin-tl-email1 wallet">
                <div>{{ item.name }}</div>
              </div>
              <div class="admin-tl-time1 plan">{{ item.symbol }}</div>
              <div class="admin-tl-time1 rev">
                <div>{{ item.address }}</div>
              </div>
              <div class="admin-tl-time1 plan">
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
      <div class="admin-plan-form-flex">
        <div class="w-layout-grid grid-form">
          <div
            id="w-node-d284e316-064a-0d36-d885-0f3723b1eebf-17190892"
            class="admin-input-wrapper"
          >
            <label for="name-3" class="admin-input-label"
              >Name <span class="admin-marked">*</span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="name"
              placeholder="Enter Wallet Name"
            />
          </div>
          <div id="w-node-d284e316-064a-0d36-d885-0f3723b1eed6-17190892">
            <label for="duration-4" class="admin-input-label"
              >Symbol <span class="admin-marked">*</span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              maxlength="256"
              v-model="symbol"
              placeholder="Enter Wallet Symbol"
            />
          </div>
          <div id="w-node-d284e316-064a-0d36-d885-0f3723b1eed6-17190892">
            <label for="duration-4" class="admin-input-label"
              >Address <span class="admin-marked">*</span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              maxlength="256"
              placeholder="Enter Wallet Address"
              v-model="address"
            />
          </div>
        </div>
        <div class="admin-validation-msg">
          Please Enter all Marked * Fields Correctly
        </div>
        <div class="admin-btn-holder">
          <label id="image" class="admin-cus-btn">
            <img
              src="/images/admin/upload-white.svg"
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

      onRequest: false,
      name: "",
      symbol: "",
      address: "",
      image: "",

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

    setImage(e) {
      this.image = e.target.files[0];
    },

    prepareDelete(id) {
      const payload = {
        msg: `Are you sure you want to delete this currency?`,
        isWarning: true,
        isError: false,
        isSuccess: false,
        table: "currency",
        action: "delete",
        url: `/currency/?id=${id}&limit=${this.limit}&page=${this.currentPage}`,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload);
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
        msg: `Are you sure you want to delete this Currency?`,
        isWarning: true,
        isError: false,
        isSuccess: false,
        table: "currency",
        action: "delete",
        url: `/currency/?id=${id}&limit=${this.limit}&page=${this.currentPage}`,
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
      this.name = item.name;
      this.address = item.address;
      this.symbol = item.symbol;
      this.symbol = item.symbol;

      this.isEditing = true;
      this.editingId = item.id;
    },

    clearInputs() {
      this.name = "";
      this.image = "";
      this.symbol = "";
      this.address = "";
      this.isEditing = false;
      this.editingId = "";
    },

    async processData() {
      if (this.name == "") {
        this.showModal("Please enter wallet name", false, true, false);
        return;
      }

      if (this.address == "") {
        this.showModal("Please enter wallet address", false, true, false);
        return;
      }

      const form = new FormData();
      form.append("name", this.name);
      form.append("time", new Date().getTime());
      form.append("symbol", this.symbol);
      form.append("image", this.image);
      form.append("address", this.address);

      this.onRequest = true;

      let result;

      if (this.isEditing) {
        const payload = {
          form: form,
          url: `/currency/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}`,
        };
        result = await this.$store.dispatch("admin/makePOST", payload);
        this.handleResponse(result);
      } else {
        const payload = {
          form: form,
          url: `/currency/?limit=${this.limit}&page=${this.currentPage}`,
        };
        result = await this.$store.dispatch("admin/makePOST", payload);
        this.handleResponse(result);
      }
    },

    handleResponse(result) {
      this.onRequest = false;

      console.log(result.response, result.data);

      if (result.response !== undefined) {
        this.showModal(
          result.response.data.message,
          false,
          result.response.data.error,
          !result.response.data.error
        );
      } else {
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

    currencies() {
      return this.$store.state.admin.currencies;
    },

    selectedCurrencies() {
      return this.$store.state.admin.selectedCurrencies;
    },

    totalLength() {
      return this.$store.state.admin.currencyLength;
    },

    isAllCurrenciesSelected() {
      return this.$store.state.admin.isAllCurrenciesSelected;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>
<style></style>
