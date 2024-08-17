<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Reviews<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs">
            <div class="admin-home-table-head">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-name1 rev"><div>Image</div></div>
              <div class="admin-tl-email1"><div>Name</div></div>
              <div class="admin-tl-time1"><div>Country</div></div>
              <div class="admin-tl-time1"><div>Rating</div></div>
              <div class="admin-tl-time1"><div>Date</div></div>
              <div class="admin-tl-time1 rev">
                <div>Description</div>
              </div>
              <div class="admin-tl-time1 plan"><div>Actions</div></div>
            </div>

            <div
              v-for="(item, int) in reviews"
              :key="int"
              class="admin-home-table-body"
              :class="{ even: int % 2 == 0 }"
            >
              <div class="admin-tl-sn2">
                <div>{{ int + 1 }}</div>
                <div
                  class="admin-toggler ml-1"
                  @click="
                    handleCheckedItems(
                      item,
                      selectedItems,
                      reviews,
                      'review-settings'
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
                <div class="img-bg-60">
                  <img
                    :src="`${FILE_URL}/uploads/${item.profilePicture}`"
                    loading="lazy"
                    sizes="(max-width: 479px) 21vw, 60px"
                    :srcset="`
                     ${FILE_URL}/uploads/${item.profilePicture}   500w,
                     ${FILE_URL}/uploads/${item.profilePicture}   800w,
                     ${FILE_URL}/uploads/${item.profilePicture} 1080w,
                     ${FILE_URL}/uploads/${item.profilePicture} 1600w,
                     ${FILE_URL}/uploads/${item.profilePicture} 2000w,
                     ${FILE_URL}/uploads/${item.profilePicture} 2600w,
                     ${FILE_URL}/uploads/${item.profilePicture} 3200w,
                     ${FILE_URL}/uploads/${item.profilePicture}       3397w`"
                    alt=""
                    class="responsive-img"
                  />
                </div>
              </div>
              <div class="admin-tl-email1">
                <div>{{ item.username }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.country }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ item.rating }}</div>
              </div>
              <div class="admin-tl-time1">
                <div>{{ formatNumberToDate(item.time) }}</div>
              </div>
              <div class="admin-tl-time1 rev">
                <div>{{ truncateText(item.content, 70) }}</div>
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
      <div class="admin-plan-form-flex">
        <div class="w-layout-grid grid-form">
          <div class="admin-input-wrapper">
            <label for="name" class="admin-input-label"
              >Username <span class="admin-marked">*</span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              maxlength="256"
              name="name"
              data-name="Name"
              placeholder="Enter Username"
              v-model="username"
            />
          </div>
          <div class="admin-input-wrapper">
            <label for="name-6" class="admin-input-label">Country </label>
            <div class="admin-text-input" @click="showCountry = !showCountry">
              <div>{{ country }}</div>
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
              :class="{ hide: !showCountry }"
            >
              <li
                v-for="(item, int) in countries"
                :key="int"
                class="admin-action-listitems"
                @click="setItem(item)"
              >
                <div>{{ item.country }}</div>
              </li>
            </ul>
          </div>
          <div>
            <label for="duration" class="admin-input-label"
              >Rating <span class="admin-marked">*</span></label
            ><input
              type="number"
              class="admin-text-input w-input"
              maxlength="256"
              name="duration"
              placeholder="Enter Review Rating"
              v-model="rating"
            />
          </div>
          <div>
            <label for="percent" class="admin-input-label">Date</label
            ><input
              type="date"
              class="admin-text-input w-input"
              maxlength="256"
              placeholder="Enter Review Date"
              v-model="time"
            />
          </div>
          <div>
            <label for="description" class="admin-input-label"
              >User Reveiw</label
            ><textarea
              placeholder="Enter User Review"
              maxlength="5000"
              v-model="content"
              class="admin-text-input w-node-f67b12f4-a247-0b04-ef6c-7657ec295d04-17190892 w-input"
            ></textarea>
          </div>
        </div>
        <div class="admin-validation-msg">
          <!-- Please Enter all Marked * Fields Correctly -->
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",

  data() {
    return {
      showCountry: false,
      onRequest: false,

      limit: 10,
      currentPage: 1,
      sort: "time",

      profilePicture: null,
      username: "",
      rating: 3.5,
      content: "",
      country: "Select Country",
      time: "",

      isEditing: false,
      editingId: null,
    };
  },

  methods: {
    setImage(e) {
      this.profilePicture = e.target.files[0];
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

    setItem(item) {
      this.country = item.country;
      this.showCountry = false;
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
      this.username = item.username;
      this.rating = item.rating;
      this.content = item.content;
      this.country = item.country;
      this.time = this.formatNumberToDate(item.time);
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
        `Are you sure you want to delete this review?`,
        true,
        false,
        false,
        `delete`,
        `/reviews/?id=${id}`,
        ``
      );
    },

    clearInputs() {
      this.username = "";
      this.rating = 3.5;
      this.content = "";
      (this.profilePicture = ""), (this.country = "Select Country");
      this.time = this.formatNumberToDate(new Date().getTime());
      this.isEditing = false;
      this.editingId = "";
    },

    async sortByDate() {
      this.sort = this.sort == "time" ? "-time" : "time";
      this.getReviews();
    },

    async getReviews() {
      await this.$store.dispatch(
        "admin/getReviews",
        `/reviews/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    async processData() {
      const form = new FormData();
      form.append("username", this.username);
      form.append("time", new Date(this.time).getTime());
      form.append("content", this.content);
      form.append("rating", this.rating);
      form.append("profilePicture", this.profilePicture);
      form.append("country", this.country);
      const url = this.isEditing
        ? `/reviews/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
        : `/reviews/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;

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
        this.getReviews();
        this.clearInputs();
      }
    },
  },

  computed: {
    totalLength() {
      return this.$store.state.admin.reviewLength;
    },

    selectedItems() {
      return this.$store.state.admin.selectedReviews;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.isAllReviewSelected;
    },

    reviews() {
      return this.$store.state.admin.reviews;
    },

    countries() {
      return this.$store.state.registrationDetails.countries;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>
<style></style>
