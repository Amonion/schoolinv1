<template>
  <div>
    <div class="ero-section">
      <div class="ome-container">
        <div class="ero-flex">
          <h1 class="eadin1">{{ blog.title }}</h1>
          <div class="ome-text intro">
            {{ blog.subtitle }}
          </div>
        </div>
      </div>
    </div>
    <div class="service-section">
      <div class="ome-container">
        <div class="blog-flex">
          <div class="blog-main">
            <div v-if="blog" class="each-blog single">
              <span class="section-eadin news">{{ blog.title }}</span>
              <div class="blog-img">
                <img
                  :src="`${FILE_URL}/${blog.image}`"
                  loading="lazy"
                  sizes="(max-width: 767px) 92vw, (max-width: 991px) 61vw, (max-width: 1279px) 56vw, 560px"
                  :srcset="`
                    ${FILE_URL}/${blog.image} 500w,
                    ${FILE_URL}/${blog.image} 800w,
                    ${FILE_URL}/${blog.image} 900w
                  `"
                  alt=""
                  class="cover-im"
                />
              </div>
              <div class="blog-details">
                <div class="blog-detail-flex">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8f8f56cc70a343550a7f1_PersonFill.svg"
                    loading="lazy"
                    alt=""
                    class="blog-detail-icon"
                  />
                  <div>{{ blog.author }}</div>
                </div>
                <div class="blog-detail-flex">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8fa5008c4f3a17a694017_Clock.svg"
                    loading="lazy"
                    alt=""
                    class="blog-detail-icon"
                  />
                  <div>13 min</div>
                </div>
                <div class="blog-detail-flex">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8fa50d86c0f988c7c4564_Eye.svg"
                    loading="lazy"
                    alt=""
                    class="blog-detail-icon"
                  />
                  <div>{{ formatNumber(blog.views) }}</div>
                </div>
                <div class="blog-detail-flex">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/65a8fa509d67b1e7998b4528_ChatQuote.svg"
                    loading="lazy"
                    alt=""
                    class="blog-detail-icon"
                  />
                  <div>{{ formatNumber(blog.comments) }}</div>
                </div>
              </div>
            </div>
            <div v-html="blog.content"></div>
            <home-comments />
          </div>
          <aside-news />
        </div>
      </div>
    </div>
    <home-testimonial />
  </div>
</template>

<script>
import AsideNews from "../components/Home/AsideNews.vue";
import HomeComments from "../components/Home/HomeComments.vue";
import HomeTestimonial from "../components/Home/HomeTestimonial.vue";
export default {
  head() {
    return {
      title: `Schoolin | ${this.blog.title}`, // Set the page title
    };
  },
  components: { AsideNews, HomeTestimonial, HomeComments },
  layout: "home",

  methods: {
    formatDate(data) {
      if (data == null || data == undefined) {
        return "N/A";
      }
      const date = new Date(data).getTime(); // Note that month is zero-indexed in JavaScript
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        suffix: (day) => {
          if (day === 1 || day === 21 || day === 31) {
            return "st";
          } else if (day === 2 || day === 22) {
            return "nd";
          } else if (day === 3 || day === 23) {
            return "rd";
          } else {
            return "th";
          }
        },
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    },

    formatNumber(number) {
      return number.toLocaleString("en-US");
    },
  },

  async mounted() {
    const id = this.$route.query.id;
    const exists = this.blogs.some((obj) => obj.id == id);

    if (exists) {
      for (let i = 0; i < this.blogs.length; i++) {
        const el = this.blogs[i];
        if (el.id == id) {
          this.$store.commit("setABlog", el);
        }
      }
    } else {
      const result = await this.$store.dispatch("makeGET", `/blog/?id=${id}`);
      this.$store.commit("setABlog", result.data);
    }

    const payload = {
      form: this.blog,
      url: `/blog/views/?id=${id}`,
    };

    const result = await this.$store.dispatch("makePOST", payload);
  },

  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    blog() {
      return this.$store.state.blog;
    },

    blogs() {
      return this.$store.state.blogs;
    },
  },
};
</script>

<style></style>
