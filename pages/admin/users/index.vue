<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Users<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs">
            <div class="admin-home-table-head">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-img1"><div>Image</div></div>
              <div class="admin-tl-name1"><div>Username</div></div>
              <div class="admin-tl-email1"><div>Email</div></div>
              <div class="admin-tl-time1"><div>Balance</div></div>
              <div class="admin-tl-time1"><div>Registered</div></div>
              <div class="admin-tl-time1"><div>Actions</div></div>
            </div>
            <div
              v-for="(item, int) in users"
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
                      selectedUsers,
                      users,
                      'user-settings'
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
                <div v-if="item.profilePicture" class="img-bg-60">
                  <img
                    :src="`${FILE_URL}/${item.profilePicture}`"
                    loading="lazy"
                    sizes="(max-width: 479px) 21vw, 60px"
                    :srcset="`
                     ${FILE_URL}/${item.profilePicture}   500w,
                     ${FILE_URL}/${item.profilePicture}   800w,
                     ${FILE_URL}/${item.profilePicture} 1080w,
                     ${FILE_URL}/${item.profilePicture} 1600w,
                     ${FILE_URL}/${item.profilePicture} 2000w,
                     ${FILE_URL}/${item.profilePicture} 2600w,
                     ${FILE_URL}/${item.profilePicture} 3200w,
                     ${FILE_URL}/${item.profilePicture}       3397w`"
                    alt=""
                    class="responsive-img"
                  />
                </div>
                <img
                  v-else
                  src="/images/admin/add-user-blue.svg"
                  loading="lazy"
                  alt=""
                  class="admin-action-icon big"
                />
              </div>
              <div class="admin-tl-name1">
                <NuxtLink
                  :to="`/admin/users/${item.id}/?username=${item.username}&id=${item.id}`"
                  class="admin-tb-username"
                  :class="{ suspended: item.suspended }"
                  >{{ item.username }}</NuxtLink
                >
              </div>
              <div class="admin-tl-email1">
                <div>{{ item.email }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>${{ item.totalBalance }}</div>
              </div>

              <div class="admin-tl-time1 flex flex-col">
                <div>{{ formatNumberToDate(item.dateCreated) }}</div>
                <div>{{ formatDateToTime(item.dateCreated) }}</div>
              </div>

              <div class="admin-tl-time1">
                <img
                  @click="prepareSuspend(item)"
                  src="/images/admin/error-red.svg"
                  loading="lazy"
                  alt=""
                  class="admin-action-icon"
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
          <div @click="toggleSelectAllItems" class="admin-toggler">
            <img
              v-if="isAllUsersSelected"
              src="/images/admin/check-blue.svg"
              loading="lazy"
              width="10"
              alt=""
            />
          </div>
          <div>Select All</div>
        </div>

        <div class="admin-action-items">
          <div class="admin-action-drop-head" @click="showEmails = !showEmails">
            <div>{{ selectedEmail }}</div>
            <img
              src="/images/admin/caret-down-blue.svg"
              loading="lazy"
              alt=""
              class="admin-action-drop"
            />
          </div>
          <ul
            role="list"
            class="admin-action-list input -mt-5"
            :class="{ hide: !showEmails }"
          >
            <li
              v-for="(item, int) in emails"
              :key="int"
              class="admin-action-listitems"
              @click="setItem(item)"
            >
              <div>{{ item.title }}</div>
            </li>
          </ul>
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
        <div class="admin-action-items">
          <div class="admin-action-drop-head" @click="sortByName">
            <div>Sort By Name</div>
            <img
              src="/images/admin/sort-blue.svg"
              loading="lazy"
              alt=""
              class="admin-action-drop"
            />
          </div>
        </div>
        <img
          @click="sendEmail"
          src="/images/admin/send-email-blue.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon send"
        /><img
          src="/images/admin/add-user-blue.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon big"
        /><img
          @click="prepareMassSuspend"
          src="/images/admin/error-red.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
        /><img
          @click="prepareMassDelete"
          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656bcbb9998532066acd920d_trash-bin-icon%201.svg"
          loading="lazy"
          alt=""
          class="admin-action-icon"
        />
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
      showEmails: false,
      selectedEmail: "Select Email",
      email: "",
      pages: [],
      // usersTypes:[
      //   {type:"Suspended"}
      // ]
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

    paginate(int) {
      this.currentPage = int;
      this.getUsers();
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
      email.value = "";
      selectedEmail.value = "Select Email";
      storeState.selectedUsers = [];
    },

    async sortByDate() {
      this.sort = this.sort == "dateCreated" ? "-dateCreated" : "dateCreated";
      this.getUsers();
    },

    async getUsers() {
      await this.$store.dispatch(
        "admin/getUsers",
        `/users/?sort=${this.sort}&limit=${this.limit}&page=${this.currentPage}`
      );
    },

    async sortByName() {
      this.sort = this.sort == "username" ? "-username" : "username";
      this.getUsers();
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
        msg: `Are you sure you want to delete this user?`,
        isWarning: true,
        isError: false,
        isSuccess: false,
        table: "users",
        action: "delete",
        url: `/users/?id=${id}&limit=${this.limit}&page=${this.currentPage}`,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload);
    },

    prepareSuspend(item) {
      const form = {
        suspended: !item.suspended,
      };

      this.showModal(
        `Are you sure you want to suspend ${item.username}?`,
        true,
        false,
        false,
        "update",
        `/users/update-user/?id=${item.id}&limit=${this.limit}&page=${this.currentPage}`,
        form
      );
    },

    prepareMassDelete() {
      if (this.selectedUsers.length == 0) {
        this.showModal(
          `Please select at least one user`,
          false,
          true,
          false,
          "",
          "",
          ""
        );
        return;
      }
      const url = `/users/mass-delete/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      this.showModal(
        `Are you sure you want to delete the selected users?`,
        true,
        false,
        false,
        "mass-delete",
        url,
        this.selectedUsers
      );
    },

    showModal(msg, warning, error, success, action, url, item) {
      const payload = {
        msg: msg,
        isWarning: warning,
        isError: error,
        isSuccess: success,
        action: action,
        url: url,
        item: item,
      };
      this.$store.commit(`admin/showModal`, payload);
    },

    prepareMassSuspend() {
      if (this.selectedItems.length == 0) {
        this.showModal(
          `Please select at least one transaction`,
          false,
          true,
          false,
          "",
          "",
          ""
        );
        return;
      }
      const url = `/transactions/mass-delete/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      this.showModal(
        `Are you sure you want to delete these transactions?`,
        true,
        false,
        false,
        "mass-delete",
        url,
        this.selectedItems
      );
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    users() {
      return this.$store.state.admin.users;
    },

    selectedUsers() {
      return this.$store.state.admin.selectedUsers;
    },

    emails() {
      return this.$store.state.admin.emails;
    },

    isAllUsersSelected() {
      return this.$store.state.admin.isAllUsersSelected;
    },

    totalLength() {
      return this.$store.state.admin.userLength;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>

<style>
.filt {
  bottom: 40px;
}
</style>
