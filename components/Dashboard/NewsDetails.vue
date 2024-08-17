<template>
  <div class="dashboard-headline-stats">
    <div class="dashboard-each-headlinestat">
      <img
        src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65adb703dfcdbb93830aa9c8_Clock%20(1).svg"
        loading="lazy"
        alt=""
        class="dashboard-post-staticon"
        style="margin-right: 5px"
      />
      <div>{{ timeAgo(comment.time * 1) }}</div>
    </div>
    <div class="dashboard-each-headlinestat">
      <img
        src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb02ecef6a2cfc7c2d43b_Eye.svg"
        loading="lazy"
        alt=""
        class="dashboard-post-staticon"
        style="margin-right: 5px"
      />
      <div>{{ comment.views }}</div>
    </div>
    <div class="dashboard-each-headlinestat">
      <img
        src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb02e23c622ffe68f636d_ChatQuote.svg"
        loading="lazy"
        alt=""
        class="dashboard-post-staticon"
        style="margin-right: 5px"
      />
      <div>{{ comment.replies }}</div>
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
