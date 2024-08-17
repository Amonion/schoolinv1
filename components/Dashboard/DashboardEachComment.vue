<template>
  <div class="dash-each-comment each">
    <div class="dash-comment-pix">
      <img
        :src="`${FILE_URL}/${comment.picture}`"
        loading="lazy"
        sizes="(max-width: 479px) 40px, 50.000003814697266px"
        :srcset="`
          ${FILE_URL}/${comment.picture} 500w,
          ${FILE_URL}/${comment.picture}  800w,
          ${FILE_URL}/${comment.picture}       1000w`"
        alt=""
        class="responsive-img"
      />
    </div>
    <div style="width: 100%">
      <a href="#" class="dash-comment-uername">{{ comment.username }}</a>
      <div>
        {{ comment.comment }}
      </div>

      <div
        v-if="comment.media"
        class="video-container"
        :class="{ add: endsWithMp4(comment.media) }"
      >
        <video
          ref="myVideo"
          v-if="endsWithMp4(comment.media)"
          width="100%"
          height="400"
          controls
          style="border-radius: 10px"
        >
          <source :src="`${FILE_URL}/${comment.media}`" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <img
          v-else
          :src="`${FILE_URL}/${comment.media}`"
          loading="lazy"
          sizes="(max-width: 479px) 100vw, (max-width: 767px) 84vw, (max-width: 1279px) 61vw, 731.1111450195312px"
          :srcset="`
            ${FILE_URL}/${comment.media}   500w,
            ${FILE_URL}/${comment.media}   800w,
            ${FILE_URL}/${comment.media} 1080w,
            ${FILE_URL}/${comment.media}        1300w`"
          alt=""
          class="responsive-img"
        />
      </div>
      <post-detail
        :comment="comment"
        @dataSent="getReplies"
        :replyType="`comment-reply`"
      />
      <div
        v-if="onRequest"
        class="dash-loading-more"
        style="width: 100%; display: flex; justify-content: center"
      >
        <div class="dash-upload-holder">
          <img
            src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65add0c55b7dd891612721db_loader-line.svg"
            loading="lazy"
            alt=""
            class="dash-uploadicon spinner"
          />
          <div>Loading Replies</div>
        </div>
      </div>

      <dashboard-reply-box @sendReplies="setReplies" :commentObj="comment" />

      <each-replies
        v-for="item in replies"
        :key="item.id"
        :reply="item"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import DashboardReplyBox from "./DashboardReplyBox.vue";
import EachReplies from "./EachReplies.vue";
import PostDetail from "./PostDetail.vue";
export default {
  components: { PostDetail, EachReplies, DashboardReplyBox },
  data() {
    return {
      limit: 40,
      currentPage: 1,
      replies: [],
      onRequest: false,
      totalLength: 0,
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    postId: {
      type: Number,
    },
  },

  methods: {
    setReplies(items) {
      this.replies = items;

      console.log(this.replies);
    },

    async getReplies(id) {
      this.onRequest = true;
      const result = await this.$store.dispatch(
        "dashboard/makeGET",
        `/replies/?limit=${this.limit}&page=${this.currentPage}&commentId=${id}`
      );

      if (result) {
        this.onRequest = false;
        this.replies = result.data.data;
        this.totalLength = result.data.totalLength;
      }
    },
  },

  async mounted() {},

  computed: {
    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },

    commentId() {
      return this.$store.state.dashboard.commentId;
    },
  },
};
</script>

<style></style>
