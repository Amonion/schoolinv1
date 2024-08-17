<template>
  <div class="admin-container">
    <div class="admin-home-flex">
      <h2 class="admin-page-title">
        Admin <span class="admin-page-time">{{ formatDate() }}</span>
      </h2>
      <div class="admin-home-left">
        <div class="admin-home-users-wrapper">
          <div class="admin-subtitle color">Latest Signed Users</div>
          <div class="admin-table-wrapper">
            <div class="admin-home-table">
              <div class="admin-home-table-head">
                <div class="admin-tl-sn1"><div>S/N</div></div>
                <div class="admin-tl-img1"><div>Image</div></div>
                <div class="admin-tl-name1"><div>Username</div></div>
                <div class="admin-tl-email1"><div>Email</div></div>
                <div class="admin-tl-time1"><div>Time</div></div>
              </div>
              <div
                v-for="(item, int) in users"
                :key="int"
                class="admin-home-table-body"
                :class="{ even: int % 2 == 0 }"
              >
                <div class="admin-tl-sn1">
                  <div>{{ (currentPage - 1) * limit + int + 1 }}</div>
                </div>
                <div class="admin-tl-img1">
                  <div v-if="item.profilePicture" class="img-bg-60">
                    <img
                      src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b0f6694bb4d7d865defd5_userface.png"
                      loading="lazy"
                      sizes="(max-width: 479px) 21vw, 60px"
                      srcset="
                        https://assets-global.website-files.com/656ace5627dc5da51719088f/656b0f6694bb4d7d865defd5_userface-p-500.png   500w,
                        https://assets-global.website-files.com/656ace5627dc5da51719088f/656b0f6694bb4d7d865defd5_userface-p-800.png   800w,
                        https://assets-global.website-files.com/656ace5627dc5da51719088f/656b0f6694bb4d7d865defd5_userface-p-1080.png 1080w,
                        https://assets-global.website-files.com/656ace5627dc5da51719088f/656b0f6694bb4d7d865defd5_userface-p-1600.png 1600w,
                        https://assets-global.website-files.com/656ace5627dc5da51719088f/656b0f6694bb4d7d865defd5_userface-p-2000.png 2000w,
                        https://assets-global.website-files.com/656ace5627dc5da51719088f/656b0f6694bb4d7d865defd5_userface-p-2600.png 2600w,
                        https://assets-global.website-files.com/656ace5627dc5da51719088f/656b0f6694bb4d7d865defd5_userface-p-3200.png 3200w,
                        https://assets-global.website-files.com/656ace5627dc5da51719088f/656b0f6694bb4d7d865defd5_userface.png        3397w
                      "
                      alt=""
                      class="responsive-img"
                    />
                  </div>
                  <i
                    v-else
                    class="bi bi-person-circle text-3xl text-[#949aff]"
                  ></i>
                </div>
                <nuxt-link
                  :to="`/admin/users/${item.id}/?username=${item.username}&id=${item.id}`"
                  class="admin-tl-name1"
                  :class="{ suspended: item.suspended }"
                  ><div>{{ item.username }}</div></nuxt-link
                >
                <div class="admin-tl-email1">
                  <div>{{ item.email }}</div>
                </div>
                <div class="admin-tl-time1 block">
                  <div>
                    {{ formatDate(item.dateCreated) }} <br />
                    {{ formatTimeToAMPM(item.dateCreated) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="admin-main-right">
        <div class="admin-home-visitos-pane">
          <div class="admin-subtitle color">Latest Vistors</div>
          <div class="admin-title2 bottom10">Visitors Today</div>
          <div class="admin-home-table-body bordered">
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag.png"
              loading="lazy"
              width="50"
              sizes="(max-width: 1279px) 30px, (max-width: 1439px) 2vw, 30px"
              alt=""
              srcset="
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-500.png   500w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-800.png   800w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-1080.png 1080w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag.png        1200w
              "
              class="admin-h-flag"
            />
            <div class="admin-tl-name1"><div>Mathew22</div></div>
            <div class="admin-tl-time1 visit">
              <div class="text-green">12:34 PM</div>
              <div class="text-block">12:34 PM</div>
            </div>
          </div>
          <div class="admin-home-table-body bordered">
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag.png"
              loading="lazy"
              width="50"
              sizes="(max-width: 1279px) 30px, (max-width: 1439px) 2vw, 30px"
              alt=""
              srcset="
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-500.png   500w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-800.png   800w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-1080.png 1080w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag.png        1200w
              "
              class="admin-h-flag"
            />
            <div class="admin-tl-name1"><div>Mathew22</div></div>
            <div class="admin-tl-time1 visit">
              <div class="text-green">12:34 PM</div>
              <div class="text-block">12:34 PM</div>
            </div>
          </div>
          <div class="admin-home-table-body bordered">
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag.png"
              loading="lazy"
              width="50"
              sizes="(max-width: 1279px) 30px, (max-width: 1439px) 2vw, 30px"
              alt=""
              srcset="
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-500.png   500w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-800.png   800w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-1080.png 1080w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag.png        1200w
              "
              class="admin-h-flag"
            />
            <div class="admin-tl-name1"><div>Mathew22</div></div>
            <div class="admin-tl-time1 visit">
              <div class="text-green">12:34 PM</div>
              <div class="text-block">12:34 PM</div>
            </div>
          </div>
          <div class="admin-home-table-body bordered">
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag.png"
              loading="lazy"
              width="50"
              sizes="(max-width: 1279px) 30px, (max-width: 1439px) 2vw, 30px"
              alt=""
              srcset="
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-500.png   500w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-800.png   800w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag-p-1080.png 1080w,
                https://assets-global.website-files.com/656ace5627dc5da51719088f/656b157cd5b2d0fa8adbee53_usa-flag.png        1200w
              "
              class="admin-h-flag"
            />
            <div class="admin-tl-name1"><div>Mathew22</div></div>
            <div class="admin-tl-time1 visit">
              <div class="text-green">12:34 PM</div>
              <div class="text-block">12:34 PM</div>
            </div>
          </div>
          <div class="admin-pagination">
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b18d3e3a614f7fbeb8fd7_arrow-left-circle%201.svg"
              loading="lazy"
              alt=""
              class="admin-page-arrow"
            />
            <div class="admin-pagination-items">1</div>
            <div class="admin-pagination-items">2</div>
            <div class="admin-pagination-items active">3</div>
            <div class="admin-pagination-items">4</div>
            <img
              src="https://assets-global.website-files.com/656ace5627dc5da51719088f/656b18d33a3f6e1cc0c0f6a3_arrow-left-circle%202.svg"
              loading="lazy"
              alt=""
              class="admin-page-arrow"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminWalletStats from "../../components/AdminWalletStats";
export default {
  components: { AdminWalletStats },
  layout: "admin",

  data() {
    return {
      currentPage: 1,
      limit: 10,
    };
  },

  methods: {
    formatDate(time = new Date().getTime()) {
      const today = new Date(time);
      const day = today.getDate();
      const month = today.toLocaleString("default", { month: "short" });
      const year = today.getFullYear();

      // Function to add ordinal suffix to the day
      const addOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return day + "th";
        } else {
          switch (day % 10) {
            case 1:
              return day + "st";
            case 2:
              return day + "nd";
            case 3:
              return day + "rd";
            default:
              return day + "th";
          }
        }
      };

      const formattedDate = `${addOrdinalSuffix(day)} ${month}, ${year}`;
      return formattedDate;
    },

    formatTimeToAMPM(time = new Date().getTime()) {
      if (typeof time !== "number") {
        return "Invalid timestamp";
      }

      const date = new Date(time);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
    },

    numberWithCommas(number) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    },

    getPages(length, limit) {
      const num = Math.ceil(length / limit);
      let pages = [];
      for (let i = 0; i < num; i++) {
        pages.push(i);
      }
      return pages.length;
    },
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },

    user() {
      return this.$store.getters.getUserInfo;
    },

    currencies() {
      return this.$store.state.admin.currencies;
    },

    users() {
      return this.$store.state.admin.users;
    },

    FILE_URL() {
      return this.$store.state.admin.fileURL;
    },
  },
};
</script>

<style></style>
