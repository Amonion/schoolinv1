<template>
  <div class="dashboard-middle-header">
    <div class="dashboard-container">
      <div class="dash-space-head">
        <nuxt-link to="/" class="nav_brand w-inline-block"
          ><img
            src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65aaaff176977d8b31fea40b_logo.png"
            loading="lazy"
            alt=""
        /></nuxt-link>
        <div class="dashboard-header-tabs">
          <div class="nav_text">
            <nuxt-link
              to="/dashboard"
              class="dashboard-header-link"
              :class="{ active: route == 'dashboard' }"
              >Prime</nuxt-link
            ><nuxt-link
              to="/dashboard/competitions"
              class="dashboard-header-link"
              :class="{ active: route == 'dashboard-competitions' }"
              >Competitions</nuxt-link
            ><nuxt-link
              to="/dashboard/schools"
              class="dashboard-header-link"
              :class="{ active: route == 'dashboard-schools' }"
              >Schools</nuxt-link
            >
          </div>
        </div>
        <div class="header_flex">
          <img
            src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65d0866f7fcc40b63a86eaaa_Vector.svg"
            loading="lazy"
            alt=""
            class="add-post"
            @click="toggleInput"
          />
          <div class="dash-aside-header">
            <nuxt-link to="/" class="dash-aside-iconwrapper w-inline-block"
              ><img
                src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65ab9cd4ae2374485a97ebac_Notifications.svg"
                loading="lazy"
                alt=""
                class="dash-aside-headericon"
              />
              <div class="dash-note-dot"><div>9+</div></div></nuxt-link
            >

            <nuxt-link
              to="/dashboard/profile"
              class="dash-aside-headerpix prof w-inline-block"
              ><img
                v-if="user.picture"
                :src="`${FILE_URL}/${user.picture}`"
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 40px, (max-width: 1439px) 3vw, 40px"
                :srcset="`
                  ${FILE_URL}/${user.picture}  500w,
                  ${FILE_URL}/${user.picture}  800w,
                  ${FILE_URL}/${user.picture}       1000w`"
                alt=""
                class="responsive-img"
              />
              <span
                v-else
                class="material-symbols-outlined"
                style="color: aliceblue; font-size: 30px"
              >
                account_circle
              </span>
            </nuxt-link>
          </div>
          <div class="dash-search-wrapper">
            <div class="dashboard-search-inputholder">
              <input
                class="dashboard-header-seachinput w-input"
                maxlength="256"
                name="name-6"
                data-name="Name 6"
                placeholder="Search For Post"
                type="text"
                id="name-6"
              /><img
                src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65aba2a7a76a2cf0281c08ef_Search%20(1).svg"
                loading="lazy"
                alt=""
                class="dashboard-search-icon"
              />
            </div>
            <ul role="list" class="dash-search-list">
              <li class="dash-search-item">
                <nuxt-link to="/" class="dash-search-listlink w-inline-block"
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
                  <div>This is some text inside of a div block.</div></nuxt-link
                >
              </li>
              <li class="dash-search-item">
                <nuxt-link to="/" class="dash-search-listlink w-inline-block"
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
                  <div>This is some text inside of a div block.</div></nuxt-link
                >
              </li>
              <li class="dash-search-item">
                <nuxt-link to="/" class="dash-search-listlink w-inline-block"
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
                  <div>This is some text inside of a div block.</div></nuxt-link
                >
              </li>
            </ul>
          </div>
          <img
            src="https://assets-global.website-files.com/65aaac86035298c6427cc6d9/65d319ba88f943a8daab5e98_Menu.svg"
            loading="lazy"
            alt=""
            class="menu_icon"
            @click="toggleMenu"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      this.$store.commit("dashboard/toggleNav");
    },

    toggleInput() {
      this.$store.commit("dashboard/showInput");
    },
  },
  computed: {
    route() {
      return this.$store.state.dashboard.route;
    },

    user() {
      return this.$store.state.auth.user;
    },

    FILE_URL() {
      return this.$store.state.dashboard.fileURL;
    },
  },
};
</script>

<style></style>
