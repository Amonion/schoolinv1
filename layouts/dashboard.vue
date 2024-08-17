<template>
  <div class="dash-space">
    <dashboard-header />
    <div class="dashboard-container">
      <div class="dashboard-post-wrapper">
        <dashboard-v-nav />
        <div class="dash-main">
          <dashboard-modal />

          <dashboard-comment-box />
          <Nuxt />
        </div>
        <div class="dash-main-left">
          <div class="dash-aside-body">
            <div class="dash-each-aside">
              <div class="dash-aside-title">Prime Friends</div>
              <div class="dash-search-wrapper aside">
                <div class="dashboard-search-inputholder aside">
                  <img
                    src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65aba2a7a76a2cf0281c08ef_Search%20(1).svg"
                    loading="lazy"
                    alt=""
                    class="dashboard-search-icon"
                  /><input
                    class="dashboard-header-seachinput w-input"
                    maxlength="256"
                    name="name-4"
                    data-name="Name 4"
                    placeholder="Search for friends"
                    type="text"
                    id="name-4"
                  />
                </div>
                <ul role="list" class="dash-search-list">
                  <li class="dash-search-item">
                    <a href="#" class="dash-search-listlink w-inline-block"
                      ><div class="dash-search-pix">
                        <img
                          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
                          loading="lazy"
                          sizes="100vw"
                          srcset="
                            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
                          "
                          alt=""
                          class="responsive-img"
                        />
                      </div>
                      <div>This is some text inside of a div block.</div></a
                    >
                  </li>
                  <li class="dash-search-item">
                    <a href="#" class="dash-search-listlink w-inline-block"
                      ><div class="dash-search-pix">
                        <img
                          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
                          loading="lazy"
                          sizes="100vw"
                          srcset="
                            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
                          "
                          alt=""
                          class="responsive-img"
                        />
                      </div>
                      <div>This is some text inside of a div block.</div></a
                    >
                  </li>
                  <li class="dash-search-item">
                    <a href="#" class="dash-search-listlink w-inline-block"
                      ><div class="dash-search-pix">
                        <img
                          src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
                          loading="lazy"
                          sizes="100vw"
                          srcset="
                            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                            https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
                          "
                          alt=""
                          class="responsive-img"
                        />
                      </div>
                      <div>This is some text inside of a div block.</div></a
                    >
                  </li>
                </ul>
              </div>
              <div class="dash-each-asidefriend">
                <div class="dash-user-notewrapper">
                  <a href="#" class="dash-aside-headerpix friend w-inline-block"
                    ><img
                      src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
                      loading="lazy"
                      sizes="100vw"
                      srcset="
                        https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                        https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                        https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
                      "
                      alt=""
                      class="responsive-img"
                  /></a>
                  <div class="dash-note-dot note"></div>
                </div>
                <a href="#" class="dash-aside-texts w-inline-block"
                  ><div class="dash-aside-uptext">
                    this is the last message I...
                  </div>
                  <div class="dash-last-moment">
                    <div class="dash-aside-username">MarkMillian</div>
                    <div class="dash-aside-username time">13 m</div>
                  </div></a
                >
                <div class="dash-note-dot friends"><div>9+</div></div>
              </div>
              <div class="dash-each-asidefriend">
                <a href="#" class="dash-aside-headerpix friend w-inline-block"
                  ><img
                    src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
                    loading="lazy"
                    sizes="100vw"
                    srcset="
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
                    "
                    alt=""
                    class="responsive-img" /></a
                ><a href="#" class="dash-aside-texts w-inline-block"
                  ><div class="dash-aside-uptext">
                    this is the last message I...
                  </div>
                  <div class="dash-aside-username">MarkMillian</div></a
                >
                <div class="dash-note-dot friends"><div>9+</div></div>
              </div>
              <div class="dash-each-asidefriend">
                <a href="#" class="dash-aside-headerpix friend w-inline-block"
                  ><img
                    src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
                    loading="lazy"
                    sizes="100vw"
                    srcset="
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
                    "
                    alt=""
                    class="responsive-img" /></a
                ><a href="#" class="dash-aside-texts w-inline-block"
                  ><div class="dash-aside-uptext">
                    this is the last message I...
                  </div>
                  <div class="dash-aside-username">MarkMillian</div></a
                >
                <div class="dash-note-dot friends"><div>9+</div></div>
              </div>
              <div class="dash-each-asidefriend">
                <a href="#" class="dash-aside-headerpix friend w-inline-block"
                  ><img
                    src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
                    loading="lazy"
                    sizes="100vw"
                    srcset="
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
                    "
                    alt=""
                    class="responsive-img" /></a
                ><a href="#" class="dash-aside-texts w-inline-block"
                  ><div class="dash-aside-uptext">
                    this is the last message I...
                  </div>
                  <div class="dash-aside-username">MarkMillian</div></a
                >
                <div class="dash-note-dot friends"><div>9+</div></div>
              </div>
              <div class="dash-load-more">Load More...</div>
            </div>
            <div class="dash-each-aside">
              <div class="dash-aside-title">Friend Requests</div>
              <div class="dash-each-asidefriend">
                <a href="#" class="dash-aside-headerpix friend w-inline-block"
                  ><img
                    src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
                    loading="lazy"
                    sizes="100vw"
                    srcset="
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
                    "
                    alt=""
                    class="responsive-img"
                /></a>
                <div class="dash-aside-texts">
                  <div class="dash-aside-uptext">Jonathan Will</div>
                  <div class="dash-request-details">
                    <div class="dash-aside-username">
                      IMSU <span class="dash-point">.</span> Nigeria
                    </div>
                    <div class="dash-request-btn">Accept</div>
                  </div>
                </div>
              </div>
              <div class="dash-each-asidefriend">
                <a href="#" class="dash-aside-headerpix friend w-inline-block"
                  ><img
                    src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
                    loading="lazy"
                    sizes="100vw"
                    srcset="
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
                    "
                    alt=""
                    class="responsive-img"
                /></a>
                <div class="dash-aside-texts">
                  <div class="dash-aside-uptext">Jonathan Will</div>
                  <div class="dash-request-details">
                    <div class="dash-aside-username">
                      IMSU <span class="dash-point">.</span> Nigeria
                    </div>
                    <div class="dash-request-btn">Accept</div>
                  </div>
                </div>
              </div>
              <div class="dash-each-asidefriend">
                <a href="#" class="dash-aside-headerpix friend w-inline-block"
                  ><img
                    src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg"
                    loading="lazy"
                    sizes="100vw"
                    srcset="
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-500.jpg  500w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face-p-800.jpg  800w,
                      https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65abb42e4043cc11233d0efd_face.jpg       1000w
                    "
                    alt=""
                    class="responsive-img"
                /></a>
                <div class="dash-aside-texts">
                  <div class="dash-aside-uptext">Jonathan Will</div>
                  <div class="dash-request-details">
                    <div class="dash-aside-username">
                      IMSU <span class="dash-point">.</span> Nigeria
                    </div>
                    <div class="dash-request-btn">Accept</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardCommentBox from "../components/Dashboard/DashboardCommentBox.vue";
import DashboardHeader from "../components/Dashboard/DashboardHeader.vue";
import DashboardModal from "../components/Dashboard/DashboardModal.vue";
import DashboardVNav from "../components/Dashboard/DashboardVNav.vue";
export default {
  components: {
    DashboardHeader,
    DashboardVNav,
    DashboardModal,
    DashboardCommentBox,
  },
  head() {
    return {
      title: "Schoolin ", // Set the page title
      link: [
        { rel: "stylesheet", href: "/css/dashboard.css" },
        { rel: "stylesheet", href: "/css/custom-home.css" },
      ],
    };
  },
  async mounted() {
    if (this.$route.query.ref) {
      localStorage.setItem("referral", this.$route.query.ref);
    }
    this.$store.commit("dashboard/SET_URL", this.$config.FILE_URL);
    await this.$store.dispatch("dashboard/initializeUserDetails", this.user);
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    inputState() {
      return this.$store.state.dashboard.inputState;
    },
  },
};
</script>

<style>
.dashboard-main-flex.home {
  /* font-family: "Poppins", sans-serif; */
  font-family: "Open Sans", sans-serif;
  background: #f3f2f8;
}

.dash-custom-drop.active {
  top: 45px;
}
.dash-custom-drop {
  z-index: 1000;
}

.dash-custom-select {
  z-index: auto;
}

.dash-custom-selecthead.location {
  width: 100%;
}

.dashboard-middle-header {
  height: auto;
}

.dashboard-v-nav {
  transition: 0.3s all;
}

.dashboard-container {
  max-width: 1200px;
}

.dash-profile-bg {
  width: 100%;
}

.dash-profile-img.pass {
  position: relative;
}

.dash-profile-img,
.dash-aside-headerpix.prof {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1c40ca;
}

.dash-profile-location {
  margin-top: 5px;
}

.dashprime-main-display a {
  text-decoration: none;
}

.display-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background-image: linear-gradient(
    to top,
    rgba(9, 17, 49, 0.63),
    rgba(255, 255, 255, 0)
  );
}

.each-nav-item {
  cursor: pointer;
}

.ero-play {
  text-decoration: none;
}

input.hide {
  opacity: 0;
  height: 0.1px;
  width: 0.1px;
  overflow: hidden;
  z-index: -1;
}
.label-input {
  cursor: pointer;
  display: inline;
  width: 45px;
}

.label-input.abs {
  position: absolute;
  right: 0;
  bottom: 0;
  width: auto;
}

.loading {
  width: 100%;
  padding: 50px;
  display: flex;
  justify-content: center;
  background: white;
  min-height: 100;
  height: 100%;
}

.nav-links.nuxt-link-exact-active.nuxt-link-active {
  color: #1c40ca;
}

.nav-links.nuxt-link-exact-active.nuxt-link-active.white {
  color: white;
}

.response-text {
  color: #1c40ca;
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
}

.response-text.error {
  color: red;
}

.spinner {
  width: 30px;
  animation: spin 1.5s linear infinite;
}

.dash-spinner.spinner {
  width: 20px;
}

.passport {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding-top: 30px;
}

.veri {
  font-size: 12px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 767px) {
  .dashboard-container {
    padding-left: 10px;
    padding-right: 10px;
  }

  .dashboard-middle-header {
    padding: 5px 0;
    height: auto;
  }
}

@media screen and (max-width: 479px) {
  .w-layout-grid.form {
    grid-template-columns: 1fr;
  }

  .dash-aside-headerpix.prof {
    display: none;
  }
}
</style>
