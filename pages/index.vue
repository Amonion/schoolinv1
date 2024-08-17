<template>
  <div>
    <home-hero-slider />

    <div class="service-section">
      <div class="ome-container">
        <div class="section-eader">
          <div class="section-eadin-left">
            <div class="intro-section">Our Payment Services</div>
            <div class="section-eadin">
              Let's Accelerate Your Academic Payment Processes
            </div>
          </div>
          <div class="section-eadin-rit">
            Transforming academic payment processes into streamlined experiences
            for students, from acceptance, fees to clearances, we expedite every
            aspect of your academic transactions.
          </div>
        </div>
        <div class="w-layout-grid services-rid">
          <div
            v-for="item in payments"
            :key="item.id"
            class="service-card active"
          >
            <div class="services-box">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ab32a00518a27e2a3a523_book%201.svg"
                loading="lazy"
                alt=""
                class="service-box-icon"
              />
            </div>
            <div class="section-eadin _2 pad">{{ item.blogType }}</div>
            <div>
              {{ item.subtitle }}
            </div>
            <nuxt-link
              :to="`/blog-details/?id=${item.id}`"
              class="read-more active w-inline-block"
              ><div>Read More</div>
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ab3e2463e79c196a608a0_arrow-wite.svg"
                loading="lazy"
                alt=""
                class="read-more-icon"
            /></nuxt-link>
          </div>
        </div>
        <div class="section-eader">
          <div class="section-eadin-left">
            <div class="intro-section">Our 101 Solutions</div>
            <div class="section-eadin">
              We offer free online tutorials and solutions to your 101 Classes
            </div>
          </div>
          <div class="section-eadin-rit">
            Unlock free online tutorials and solutions for your 101 classes with
            us and access comprehensive online resources and tutorials to ace
            your 101 classes. Elevate your learning with our free online
            tutorials tailored for 101 classes.
          </div>
        </div>
        <div class="academic-flex">
          <div class="academic-slider">
            <img
              src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained.webp"
              loading="lazy"
              sizes="(max-width: 479px) 96vw, (max-width: 767px) 95vw, (max-width: 991px) 30vw, (max-width: 1279px) 25vw, 248.0382080078125px"
              srcset="
                https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-500.webp   500w,
                https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-800.webp   800w,
                https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-1080.webp 1080w,
                https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained.webp        1344w
              "
              alt=""
              class="cover-im"
            />
          </div>
          <div class="w-layout-grid academic-rid">
            <div v-for="item in tutorials" :key="item.id" class="service-card">
              <div class="services-box">
                <img
                  src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ab32a00518a27e2a3a523_book%201.svg"
                  loading="lazy"
                  alt=""
                  class="service-box-icon"
                />
              </div>
              <div class="section-eadin _2 pad">{{ item.blogType }}</div>
              <div>
                {{ item.subtitle }}
              </div>
              <nuxt-link
                :to="`/blog-details/?id=${item.id}`"
                class="read-more w-inline-block active"
                ><div>Read More</div>
                <img
                  src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ab1ea8f30c0f07e3af64d_arrow-left-circle%205.svg"
                  loading="lazy"
                  alt=""
                  class="read-more-icon"
              /></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <home-enquiries />

    <div class="competition">
      <div class="ome-container">
        <div class="section-eader">
          <div class="section-eadin-left">
            <div class="intro-section">Year One Challenge</div>
            <div class="section-eadin">
              Step up the stage, show that you are the best and win a prize.
            </div>
          </div>
          <div class="section-eadin-rit">
            Step onto the stage, reveal your prowess, and emerge victorious to
            claim your well-deserved prize, showcasing your unparalleled talent
            and determination for all to see.
          </div>
        </div>
        <div class="ome-events">
          <home-competitions
            v-for="item in competitions"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
    </div>

    <div class="winners">
      <div class="ome-container">
        <div v-if="competitors.length > 0" class="section-eader">
          <div class="section-eadin-left">
            <div class="intro-section">Top 8 Winners Competiting</div>
            <div class="section-eadin">
              You can still join the ongoing competition now
            </div>
          </div>
          <div class="section-eadin-rit">
            It's not all about the prize, but about the training of your mind to
            challenge your friends and see how far above or below you are to
            your expectations. At the end, you will be rewarded... Good Luck.
          </div>
        </div>
        <div v-if="competitors.length > 0" class="w-layout-grid wiiners-rid">
          <a
            id="w-node-_0adaebf9-54fd-7065-a82f-3e905768fe70-e22bd156"
            href="#"
            class="winner-card w-inline-block"
            ><div class="winner-im">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ae1e3205fdc37455b4666_636642780883209575.jpg"
                loading="lazy"
                alt=""
                class="cover-im"
              />
            </div>
            <div class="winner-details">
              <div class="wiiner-name">Jaimes Nepews</div>
              <div class="wiiner-scool">IMSU</div>
              <div class="winner-dept-num">
                <div class="winner-dept">Elect/Elect</div>
                <div class="winner-num">1</div>
              </div>
            </div></a
          ><a
            id="w-node-e50f84ef-7d68-bd57-562e-c3b659ee082a-e22bd156"
            href="#"
            class="winner-card w-inline-block"
            ><div class="winner-im">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained.webp"
                loading="lazy"
                sizes="50.000003814697266px"
                srcset="
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-500.webp   500w,
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-800.webp   800w,
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained-p-1080.webp 1080w,
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained.webp        1344w
                "
                alt=""
                class="cover-im"
              />
            </div>
            <div class="winner-details">
              <div class="wiiner-name">Jaimes Nepews</div>
              <div class="wiiner-scool">IMSU</div>
              <div class="winner-dept-num">
                <div class="winner-dept">Elect/Elect</div>
                <div class="winner-num">1</div>
              </div>
            </div></a
          ><a
            id="w-node-_3b384b1c-f4b6-8cb5-8d4d-823fe459c39f-e22bd156"
            href="#"
            class="winner-card w-inline-block"
            ><div class="winner-im">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658acc269aed817e6009eb5a_chemistry-beakers_27c5571306.jpg"
                loading="lazy"
                sizes="50.000003814697266px"
                srcset="
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658acc269aed817e6009eb5a_chemistry-beakers_27c5571306-p-500.jpg   500w,
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658acc269aed817e6009eb5a_chemistry-beakers_27c5571306-p-800.jpg   800w,
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658acc269aed817e6009eb5a_chemistry-beakers_27c5571306-p-1080.jpg 1080w,
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658acc269aed817e6009eb5a_chemistry-beakers_27c5571306.jpg        1200w
                "
                alt=""
                class="cover-im"
              />
            </div>
            <div class="winner-details">
              <div class="wiiner-name">Jaimes Nepews</div>
              <div class="wiiner-scool">IMSU</div>
              <div class="winner-dept-num">
                <div class="winner-dept">Elect/Elect</div>
                <div class="winner-num">1</div>
              </div>
            </div></a
          ><a
            id="w-node-_38807006-8634-05de-b622-2af96d8d2c0c-e22bd156"
            href="#"
            class="winner-card w-inline-block"
            ><div class="winner-im">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658a9f37ecbc3a7acd51a136_iStock_000029923174_Large-copy-20140911082343481.jpg"
                loading="lazy"
                sizes="50.000003814697266px"
                srcset="
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658a9f37ecbc3a7acd51a136_iStock_000029923174_Large-copy-20140911082343481-p-500.jpg 500w,
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658a9f37ecbc3a7acd51a136_iStock_000029923174_Large-copy-20140911082343481.jpg       800w
                "
                alt=""
                class="cover-im"
              />
            </div>
            <div class="winner-details">
              <div class="wiiner-name">Jaimes Nepews</div>
              <div class="wiiner-scool">IMSU</div>
              <div class="winner-dept-num">
                <div class="winner-dept">Elect/Elect</div>
                <div class="winner-num">1</div>
              </div>
            </div></a
          ><a
            id="w-node-c474b447-e7a0-2871-c6c0-a2c8ae24f2f4-e22bd156"
            href="#"
            class="winner-card w-inline-block"
            ><div class="winner-im">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ae1e3205fdc37455b4666_636642780883209575.jpg"
                loading="lazy"
                alt=""
                class="cover-im"
              />
            </div>
            <div class="winner-details">
              <div class="wiiner-name">Jaimes Nepews</div>
              <div class="wiiner-scool">IMSU</div>
              <div class="winner-dept-num">
                <div class="winner-dept">Elect/Elect</div>
                <div class="winner-num">5</div>
              </div>
            </div></a
          ><a
            id="w-node-b8b92b80-21b4-b475-d36f-2f158a08ecb8-e22bd156"
            href="#"
            class="winner-card w-inline-block"
            ><div class="winner-im">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ae1e3205fdc37455b4666_636642780883209575.jpg"
                loading="lazy"
                alt=""
                class="cover-im"
              />
            </div>
            <div class="winner-details">
              <div class="wiiner-name">Jaimes Nepews</div>
              <div class="wiiner-scool">IMSU</div>
              <div class="winner-dept-num">
                <div class="winner-dept">Elect/Elect</div>
                <div class="winner-num">6</div>
              </div>
            </div></a
          ><a
            id="w-node-ffde69af-fcb2-d988-3a76-bad70c01a110-e22bd156"
            href="#"
            class="winner-card w-inline-block"
            ><div class="winner-im">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ae1e3205fdc37455b4666_636642780883209575.jpg"
                loading="lazy"
                alt=""
                class="cover-im"
              />
            </div>
            <div class="winner-details">
              <div class="wiiner-name">Jaimes Nepews</div>
              <div class="wiiner-scool">IMSU</div>
              <div class="winner-dept-num">
                <div class="winner-dept">Elect/Elect</div>
                <div class="winner-num">7</div>
              </div>
            </div></a
          ><a
            id="w-node-f280eb7c-2b9c-9ba9-c6ea-ab11ed87fe13-e22bd156"
            href="#"
            class="winner-card w-inline-block"
            ><div class="winner-im">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ae1e3205fdc37455b4666_636642780883209575.jpg"
                loading="lazy"
                alt=""
                class="cover-im"
              />
            </div>
            <div class="winner-details">
              <div class="wiiner-name">Jaimes Nepews</div>
              <div class="wiiner-scool">IMSU</div>
              <div class="winner-dept-num">
                <div class="winner-dept">Elect/Elect</div>
                <div class="winner-num">8</div>
              </div>
            </div></a
          >
        </div>
        <div v-else class="section-eadin center">
          No Competitor Yet, Be The First! <br /><br />
          <div class="compete-flex" style="justify-content: center">
            <nuxt-link to="/dashboard/competitions" class="compete-link"
              >Join Now</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>

    <div class="winners">
      <div class="ome-container">
        <div class="section-eader">
          <div class="section-eadin-left">
            <div class="intro-section">It's time to get Schooled</div>
            <div class="section-eadin">
              Insights Hub: Explore Our Educational Blog Posts
            </div>
          </div>
          <div class="section-eadin-rit">
            Unlock an Abundance of Knowledge and Insights with Our Comprehensive
            Articles Covering a Wide Range of Educational Topics... It's time to
            get Schooled!
          </div>
        </div>
        <div class="w-layout-grid blo-rest">
          <home-front-blog v-for="item in blogs" :key="item.id" :item="item" />
        </div>
      </div>
    </div>

    <home-testimonial />
  </div>
</template>

<script>
import HomeCompetitions from "../components/Home/HomeCompetitions.vue";
import HomeEnquiries from "../components/Home/HomeEnquiries.vue";
import HomeFrontBlog from "../components/Home/HomeFrontBlog.vue";
import HomeHeroSlider from "../components/Home/HomeHeroSlider.vue";
import HomeTestimonial from "../components/Home/HomeTestimonial.vue";
import HomeNav from "../components/HomeNav.vue";
export default {
  layout: "home",
  head() {
    return {
      title: `Schoolin | Home`,
    };
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  computed: {
    FILE_URL() {
      return this.$store.state.fileURL;
    },

    payments() {
      return this.$store.state.payments;
    },

    tutorials() {
      return this.$store.state.tutorials;
    },

    blogs() {
      return this.$store.state.blogs;
    },

    competitions() {
      return this.$store.state.competitions;
    },

    competitors() {
      return this.$store.state.competitors;
    },
  },
  components: {
    HomeNav,
    HomeHeroSlider,
    HomeTestimonial,
    HomeEnquiries,
    HomeCompetitions,
    HomeFrontBlog,
  },
};
</script>

<style>
a.first-link-header {
  text-decoration: none;
  color: black;
}

.cover {
  background-color: rgba(255, 111, 0, 0.151);
}

.section-eadin.center {
  width: 100%;
  text-align: center;
}
</style>
