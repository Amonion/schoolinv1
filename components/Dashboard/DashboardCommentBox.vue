<template>
  <div class="personal-posts active" v-if="inputState">
    <div class="dashboard-person-postimg">
      <img
        :src="`${FILE_URL}/${user.picture}`"
        loading="lazy"
        sizes="60.000003814697266px"
        :srcset="`
            ${FILE_URL}/${user.picture}  500w,
            ${FILE_URL}/${user.picture}  800w,
            ${FILE_URL}/${user.picture}      1000w`"
        alt=""
        class="responsive-img"
      />
    </div>
    <div class="dashboard-personal-postright">
      <textarea
        placeholder="Make your comment"
        v-model="comment"
        class="dashboard-header-seachinput text content w-input show"
      ></textarea>
      <div class="dashboard-personal-postuploads">
        <div v-if="onRequest" class="dash-upload-holder">
          <img
            src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adcbcdd6e8611d02fd2423_loader-line-icon%201.svg"
            loading="lazy"
            alt=""
            class="dash-uploadicon spin spinner"
          />
          <div>Processing</div>
        </div>
        <label v-else @change="setMedia" for="media" class="dash-upload-holder">
          <input class="input-hidden w-input" type="file" id="media" /><img
            src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb666237f9e7f85eb877e_Video%20library.svg"
            loading="lazy"
            alt=""
            class="dash-uploadicon"
          />
          <div>Upload Image</div>
        </label>

        <div
          v-if="!onRequest"
          class="dash-upload-holder post"
          @click="processData"
        >
          <div>Make Post</div>
        </div>
        <div @click="hideInput" class="dash-upload-holder post">
          <div>Close</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: "",
      media: "",
      url: "",

      limit: 40,
      currentPage: 1,
      onRequest: false,
    };
  },
  methods: {
    hideInput() {
      this.$store.commit("dashboard/hideInput");
    },

    setMedia(e) {
      this.media = e.target.files[0];
    },

    clearInputs() {
      this.media = "";
      this.comment = "";
      this.hideInput();
    },

    async processData() {
      const form = new FormData();

      form.append("media", this.media);
      form.append("username", this.user.username);
      form.append("picture", this.user.picture);
      form.append("time", new Date().getTime());

      if (this.inputType == "comment") {
        this.url = `/comments/?limit=${this.limit}&page=${this.currentPage}&postId=${this.postId}`;
        form.append("comment", this.comment);
        form.append("postId", this.postId);
      } else if (this.inputType == "posts") {
        this.url = `/posts/?limit=${this.limit}&page=${this.currentPage}&sort=-time`;
        form.append("post", this.comment);
      }

      const payload = {
        form: form,
        url: this.url,
      };

      const result = await this.$store.dispatch("dashboard/makePOST", payload);
      this.handleResponse(result);
    },

    handleResponse(result) {
      this.clearInputs();
      this.onRequest = false;
      if (this.inputType == "comment") {
        this.$store.commit("dashboard/setComments", result.data?.data);
      } else if (this.inputType == "posts") {
        this.$store.commit("dashboard/setPosts", result.data?.data);
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    inputState() {
      return this.$store.state.dashboard.inputState;
    },

    postId() {
      return this.$store.state.dashboard.postId;
    },

    postType() {
      return this.$store.state.dashboard.postType;
    },

    commentId() {
      return this.$store.state.dashboard.commentId;
    },

    inputType() {
      return this.$store.state.dashboard.inputType;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
