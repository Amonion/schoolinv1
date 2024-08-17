<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        About<span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="w-layout-grid about-vids-grid">
        <div
          v-if="firstVideo"
          id="w-node-b0b9d203-10bd-54b5-5e49-2862a411c540-17190892"
          style="padding-top: 56.17021276595745%"
          class="w-embed-youtubevideo"
        >
          <iframe
            src="https://www.youtube.com/embed/XALBGkjkUPQ?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0"
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
        <img
          v-else
          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656dba69170b69e9aab1b2e3_novideo.png"
          loading="lazy"
          id="w-node-ff983407-bc50-fac2-79aa-4ece1cf8fbb1-17190892"
          height="150"
          alt=""
        />
        <div
          v-if="secondVideo"
          id="w-node-b0b9d203-10bd-54b5-5e49-2862a411c540-17190892"
          style="padding-top: 56.17021276595745%"
          class="w-embed-youtubevideo"
        >
          <iframe
            src="https://www.youtube.com/embed/XALBGkjkUPQ?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0"
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
        <img
          v-else
          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656dba69170b69e9aab1b2e3_novideo.png"
          loading="lazy"
          id="w-node-ff983407-bc50-fac2-79aa-4ece1cf8fbb1-17190892"
          height="150"
          alt=""
        />
        <div
          v-if="thirdVideo"
          id="w-node-b0b9d203-10bd-54b5-5e49-2862a411c540-17190892"
          style="padding-top: 56.17021276595745%"
          class="w-embed-youtubevideo"
        >
          <iframe
            src="https://www.youtube.com/embed/XALBGkjkUPQ?rel=0&amp;controls=1&amp;autoplay=0&amp;mute=0&amp;start=0"
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
        <img
          v-else
          src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656dba69170b69e9aab1b2e3_novideo.png"
          loading="lazy"
          id="w-node-ff983407-bc50-fac2-79aa-4ece1cf8fbb1-17190892"
          height="150"
          alt=""
        />
      </div>
    </div>
    <div class="admin-plan-form w-form">
      <div class="admin-plan-form-flex">
        <div class="admin-input-wrapper">
          <label for="name-5" class="admin-input-label">About Website</label>

          <client-only placeholder="loading...">
            <ckeditor-nuxt
              class="editor"
              v-model="content"
              :config="editorConfig"
            />
          </client-only>
        </div>
        <div class="admin-validation-msg">
          Please Enter all Marked * Fields Correctly
        </div>
        <div class="admin-btn-holder">
          <label for="vid1" class="admin-cus-btn">
            <img
              src="/images/admin/upload-white.svg"
              loading="lazy"
              alt=""
              class="admin-btn-icon"
            />
            <div>Video 1</div>
            <input
              @change="setVid1"
              type="file"
              id="vid1"
              class="admin-text-input hidden w-input"
            />
          </label>
          <label for="vid2" class="admin-cus-btn">
            <img
              src="/images/admin/upload-white.svg"
              loading="lazy"
              alt=""
              class="admin-btn-icon"
            />
            <div>Video 2</div>
            <input
              @change="setVid2"
              id="vid2"
              type="file"
              class="admin-text-input hidden w-input"
            />
          </label>
          <label for="vid3" class="admin-cus-btn">
            <img
              src="/images/admin/upload-white.svg"
              loading="lazy"
              alt=""
              class="admin-btn-icon"
            />
            <div>Video 3</div>
            <input
              @change="setVid3"
              type="file"
              id="vid3"
              class="admin-text-input hidden w-input"
            />
          </label>
          <label for="doc" class="admin-cus-btn">
            <img
              src="/images/admin/upload-white.svg"
              loading="lazy"
              alt=""
              class="admin-btn-icon"
            />
            <div>Document</div>
            <input
              id="doc"
              @change="setDoc"
              type="file"
              class="admin-text-input hidden w-input"
            />
          </label>
          <label for="cert" class="admin-cus-btn">
            <img
              src="/images/admin/upload-white.svg"
              loading="lazy"
              alt=""
              class="admin-btn-icon"
            />
            <div>Certificate</div>
            <input
              id="cert"
              @change="setCert"
              type="file"
              class="admin-text-input hidden w-input"
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
          <div @click="processData" class="admin-cus-btn">
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
      time: "",
      certificate: "",
      document: "",

      isEditing: false,
      editingId: null,
    };
  },

  methods: {
    setCert(e) {
      this.certificate = e.target.files[0];
    },
    setDoc(e) {
      this.document = e.target.files[0];
    },

    setVid3(e) {
      this.thirdVideo = e.target.files[0];
    },

    setVid2(e) {
      this.secondVideo = e.target.files[0];
    },
    setVid1(e) {
      this.firstVideo = e.target.files[0];
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

    setItem(item) {
      this.bannerCategory = item;
      this.showCategories = false;
    },

    prepareEdit(item) {
      this.bannerTitle = item.bannerTitle;
      this.bannerCategory = item.bannerCategory;
      this.bannerSubtitle = item.bannerSubtitle;
      this.bannerIntro = item.bannerIntro;
      this.isEditing = true;
      this.editingId = item.id;
      this.time = item.time;
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
        `Are you sure you want to delete this banner?`,
        true,
        false,
        false,
        `delete`,
        `/banners/?id=${id}`,
        ``
      );
    },

    clearInputs() {
      this.bannerCategory = "Select Category";
      this.bannerTitle = "";
      this.bannerSubtitle = "";
      (this.bannerImage = ""), (this.bannerIntro = "");
      this.isEditing = false;
      this.editingId = "";
    },

    async sortByDate() {
      this.sort = this.sort == "time" ? "-time" : "time";
      this.getReviews();
    },

    async getAbout() {
      await this.$store.dispatch(
        "admin/getAbout",
        `/about/?limit=${this.limit}&page=${this.currentPage}&sort=${this.sort}`
      );
    },

    async processData() {
      const form = new FormData();
      form.append("firstVideo", this.firstVideo);
      form.append("time", new Date(this.time).getTime());
      form.append("secondVideo", this.secondVideo);
      form.append("thirdVideo", this.thirdVideo);
      form.append("certificate", this.certificate);
      form.append("document", this.document);
      form.append("content", this.content);
      const url = this.isEditing ? `/about/?id=${this.editingId}` : `/about`;

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
        this.getAbout();
        this.clearInputs();
      }
    },
  },

  computed: {
    about() {
      return this.$store.state.admin.about;
    },

    content() {
      return this.about.content;
    },

    firstVideo() {
      return this.about.firstVideo;
    },

    secondVideo() {
      return this.about.secondVideo;
    },

    thirdVideo() {
      return this.about.thirdVideo;
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
