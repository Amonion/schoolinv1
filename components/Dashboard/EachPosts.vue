<template>
  <div class="dash-each-comment each">
    <div class="dash-comment-pix">
      <img
        :src="`${FILE_URL}/${post.picture}`"
        loading="lazy"
        sizes="(max-width: 479px) 40px, 50.000003814697266px"
        :srcset="`
            ${FILE_URL}/${post.picture}  500w,
            ${FILE_URL}/${post.picture}  800w,
            ${FILE_URL}/${post.picture}       1000w`"
        alt=""
        class="responsive-img"
      />
    </div>
    <div style="width: 100%">
      <a href="#" class="dash-comment-uername">{{ post.username }} </a>
      <div style="margin-bottom: 10px">
        {{ post.post }}
      </div>
      <div
        v-if="post.media"
        class="video-container"
        :class="{ add: endsWithMp4(post.media) }"
      >
        <video
          ref="myVideo"
          v-if="endsWithMp4(post.media)"
          width="100%"
          height="400"
          controls
          style="border-radius: 10px"
        >
          <source :src="`${FILE_URL}/${post.media}`" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <img
          v-else
          :src="`${FILE_URL}/${post.media}`"
          loading="lazy"
          sizes="(max-width: 479px) 100vw, (max-width: 767px) 84vw, (max-width: 1279px) 61vw, 731.1111450195312px"
          :srcset="`
            ${FILE_URL}/${post.media}   500w,
            ${FILE_URL}/${post.media}   800w,
            ${FILE_URL}/${post.media} 1080w,
            ${FILE_URL}/${post.media}        1300w`"
          alt=""
          class="responsive-img"
        />
        <!-- <img
          @click="toggleVideo"
          src="/play.png"
          class="player"
          :class="{ hide: isPlaying }"
          alt=""
          style="
            width: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
          "
        /> -->
      </div>
      <post-detail
        :comment="post"
        @dataSent="getReplies"
        replyType="postReply"
      />

      <div v-if="onRequest" class="dash-loading-more">
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

      <dashboard-reply-box @sendReplies="getReplies" />
      <post-replies v-for="reply in replies" :key="reply.id" />
    </div>
  </div>
</template>

<script>
import DashboardReplyBox from "./DashboardReplyBox.vue";
import PostDetail from "./PostDetail.vue";
import PostReplies from "./PostReplies.vue";
export default {
  components: { PostDetail, DashboardReplyBox, PostReplies },
  data() {
    return {
      onRequest: false,
      replies: [],
      limit: 40,
      currentPage: 1,
      totalLength: 0,
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
      isPlaying: false,
    },
  },

  methods: {
    endsWithMp4(filename) {
      const mp4Regex = /\.mp4$/i;
      return mp4Regex.test(filename);
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

    toggleVideo() {
      const video = this.$refs.myVideo;

      if (video.paused) {
        video.play();
        this.isPlaying = true;
      } else {
        video.pause();
        this.isPlaying = false;
      }
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    posts() {
      return this.$store.state.dashboard.posts;
    },

    company() {
      return this.$store.state.dashboard.company;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
