<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Competitions<span class="admin-page-time">{{
          formatDate(new Date().getTime())
        }}</span>
      </h2>
      <div class="admin-users-tb-wrapper">
        <div class="admin-users-scroll">
          <div class="admin-users-tbs his">
            <div class="admin-home-table-head pad">
              <div class="admin-tl-sn2"><div>S/N</div></div>
              <div class="admin-tl-email1 banner">
                <div>Banner</div>
              </div>
              <div class="admin-tl-email1 banner"><div>Video</div></div>
              <div class="admin-tl-name1 banner">
                <div>Course</div>
              </div>
              <div class="admin-tl-time1 banner"><div>Title</div></div>
              <div class="admin-tl-time1 banner"><div>Price</div></div>
              <div class="admin-tl-time1 banner">
                <div>Restart</div>
              </div>
              <div class="admin-tl-time1"><div>Action</div></div>
            </div>
            <div
              v-for="(item, int) in competitions"
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
                      competitions,
                      'competition-settings'
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
                  :src="`${FILE_URL}/${item.image}`"
                  loading="lazy"
                  width="90"
                  sizes="90px"
                  alt=""
                  :srcset="`
                    ${FILE_URL}/${item.image}  500w,
                    ${FILE_URL}/${item.image}  800w,
                    ${FILE_URL}/${item.image} 1080w,
                    ${FILE_URL}/${item.image}        1200w
                  `"
                />
              </div>
              <div class="admin-tl-email1 banner">
                <div
                  v-if="item.videoUrl"
                  id="w-node-b0b9d203-10bd-54b5-5e49-2862a411c540-17190892"
                  style="padding-top: 56.17021276595745%"
                  class="w-embed-youtubevideo"
                >
                  <iframe
                    :src="`https://www.youtube.com/embed/${item.videoUrl}?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0`"
                    frameborder="0"
                    style="
                      position: absolute;
                      left: 0;
                      top: 0;
                      width: 100%;
                      height: 100%;
                      pointer-events: auto;
                    "
                    allow="autoplay; encrypted-media"
                    allowfullscreen=""
                    title="Imagine for 1 Minute"
                  ></iframe>
                </div>
              </div>
              <div class="admin-tl-name1 banner">
                <div>{{ item.course }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.title }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ item.price }}</div>
              </div>
              <div class="admin-tl-time1 banner">
                <div>{{ formatDate(item.restarting * 1) }}</div>
              </div>
              <div class="admin-tl-time1">
                <div v-if="item.status == 1" class="admin-cus-btn">
                  Approved
                </div>
                <div
                  v-else
                  class="admin-cus-btn waiting"
                  @click="approveBlog(item)"
                >
                  Waiting
                </div>
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
            <label for="name-5" class="admin-input-label">Title </label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="title"
              placeholder="Enter Post Title"
            />
          </div>

          <div>
            <label for="intro-4" class="admin-input-label"
              >Course<span class="admin-marked"></span></label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="course"
              placeholder="Enter Post Category"
            />
          </div>

          <div>
            <label for="intro-4" class="admin-input-label"
              >Price<span class="admin-marked"></span></label
            ><input
              type="number"
              class="admin-text-input w-input"
              v-model="price"
              placeholder="Enter Price"
            />
          </div>

          <div>
            <label for="subtitle-4" class="admin-input-label"
              >Starting Date {{ formatDateToTime(startingTime) }}
              {{ formatDate(startingTime) }}</label
            ><input
              type="datetime-local"
              class="admin-text-input w-input"
              v-model="startingTime"
            />
          </div>
          <div>
            <label for="subtitle-4" class="admin-input-label"
              >Restarting Time {{ formatDateToTime(restarting) }}
              {{ formatDate(restarting) }}</label
            ><input
              type="datetime-local"
              class="admin-text-input w-input"
              v-model="restarting"
            />
          </div>
          <div>
            <label for="subtitle-4" class="admin-input-label"
              >Stopping Time {{ formatDateToTime(stoppingTime) }}
              {{ formatDate(stoppingTime) }}</label
            ><input
              type="datetime-local"
              class="admin-text-input w-input"
              v-model="stoppingTime"
            />
          </div>
          <div>
            <label for="subtitle-4" class="admin-input-label">Video URL</label
            ><input
              type="text"
              class="admin-text-input w-input"
              v-model="videoUrl"
              placeholder="Enter Video URL"
            />
          </div>
        </div>
        <div>
          <label for="field-4" class="admin-input-label">Instruction</label>
          <client-only placeholder="loading...">
            <ckeditor-nuxt
              class="editor"
              v-model="instruction"
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
      onRequest: false,

      limit: 10,
      currentPage: 1,
      sort: "time",

      title: "",
      course: "",
      price: "",
      restarting: "",
      image: "",
      video: "",
      videoUrl: "",
      time: "",
      instruction: "",
      stoppingTime: "",
      startingTime: "",
      startingTimeShow: "",
      restartingShow: "",
      stoppingTimeShow: "",

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

    formatDateToTime(date) {
      if (!date || date == undefined || isNaN(date) || date == "") {
        return 0;
      }
      const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    formatDate(time) {
      if (!time || time == undefined || isNaN(time) || time == "") {
        return 0;
      }
      const today = new Date(time);
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
      this.$store.commit(`admin/toggleSelectAllItems`, "competition-settings");
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
      if (!item) {
        this.showModal(
          "Please select at least an item to edit",
          false,
          true,
          false,
          "",
          "",
          ""
        );
        return;
      }

      this.title = item.title;
      this.course = item.course;
      this.price = item.price;
      this.restarting = item.restarting;
      this.image = item.image;
      this.video = item.video;
      this.videoUrl = item.videoUrl;
      this.instruction = item.instruction;
      this.startingTime = item.startingTime;
      this.stoppingTime = item.stoppingTime;

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
        `Are you sure you want to delete this blog?`,
        true,
        false,
        false,
        `delete`,
        `/competition/?id=${id}`,
        ``
      );
    },

    clearInputs() {
      this.title = "";
      this.price = "";
      this.course = "";
      this.startingTime = "";
      this.stoppingTime = "";
      this.restarting = "";
      this.instruction = "";
      this.videoUrl = "";
      this.video = "";
      this.image = "";

      this.isEditing = false;
      this.editingId = "";
      this.$store.commit("admin/clearBlog");
    },

    async approveBlog(blog) {},

    async sortByDate() {
      this.sort = this.sort == "time" ? "-time" : "time";
      this.getCompetitions();
    },

    async getCompetitions() {
      await this.$store.dispatch(
        "admin/getCompetitions",
        `/competitions/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    async processData() {
      const form = new FormData();
      form.append("title", this.title);
      form.append("course", this.course);
      form.append("price", this.price);
      form.append("image", this.image);
      form.append("video", this.video);
      form.append("videoUrl", this.videoUrl);
      form.append("image", this.image);
      form.append("instruction", this.instruction);
      form.append(
        "restarting",
        this.restarting == "" ? undefined : new Date(this.restarting).getTime()
      );
      form.append(
        "startingTime",
        this.startingTime == ""
          ? undefined
          : new Date(this.startingTime).getTime()
      );
      form.append(
        "stoppingTime",
        this.stoppingTime == ""
          ? undefined
          : new Date(this.stoppingTime).getTime()
      );
      form.append(
        "time",
        this.time == "" ? new Date().getTime() : new Date(this.time).getTime()
      );

      const url = this.isEditing
        ? `/competitions/?id=${this.editingId}&limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
        : `/competitions/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`;

      const payload = {
        form: form,
        url: url,
      };

      this.onRequest = true;
      const result = await this.$store.dispatch("admin/makePOST", payload);
      this.resultResponse(result);
    },

    resultResponse(result) {
      console.log(result, result.response);
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
        this.getCompetitions();
        this.clearInputs();
      }
    },
  },

  computed: {
    totalLength() {
      return this.$store.state.admin.competitionLength;
    },

    selectedItems() {
      return this.$store.state.admin.selectedCompetitions;
    },

    isAllItemsSelected() {
      return this.$store.state.admin.isAllCompetitionsSelected;
    },

    competitions() {
      return this.$store.state.admin.competitions;
    },

    editorConfig() {
      return this.$store.state.editor.editorConfig;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
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
<style></style>
