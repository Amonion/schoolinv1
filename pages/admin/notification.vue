<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Notifications<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs his">
            <div class="admin-home-table-head pad">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-time1 banner"><div>Title</div></div>
              <div class="admin-tl-time1 banner">
                <div>Content</div>
              </div>
              <div class="admin-tl-time1"><div>Time</div></div>
              <div class="admin-tl-time1">
                <div>Action</div>
              </div>
            </div>

            <div
              v-for="(item, int) in notifications"
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
                      notifications,
                      'notification-settings'
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
              <div class="admin-tl-time1 banner">
                <div>{{ item.title }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.content }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>
                  {{ formatDateToTime(item.time) }}<br />{{
                    formatDate(item.time)
                  }}
                </div>
              </div>
              <div class="admin-tl-time1">
                <img
                  @click="prepareDeleteId(item.id)"
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
    };
  },

  methods: {
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

    formatDateToTime(date) {
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(1);
      }
      return pages;
    },

    prepareDeleteId(id) {
      const payload = {
        msg: `Are you sure you want to delete this notification?`,
        isWarning: true,
        isError: false,
        isSuccess: false,
        table: "manager",
        action: "delete",
        url: `/notifications/?id=${id}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`,
        item: "",
      };
      this.$store.commit(`admin/showModal`, payload);
    },

    paginate(int) {
      this.currentPage = int;
      this.getNotifications();
    },

    toggleSelectAllItems() {
      this.$store.commit(`admin/toggleSelectAllItems`, "notification-settings");
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

    async sortByDate() {
      this.sort = this.sort == "time" ? "-time" : "time";
      this.getNotifications();
    },

    handleCheckedItems(item, selectedItems, items, type) {
      this.$store.commit("admin/handleCheckedItems", {
        item,
        selectedItems,
        items,
        type,
      });
    },

    prepareDelete() {
      if (this.selectedItems.length == 0) {
        this.showModal(
          `Please select at least one notification`,
          false,
          true,
          false,
          "",
          "",
          ""
        );
        return;
      }

      const url = `/notifications/mass-delete/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;
      this.showModal(
        `Are you sure you want to delete these notifications?`,
        true,
        false,
        false,
        "mass-delete",
        url,
        this.selectedItems
      );
    },

    async updateNotifications() {
      const result = await this.$store.dispatch(
        "admin/getNotificationState",
        `/notifications/update/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    async getNotifications() {
      await this.$store.dispatch(
        "admin/getNotifications",
        `/notifications/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },
  },

  mounted() {
    this.updateNotifications();
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    notifications() {
      return this.$store.state.admin.notifications;
    },

    selectedItems() {
      return this.$store.state.admin.selectedNotifications;
    },

    totalLength() {
      return this.$store.state.admin.notificationLength;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.isAllNotificationSelected;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>

<style></style>
