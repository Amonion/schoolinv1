<template>
  <div>
    <div class="ero-section pae">
      <div class="ome-container">
        <div class="pae-ero-flex">
          <div class="pae-ero-left">
            <div class="intro-section">All Academic Services</div>
            <h1 class="eadin1">
              Enhance your academic journey all in Schoolin
            </h1>
            <div class="ome-text pae-intro">
              Make all academic payments from your O-Level, through
              undergraduate to post graduate levels from the comfort of your
              home.
            </div>
            <div class="ero-play-flex">
              <nuxt-link to="/signup" class="ome-btn w-inline-block"
                ><div>Get Started</div></nuxt-link
              >
              <a href="https://youtube.com" target="_blank" class="ero-play">
                <div class="play-circle">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658bc8e41229fc44f981904f_youtube%201.svg"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div>Watch Video</div>
              </a>
            </div>
          </div>
          <div class="pae-ero-rit">
            <div
              data-delay="6000"
              data-animation="slide"
              class="hero-slide sm w-slider"
              data-autoplay="true"
              data-easing="ease-in-out-cubic"
              data-hide-arrows="false"
              data-disable-swipe="false"
              data-autoplay-limit="0"
              data-nav-spacing="3"
              data-duration="1500"
              data-infinite="true"
            >
              <div class="hero-slid-mask w-slider-mask">
                <div class="hero-slides w-slide">
                  <img
                    :src="`${FILE_URL}/${banner.bannerImage}`"
                    loading="lazy"
                    sizes="(max-width: 479px) 96vw, (max-width: 767px) 95vw, (max-width: 991px) 38vw, (max-width: 1279px) 37vw, 367.9861145019531px"
                    :srcset="`
                      ${FILE_URL}/${banner.bannerImage} 500w,
                      ${FILE_URL}/${banner.bannerImage}       800w`"
                    alt=""
                    class="cover-im"
                  />
                  <div class="ero-cover">
                    <span class="ero-link">
                      {{ banner.bannerTitle }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="w-slider-nav w-round"></div>
            </div>
          </div>
        </div>
        <div class="w-layout-grid service-stats">
          <div class="eac-stats left">
            <div class="service-icon-older wite">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c1828742911553ea99349_open-file-folder-icon%201.svg"
                loading="lazy"
                alt=""
                class="eac-stats-icon"
              />
            </div>
            <div class="stats-number">Coming Soon</div>
            <div class="stats-number sm">Projects</div>
          </div>
          <div class="eac-stats between">
            <div class="service-icon-older wite">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ab32a00518a27e2a3a523_book%201.svg"
                loading="lazy"
                alt=""
                class="eac-stats-icon active"
              />
            </div>
            <div class="stats-number wite">Coming Soon</div>
            <div class="stats-number sm">Tutorials</div>
          </div>
          <div class="eac-stats left">
            <div class="service-icon-older wite">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c182831b46a0415ac2b18_faq-icon%201.svg"
                loading="lazy"
                alt=""
                class="eac-stats-icon"
              />
            </div>
            <div class="stats-number red">Coming Soon</div>
            <div class="stats-number sm">Past Qs &amp; As</div>
          </div>
          <div class="eac-stats left no">
            <div class="service-icon-older wite">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c18286556372672f44435_benefits-icon%201.svg"
                loading="lazy"
                alt=""
                class="eac-stats-icon"
              />
            </div>
            <div class="stats-number reen">Coming Soon</div>
            <div class="stats-number sm">Competitions</div>
          </div>
        </div>
      </div>
    </div>
    <div class="service-section">
      <div class="ome-container">
        <div class="section-eader">
          <div class="section-eadin-left">
            <div class="intro-section">Our Payment Services</div>
            <div class="section-eadin">
              Make payments for Jamb, WAEC, POST UTME & other registrations from
              your comfort
            </div>
          </div>
          <div class="section-eadin-rit">
            Avoid the stress of going to cyber centers that delays your,
            Schoolin Prime allows you to acheive that from your comfort. text
            inside of a div block.
          </div>
        </div>

        <div
          v-for="(item, int) in payments"
          :key="int"
          class="first-service"
          :class="{ reverse: int % 2 == 1 }"
        >
          <div class="service-pix">
            <img
              :src="`${FILE_URL}/${item.image}`"
              loading="lazy"
              sizes="(max-width: 479px) 96vw, (max-width: 991px) 43vw, (max-width: 1279px) 41vw, 413.9930725097656px"
              :srcset="`
                ${FILE_URL}/${item.image} 500w,
                ${FILE_URL}/${item.image}       800w`"
              alt=""
              class="cover-im"
            />
          </div>
          <div class="service-content" :class="{ reverse: int % 2 == 1 }">
            <div class="service-icon-older">
              <img src="/icon.png" alt="" class="sm-icon" />
            </div>
            <div class="section-eadin _2">
              {{ item.title }}
            </div>
            <div
              class="section-eadin-rit top"
              v-html="truncateText(item.content, 150)"
            ></div>
            <nuxt-link :to="``" class="read-more active w-inline-block"
              ><div>Read More</div>
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ab3e2463e79c196a608a0_arrow-wite.svg"
                loading="lazy"
                alt=""
                class="read-more-icon"
            /></nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <home-enquiries />

    <div class="competition">
      <div class="ome-container">
        <div class="section-eader">
          <div class="section-eadin-left">
            <div class="intro-section">Our Partnership Services</div>
            <div class="section-eadin">
              Are you interested in our contents and would like to partner with
              us?
            </div>
          </div>
          <div class="section-eadin-rit">
            It's easy! Create an account and login, setup your required details
            and contact our live support either through our contact section or
            our live chat.
          </div>
        </div>
        <div
          v-if="partnership"
          @mouseleave="index = 0"
          class="w-layout-grid service-pae-rid"
        >
          <div
            v-if="partnership[0]"
            class="eac-second-services"
            :class="{ active: index == partnership[0].id }"
            @mouseover="index = partnership[0].id"
          >
            <div class="service-icon-wraper redis">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c1f59dab225dd6bee2a44_blogger-icon%201.svg"
                loading="lazy"
                alt=""
              />
            </div>
            <div class="section-eadin _2">{{ partnership[0].blogType }}</div>
            <div class="eac-second-content">
              {{ partnership[0].title }}
            </div>
            <nuxt-link to="/" class="read-more no w-inline-block"
              ><div>Read More</div>
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c1b904260ea19dd9d77f3_arrow-leftt.svg"
                loading="lazy"
                alt=""
                class="read-more-icon"
            /></nuxt-link>
          </div>
          <div
            v-if="partnership[1]"
            class="eac-second-services"
            :class="{ active: index == partnership[1].id }"
            @mouseover="index = partnership[1].id"
          >
            <div class="service-icon-wraper">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c1f59ecbc3a7acd23090e_speaker-icon%201.svg"
                loading="lazy"
                alt=""
              />
            </div>
            <div class="section-eadin _2">{{ partnership[1].blogType }}</div>
            <div class="eac-second-content">
              {{ partnership[1].title }}
            </div>
            <nuxt-link to="/" class="read-more no w-inline-block"
              ><div>Read More</div>
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c1b904260ea19dd9d77f3_arrow-leftt.svg"
                loading="lazy"
                alt=""
                class="read-more-icon"
            /></nuxt-link>
          </div>
          <div
            v-if="partnership[2]"
            class="eac-second-services"
            :class="{ active: index == partnership[2].id }"
            @mouseover="index = partnership[2].id"
          >
            <div class="service-icon-wraper reeny">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c1f5997e6e458ccf015fa_briefcase-line-icon%201.svg"
                loading="lazy"
                alt=""
              />
            </div>
            <div class="section-eadin _2">Job Posting</div>
            <div class="eac-second-content">
              This is some text inside of a div block.
            </div>
            <nuxt-link to="/" class="read-more no w-inline-block"
              ><div>Read More</div>
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c1b904260ea19dd9d77f3_arrow-leftt.svg"
                loading="lazy"
                alt=""
                class="read-more-icon"
            /></nuxt-link>
          </div>
          <div
            v-if="partnership[3]"
            class="eac-second-services"
            :class="{ active: index == partnership[3].id }"
            @mouseover="index = partnership[3].id"
          >
            <div class="service-icon-wraper pinky">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c1f5982f787771b0d1901_man-working-on-laptop-icon%201.svg"
                loading="lazy"
                alt=""
              />
            </div>
            <div class="section-eadin _2">IT Requirements</div>
            <div class="eac-second-content">
              This is some text inside of a div block.
            </div>
            <nuxt-link to="/" class="read-more no w-inline-block"
              ><div>Read More</div>
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c1b904260ea19dd9d77f3_arrow-leftt.svg"
                loading="lazy"
                alt=""
                class="read-more-icon"
            /></nuxt-link>
          </div>
        </div>

        <div class="service-instructor">
          <div class="instruct-left">
            <img
              src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658b0e6b4d57014ed650be45_quote%201.svg"
              loading="lazy"
              alt=""
              class="quote"
            />
            <div class="eac-second-content instruct">
              This is some text inside of a div block. This is some text inside
              of a div block.This is some text inside of a div block. This is
              some text inside of a div block. This is some text inside of a div
              block.
            </div>
            <div class="instructor-flex">
              <div class="instruct-flex">
                <div class="instructor-face">
                  <img
                    src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ae1e3205fdc37455b4666_636642780883209575.jpg"
                    loading="lazy"
                    alt=""
                    class="cover-im"
                  />
                </div>
                <div>
                  <nuxt-link to="/" class="instructor sm">Dalton</nuxt-link>
                  <div>Bloer</div>
                </div>
              </div>
              <div class="instructor-title">
                <div class="instructor">Scoolin Bloer</div>
              </div>
            </div>
          </div>
          <div class="instructor-rit">
            <div class="ratin-flex">85<span class="percent">%</span></div>
            <div>Increase Your Profile Ratin</div>
            <nuxt-link to="/" class="read-more no top w-inline-block"
              ><div>Read More</div>
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c1b904260ea19dd9d77f3_arrow-leftt.svg"
                loading="lazy"
                alt=""
                class="read-more-icon"
            /></nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="service-section">
      <div class="ome-container">
        <div class="section-eader">
          <div class="section-eadin-left">
            <div class="intro-section">Our Payment Services</div>
            <div class="section-eadin">
              Our Education System will ive you te perfect Solution
            </div>
          </div>
          <div class="section-eadin-rit">
            This is some text inside of a div block. This is some text inside of
            a div block. This is some text inside of a div block. This is some
            text inside of a div block.
          </div>
        </div>
        <div class="first-service">
          <div class="service-pix">
            <img
              src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658a9f37ecbc3a7acd51a136_iStock_000029923174_Large-copy-20140911082343481.jpg"
              loading="lazy"
              sizes="(max-width: 479px) 96vw, (max-width: 991px) 43vw, (max-width: 1279px) 41vw, 413.9930725097656px"
              srcset="
                https://assets-global.website-files.com/6589c40c00518a27e22bd153/658a9f37ecbc3a7acd51a136_iStock_000029923174_Large-copy-20140911082343481-p-500.jpg 500w,
                https://assets-global.website-files.com/6589c40c00518a27e22bd153/658a9f37ecbc3a7acd51a136_iStock_000029923174_Large-copy-20140911082343481.jpg       800w
              "
              alt=""
              class="cover-im"
            />
          </div>
          <div class="service-content">
            <div class="service-icon-older"></div>
            <div class="section-eadin _2">
              Our Education System will ive you te perfect Solution
            </div>
            <div class="section-eadin-rit top">
              This is some text inside of a div block. This is some text inside
              of a div block. This is some text inside of a div block. This is
              some text inside of a div block.
            </div>
            <nuxt-link to="/" class="read-more active w-inline-block"
              ><div>Read More</div>
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ab3e2463e79c196a608a0_arrow-wite.svg"
                loading="lazy"
                alt=""
                class="read-more-icon"
            /></nuxt-link>
          </div>
        </div>
        <div class="first-service reverse">
          <div class="service-pix">
            <img
              src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658acc269aed817e6009eb5a_chemistry-beakers_27c5571306.jpg"
              loading="lazy"
              sizes="(max-width: 479px) 96vw, (max-width: 991px) 43vw, (max-width: 1279px) 41vw, 413.9930725097656px"
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
          <div class="service-content reverse">
            <div class="service-icon-older"></div>
            <div class="section-eadin _2">
              Our Education System will ive you te perfect Solution
            </div>
            <div class="section-eadin-rit top">
              This is some text inside of a div block. This is some text inside
              of a div block. This is some text inside of a div block. This is
              some text inside of a div block.
            </div>
            <nuxt-link to="/" class="read-more active w-inline-block"
              ><div>Read More</div>
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ab3e2463e79c196a608a0_arrow-wite.svg"
                loading="lazy"
                alt=""
                class="read-more-icon"
            /></nuxt-link>
          </div>
        </div>
        <div class="first-service">
          <div class="service-pix">
            <img
              src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ac1b79146276e6d48834d_Stoicism-The-Life-Changing-Philosophy-Explained.webp"
              loading="lazy"
              sizes="(max-width: 479px) 96vw, (max-width: 991px) 43vw, (max-width: 1279px) 41vw, 413.9930725097656px"
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
          <div class="service-content">
            <div class="service-icon-older"></div>
            <div class="section-eadin _2">
              Our Education System will ive you te perfect Solution
            </div>
            <div class="section-eadin-rit top">
              This is some text inside of a div block. This is some text inside
              of a div block. This is some text inside of a div block. This is
              some text inside of a div block.
            </div>
            <nuxt-link to="/" class="read-more active w-inline-block"
              ><div>Read More</div>
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658ab3e2463e79c196a608a0_arrow-wite.svg"
                loading="lazy"
                alt=""
                class="read-more-icon"
            /></nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="testimonial">
      <div class="ome-container">
        <div class="section-eader">
          <div class="section-eadin-left">
            <div class="intro-section">Students Testimonial</div>
            <div class="section-eadin">
              Our Education System will ive you te perfect Solution
            </div>
          </div>
          <div class="section-eadin-rit">
            This is some text inside of a div block. This is some text inside of
            a div block. This is some text inside of a div block. This is some
            text inside of a div block.
          </div>
        </div>
        <div class="w-layout-grid payments-roups">
          <div class="eac-payment">
            <div class="testimony-pix pay">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c6e890c96244652b7da69_Waec_logo.png"
                loading="lazy"
                alt=""
                class="jamb-loo"
              />
            </div>
            <nuxt-link to="/" class="section-eadin _2 color">WAEC </nuxt-link>
          </div>
          <div class="eac-payment">
            <div class="testimony-pix pay">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c6e89fb88c03ff937ed30_neco-logo.2e5102a6.png"
                loading="lazy"
                sizes="(max-width: 1279px) 40px, (max-width: 1439px) 3vw, 40px"
                srcset="
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c6e89fb88c03ff937ed30_neco-logo.2e5102a6-p-500.png 500w,
                  https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c6e89fb88c03ff937ed30_neco-logo.2e5102a6.png       512w
                "
                alt=""
                class="jamb-loo"
              />
            </div>
            <nuxt-link to="/" class="section-eadin _2 color">NECO</nuxt-link>
          </div>
          <div class="eac-payment">
            <div class="testimony-pix pay">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c6e89516c4be72f1f449b_JAMB-logo.jpg"
                loading="lazy"
                alt=""
                class="jamb-loo"
              />
            </div>
            <nuxt-link to="/" class="section-eadin _2 color">JAMB</nuxt-link>
          </div>
          <div class="eac-payment">
            <div class="testimony-pix pay">
              <img
                src="https://assets-global.website-files.com/6589c40c00518a27e22bd153/658c6e88bd7c075b6a8afb91_NYSC_LOGO.svg"
                loading="lazy"
                alt=""
                class="jamb-loo"
              />
            </div>
            <nuxt-link to="/" class="section-eadin _2 color">NYSC</nuxt-link>
          </div>
        </div>
        <div class="subscribe-form w-form">
          <form
            id="email-form"
            name="email-form"
            data-name="Email Form"
            method="get"
            data-wf-page-id="6589c40c00518a27e22bd156"
            data-wf-element-id="a8d48f91-c99b-e2e8-0714-3e54b4ef2ec0"
          >
            <label for="name" class="subscribe-label"
              >Subscribe for Newsletters and Job Infos</label
            >
            <div class="subscribe-older">
              <input
                class="subscribe-input w-input"
                maxlength="256"
                name="email-2"
                data-name="Email 2"
                placeholder="Enter Your Email"
                type="email"
                id="email-2"
                required=""
              /><input
                type="submit"
                data-wait="Please wait..."
                class="ome-btn w-button"
                value="Subscribe"
              />
            </div>
          </form>
          <div class="w-form-done">
            <div>Thank you! Your submission has been received!</div>
          </div>
          <div class="w-form-fail">
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeEnquiries from "../components/Home/HomeEnquiries.vue";
import HomeNav from "../components/HomeNav.vue";
export default {
  components: { HomeNav, HomeEnquiries },
  layout: "home",
  head() {
    return {
      title: `Schoolin | Services`,
    };
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      }
      return text;
    },
  },
  computed: {
    banner() {
      const item = [];
      const items = this.$store.state.banners;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (el.bannerCategory == "Services") {
          item.push(el);
        }
      }

      return item[0];
    },

    payments() {
      return this.$store.state.payments;
    },

    partnership() {
      return this.$store.state.partnership;
    },

    FILE_URL() {
      return this.$store.state.fileURL;
    },
  },
};
</script>

<style></style>
