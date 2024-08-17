<template>
  <div class="dash-replies">
    <div class="dash-each-comment rep">
      <div class="dash-comment-pix">
        <img
          :src="`${FILE_URL}/${reply.picture}`"
          loading="lazy"
          sizes="(max-width: 479px) 40px, 50.000003814697266px"
          :srcset="`
          ${FILE_URL}/${reply.picture} 500w,
          ${FILE_URL}/${reply.picture}  800w,
          ${FILE_URL}/${reply.picture}       1000w`"
          alt=""
          class="responsive-img"
        />
      </div>
      <div>
        <a href="#" class="dash-comment-uername">{{ reply.username }}</a
        ><a href="#" class="dash-comment-uername reply"
          >@{{ comment.username }}</a
        >
        <div class="dash-reply">
          {{ reply.reply }}
        </div>
        <div v-if="reply.media" class="dash-comment-img">
          <img
            :src="`${FILE_URL}/${reply.media}`"
            loading="lazy"
            sizes="(max-width: 479px) 100vw, (max-width: 767px) 77vw, (max-width: 1279px) 54vw, 661.1111450195312px"
            :srcset="`
              ${FILE_URL}/${reply.media}   500w,
              ${FILE_URL}/${reply.media}   800w,
              ${FILE_URL}/${reply.media} 1080w,
              ${FILE_URL}/${reply.media}        1300w`"
            alt=""
            class="responsive-img"
          />
        </div>
        <post-detail
          :comment="reply"
          :isReply="true"
          :replyType="`reply-reply`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostDetail from "./PostDetail.vue";
export default {
  components: { PostDetail },
  data() {
    return {
      limit: 40,
      currentPage: 1,
      replies: [],
    };
  },
  props: {
    reply: {
      type: Object,
      required: true,
    },
    comment: {
      type: Object,
      required: true,
    },
  },

  async mounted() {
    // const result = await this.$store.dispatch(
    //   "dashboard/makeGET",
    //   `/replies/?limit=${this.limit}&page=${this.currentPage}&postId=${this.comment.id}`
    // );
    // this.replies = result.data.data;
  },

  computed: {
    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
