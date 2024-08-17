<template>
  <div v-if="blog">
    <div class="dashprime-main-display">
      <div class="dashboard-main-slider w-slider">
        <div class="dashboard-slider-mask w-slider-mask">
          <div class="dashboard-main-slides w-slide">
            <img
              :src="`${FILE_URL}/${blog.image}`"
              loading="lazy"
              sizes="(max-width: 479px) 88vw, (max-width: 767px) 91vw, (max-width: 1279px) 69vw, 811.1111450195312px"
              :srcset="`
              ${FILE_URL}/${blog.image} 500w,
              ${FILE_URL}/${blog.image}   612w`"
              alt=""
              class="responsive-img"
            />
            <div class="slide-cover">
              <div class="dashboard-slider-headline">
                {{ blog.title }}
              </div>
              <div class="dashboard-slide-details">
                <div class="dashboard-headline-categories">
                  <div>Education</div>
                  <div class="dashboard-slide-dot">.</div>
                  <div>Politics</div>
                </div>
                <news-details :comment="blog" />
              </div>
            </div>
          </div>
        </div>

        <div class="slide-nav w-slider-nav w-round"></div>
      </div>

      <div class="dashmain-more-news">
        <div class="dashboard-slider-headline main">
          {{ blog.title }}
        </div>
        <div class="dash-news-text" v-html="blog.content"></div>
      </div>
    </div>

    <!-- <dashboard-comment-icon v-if="blog" type="news" :id="blog.id" /> -->

    <dashboard-each-comment
      v-for="item in comments"
      :key="item.id"
      :comment="item"
      :postId="blog.id"
    />
  </div>
</template>

<script>
import DashboardCommentIcon from "../../components/Dashboard/DashboardCommentIcon.vue";
import DashboardEachComment from "../../components/Dashboard/DashboardEachComment.vue";
import NewsDetails from "../../components/Dashboard/NewsDetails.vue";
import PostDetail from "../../components/Dashboard/PostDetail.vue";
export default {
  components: {
    DashboardEachComment,
    DashboardCommentIcon,
    PostDetail,
    NewsDetails,
  },
  layout: "dashboard",

  data() {
    return {
      blog: "",
      limit: 20,
      currentPage: 1,
    };
  },

  methods: {
    toggleInput() {
      this.$store.commit("dashboard/toggleInput");
    },

    setInput() {
      const payload = {
        type: "news",
        id: this.blog.id,
      };
      this.$store.commit("dashboard/setInput", payload);
    },

    async getComments(id) {
      const results = await this.$store.dispatch(
        "dashboard/makeGET",
        `/comments/?limit=${this.limit}&page=${this.currentPage}&postId=${id}`
      );
      this.$store.commit("dashboard/setComments", results.data.data);
    },
  },

  async mounted() {
    const display = this.$route.query.display;
    const id = this.$route.query.id;

    const blog =
      display == "grid"
        ? this.blogs.find((obj) => obj.id == id)
        : this.news.find((obj) => obj.id == id);

    if (blog) {
      this.blog = blog;
      this.getComments(id);
    } else {
      const result = await this.$store.dispatch(
        "dashboard/makeGET",
        `/blog/?id=${id}`
      );
      this.blog = result.data;
      this.getComments(id);
    }

    const payload = {
      type: "comment",
      id: this.blog.id,
    };
    this.$store.commit("dashboard/setInput", payload);
    const url = `/comments/read`;
    const form = {
      userId: this.user.id,
      postId: this.blog.id,
    };
    const result = await this.$store.dispatch("dashboard/makePOST", {
      url,
      form,
    });
  },

  computed: {
    blogs() {
      return this.$store.state.dashboard.gridBlogs;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    comments() {
      return this.$store.state.dashboard.comments;
    },

    news() {
      return this.$store.state.dashboard.blogs;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style>
@media screen and (max-width: 479px) {
  .dash-personal {
    display: flex;
  }
}
</style>
