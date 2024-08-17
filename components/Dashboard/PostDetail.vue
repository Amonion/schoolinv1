<template>
  <div>
    <div class="dash-comment-details">
      <div class="dash-eachcomment-details">
        <img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adb6dce2dfb400ce4f203b_Clock.svg"
          loading="lazy"
          alt=""
          class="dash-commnt-icon"
        />
        <div>{{ timeAgo(comment.time * 1) }}</div>
      </div>
      <!-- <div class="dash-eachcomment-details">
        <img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adbdccb170ad46081b1b6c_SuitHeartFill%20(1).svg"
          loading="lazy"
          alt=""
          class="dash-commnt-icon"
        />
        <div>13 min</div>
      </div> -->
      <div v-if="!isReply" @click="sendData" class="dash-eachcomment-details">
        <img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adbdcc6f2c57641a770529_ChatQuote%20(1).svg"
          loading="lazy"
          alt=""
          class="dash-commnt-icon"
        />
        <div>{{ comment.replies * 1 }}</div>
      </div>
      <div
        v-if="!showReply"
        @click="toggleInput(comment.id)"
        class="dash-eachcomment-details"
      >
        <img
          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adcb4ab68c86b45eb435f9_Reply%20(1).svg"
          loading="lazy"
          alt=""
          class="dash-commnt-icon"
        />
        <div>Reply</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    replyType: {
      type: String,
    },
    isReply: {
      type: Boolean,
    },
    showReply: {
      type: Boolean,
    },
  },
  methods: {
    sendData() {
      this.$emit("dataSent", this.comment.id);
    },

    // formatNumber(num) {
    //   if (num >= 1_000_000) {
    //     return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    //   } else if (num >= 1_000) {
    //     return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    //   } else {
    //     return 0;
    //   }
    // },

    timeAgo(date) {
      const now = new Date().getTime();
      const secondsPast = Math.floor((now - date) / 1000);

      if (secondsPast < 60) {
        return "just now";
      }

      const minutesPast = Math.floor(secondsPast / 60);
      if (minutesPast < 60) {
        return `${minutesPast} min${minutesPast > 1 ? "s" : ""}`;
      }

      const hoursPast = Math.floor(minutesPast / 60);
      if (hoursPast < 24) {
        return `${hoursPast} hr${hoursPast > 1 ? "s" : ""}`;
      }

      const daysPast = Math.floor(hoursPast / 24);
      if (daysPast < 7) {
        return `${daysPast} day${daysPast > 1 ? "s" : ""}`;
      }

      const weeksPast = Math.floor(daysPast / 7);
      if (weeksPast < 4) {
        return `${weeksPast} week${weeksPast > 1 ? "s" : ""}`;
      }

      const monthsPast = Math.floor(daysPast / 30);
      if (monthsPast < 12) {
        return `${monthsPast} month${monthsPast > 1 ? "s" : ""}`;
      }

      const yearsPast = Math.floor(daysPast / 365);
      return `${yearsPast} year${yearsPast > 1 ? "s" : ""}`;
    },

    toggleInput() {
      this.$store.commit("dashboard/toggleReply", this.replyType);
      this.$store.commit("dashboard/setCommentId", this.comment.id);
    },
  },
};
</script>

<style></style>
